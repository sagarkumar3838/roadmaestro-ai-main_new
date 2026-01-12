// Firebase Storage URLs for assets
// Replace these URLs with your actual Firebase Storage bucket URLs after uploading assets

export const ASSET_URLS = {
  images: {
    'ai-generated-8601128_1280.png': 'https://firebasestorage.googleapis.com/v0/b/mentorai1998.firebasestorage.app/o/Assests%2Fimages%2Fai-generated-8601128_1280.png?alt=media',
    'cartoon-ai-robot-scene (1).jpg': 'https://firebasestorage.googleapis.com/v0/b/mentorai1998.firebasestorage.app/o/Assests%2Fimages%2Fcartoon-ai-robot-scene%20(1).jpg?alt=media',
    'cartoon-ai-robot-scene.jpg': 'https://firebasestorage.googleapis.com/v0/b/mentorai1998.firebasestorage.app/o/Assests%2Fimages%2Fcartoon-ai-robot-scene.jpg?alt=media',
    'skillverse edcation app to upgrade skill.jpg': 'https://firebasestorage.googleapis.com/v0/b/mentorai1998.firebasestorage.app/o/Assests%2Fimages%2Fskillverse%20edcation%20app%20to%20upgrade%20skill.jpg?alt=media',
    'Skillverse is the website name and it is education platform where anybody can upgrade their skills and add slogan for that ..jpg': 'https://firebasestorage.googleapis.com/v0/b/mentorai1998.firebasestorage.app/o/Assests%2Fimages%2FSkillverse%20is%20the%20website%20name%20and%20it%20is%20education%20platform%20where%20anybody%20can%20upgrade%20their%20skills%20and%20add%20slogan%20for%20that%20..jpg?alt=media',
    'Skillverse Logo with Diverse Color Palette.png': 'https://firebasestorage.googleapis.com/v0/b/mentorai1998.firebasestorage.app/o/Assests%2Fimages%2FSkillverse%20Logo%20with%20Diverse%20Color%20Palette.png?alt=media',
    'skillverse web app for skill upgrade and it is education platform can you create a template for that..jpg': 'https://firebasestorage.googleapis.com/v0/b/mentorai1998.firebasestorage.app/o/Assests%2Fimages%2Fskillverse%20web%20app%20for%20skill%20upgrade%20and%20it%20is%20education%20platform%20can%20create%20a%20template%20for%20that..jpg?alt=media',
    'technology-hologram-illustrated.jpg': 'https://firebasestorage.googleapis.com/v0/b/mentorai1998.firebasestorage.app/o/Assests%2Fimages%2Ftechnology-hologram-illustrated.jpg?alt=media',
  },
  videos: {
    'Loadingpage_img.mp4': 'https://firebasestorage.googleapis.com/v0/b/mentorai1998.firebasestorage.app/o/Assests%2Fvideo%2FLoadingpage_img.mp4?alt=media',
    'Loadingpage_img.webm': 'https://firebasestorage.googleapis.com/v0/b/mentorai1998.firebasestorage.app/o/Assests%2Fvideo%2FLoadingpage_img.webm?alt=media',
    'Mentor_AI.webm': 'https://firebasestorage.googleapis.com/v0/b/mentorai1998.firebasestorage.app/o/Assests%2Fvideo%2FMentor_AI.webm?alt=media',
  }
};

// Helper function to get asset URL with local fallback
export const getAssetUrl = (type: 'images' | 'videos', filename: string): string => {
  // Use local assets from public folder as fallback
  const localPath = `/Assests/${type === 'images' ? 'images' : 'video'}/${filename}`;
  return ASSET_URLS[type][filename] || localPath;
};

// Default fallbacks for backward compatibility
export const VIDEO_URL = getAssetUrl('videos', 'Mentor_AI.webm');
export const LOADING_VIDEO_URL = getAssetUrl('videos', 'Loadingpage_img.mp4');
