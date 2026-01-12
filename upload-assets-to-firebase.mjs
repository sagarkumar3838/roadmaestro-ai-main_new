#!/usr/bin/env node

import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Your Firebase configuration (same as in your client code)
const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

// Function to upload a file
async function uploadFile(filePath, fileName) {
  try {
    const fileRef = ref(storage, fileName);
    const fileData = fs.readFileSync(filePath);
    const snapshot = await uploadBytes(fileRef, fileData, {
      contentType: getContentType(fileName)
    });
    const downloadURL = await getDownloadURL(snapshot.ref);
    console.log(`✅ Uploaded ${fileName}: ${downloadURL}`);
    return { fileName, downloadURL };
  } catch (error) {
    console.error(`❌ Error uploading ${fileName}:`, error);
    return null;
  }
}

// Function to get MIME type
function getContentType(fileName) {
  const ext = path.extname(fileName).toLowerCase();
  switch (ext) {
    case '.png':
    case '.jpg':
    case '.jpeg':
      return 'image/' + ext.slice(1);
    case '.mp4':
      return 'video/mp4';
    case '.webm':
      return 'video/webm';
    default:
      return 'application/octet-stream';
  }
}

// Main function
async function uploadAssets() {
  const assetsDir = path.join(__dirname, 'public', 'Assests');
  const results = [];

  try {
    // Upload images
    const imagesDir = path.join(assetsDir, 'images');
    if (fs.existsSync(imagesDir)) {
      const images = fs.readdirSync(imagesDir);
      for (const image of images) {
        const filePath = path.join(imagesDir, image);
        if (fs.statSync(filePath).isFile()) {
          const result = await uploadFile(filePath, `Assests/images/${image}`);
          if (result) results.push(result);
        }
      }
    }

    // Upload videos
    const videosDir = path.join(assetsDir, 'video');
    if (fs.existsSync(videosDir)) {
      const videos = fs.readdirSync(videosDir);
      for (const video of videos) {
        const filePath = path.join(videosDir, video);
        if (fs.statSync(filePath).isFile()) {
          const result = await uploadFile(filePath, `Assests/video/${video}`);
          if (result) results.push(result);
        }
      }
    }

    // Save URLs to a JSON file for reference
    const outputPath = path.join(__dirname, 'firebase-assets-urls.json');
    fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));
    console.log(`📄 Asset URLs saved to: ${outputPath}`);

    console.log('🎉 All assets uploaded successfully!');

  } catch (error) {
    console.error('❌ Error uploading assets:', error);
  }
}

uploadAssets();
