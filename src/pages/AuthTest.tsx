import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { auth, db } from '@/integrations/firebase/client';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { CheckCircle, XCircle, AlertCircle, Loader2 } from 'lucide-react';

export default function AuthTest() {
  const [testResults, setTestResults] = useState<Array<{ test: string; status: 'pass' | 'fail' | 'pending'; message: string }>>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [testEmail, setTestEmail] = useState('test@example.com');
  const [testPassword, setTestPassword] = useState('test123456');

  const addResult = (test: string, status: 'pass' | 'fail' | 'pending', message: string) => {
    setTestResults(prev => [...prev, { test, status, message }]);
  };

  const runTests = async () => {
    setIsRunning(true);
    setTestResults([]);

    // Test 1: Firebase Config
    addResult('Firebase Configuration', 'pending', 'Checking...');
    try {
      const config = {
        apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
        authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
        projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
      };
      
      if (config.apiKey && config.authDomain && config.projectId) {
        addResult('Firebase Configuration', 'pass', `Project: ${config.projectId}`);
      } else {
        addResult('Firebase Configuration', 'fail', 'Missing environment variables');
      }
    } catch (error: any) {
      addResult('Firebase Configuration', 'fail', error.message);
    }

    // Test 2: Firestore Connection
    addResult('Firestore Connection', 'pending', 'Testing...');
    try {
      const testRef = doc(db, '_test', 'connection');
      await getDoc(testRef);
      addResult('Firestore Connection', 'pass', 'Connected successfully');
    } catch (error: any) {
      addResult('Firestore Connection', 'fail', error.message);
    }

    // Test 3: Auth Service
    addResult('Auth Service', 'pending', 'Checking...');
    try {
      if (auth) {
        addResult('Auth Service', 'pass', `Auth domain: ${auth.config.authDomain}`);
      } else {
        addResult('Auth Service', 'fail', 'Auth not initialized');
      }
    } catch (error: any) {
      addResult('Auth Service', 'fail', error.message);
    }

    // Test 4: Current User
    addResult('Current User', 'pending', 'Checking...');
    try {
      const user = auth.currentUser;
      if (user) {
        addResult('Current User', 'pass', `Logged in as: ${user.email}`);
      } else {
        addResult('Current User', 'pass', 'No user logged in (expected)');
      }
    } catch (error: any) {
      addResult('Current User', 'fail', error.message);
    }

    setIsRunning(false);
  };

  const testEmailSignIn = async () => {
    setIsRunning(true);
    addResult('Email Sign-In Test', 'pending', 'Attempting sign-in...');
    
    try {
      const userCredential = await signInWithEmailAndPassword(auth, testEmail, testPassword);
      addResult('Email Sign-In Test', 'pass', `Signed in as: ${userCredential.user.email}`);
    } catch (error: any) {
      if (error.code === 'auth/user-not-found') {
        addResult('Email Sign-In Test', 'pending', 'User not found, creating account...');
        try {
          const userCredential = await createUserWithEmailAndPassword(auth, testEmail, testPassword);
          await setDoc(doc(db, 'profiles', userCredential.user.uid), {
            display_name: testEmail.split('@')[0],
            email: testEmail,
            created_at: new Date(),
          });
          addResult('Email Sign-In Test', 'pass', `Account created: ${userCredential.user.email}`);
        } catch (createError: any) {
          addResult('Email Sign-In Test', 'fail', `Create failed: ${createError.code} - ${createError.message}`);
        }
      } else {
        addResult('Email Sign-In Test', 'fail', `${error.code} - ${error.message}`);
      }
    }
    
    setIsRunning(false);
  };

  const testGoogleSignIn = async () => {
    setIsRunning(true);
    addResult('Google Sign-In Test', 'pending', 'Opening Google popup...');
    
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      
      await setDoc(
        doc(db, 'profiles', result.user.uid),
        {
          display_name: result.user.displayName,
          email: result.user.email,
          photo_url: result.user.photoURL,
          created_at: new Date(),
        },
        { merge: true }
      );
      
      addResult('Google Sign-In Test', 'pass', `Signed in as: ${result.user.email}`);
    } catch (error: any) {
      addResult('Google Sign-In Test', 'fail', `${error.code} - ${error.message}`);
    }
    
    setIsRunning(false);
  };

  const getStatusIcon = (status: 'pass' | 'fail' | 'pending') => {
    switch (status) {
      case 'pass':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'fail':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'pending':
        return <Loader2 className="w-5 h-5 text-yellow-500 animate-spin" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Authentication Test Suite</h1>
          <p className="text-gray-600">Diagnose Firebase authentication issues</p>
        </div>

        <div className="grid gap-6">
          {/* Configuration Tests */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Configuration Tests</h2>
            <Button onClick={runTests} disabled={isRunning} className="mb-4">
              {isRunning ? 'Running Tests...' : 'Run Configuration Tests'}
            </Button>
          </Card>

          {/* Email/Password Test */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Email/Password Authentication</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Test Email</label>
                <Input
                  type="email"
                  value={testEmail}
                  onChange={(e) => setTestEmail(e.target.value)}
                  placeholder="test@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Test Password</label>
                <Input
                  type="password"
                  value={testPassword}
                  onChange={(e) => setTestPassword(e.target.value)}
                  placeholder="At least 6 characters"
                />
              </div>
              <Button onClick={testEmailSignIn} disabled={isRunning}>
                Test Email Sign-In
              </Button>
            </div>
          </Card>

          {/* Google Sign-In Test */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Google Authentication</h2>
            <Button onClick={testGoogleSignIn} disabled={isRunning}>
              Test Google Sign-In
            </Button>
            <p className="text-sm text-gray-600 mt-2">
              This will open a Google sign-in popup. Make sure popups are not blocked.
            </p>
          </Card>

          {/* Test Results */}
          {testResults.length > 0 && (
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Test Results</h2>
              <div className="space-y-3">
                {testResults.map((result, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border ${
                      result.status === 'pass'
                        ? 'bg-green-50 border-green-200'
                        : result.status === 'fail'
                        ? 'bg-red-50 border-red-200'
                        : 'bg-yellow-50 border-yellow-200'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {getStatusIcon(result.status)}
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{result.test}</h3>
                        <p className="text-sm text-gray-600 mt-1">{result.message}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Instructions */}
          <Card className="p-6 bg-blue-50 border-blue-200">
            <h2 className="text-xl font-semibold mb-4 text-blue-900">Troubleshooting Steps</h2>
            <ol className="list-decimal list-inside space-y-2 text-sm text-blue-800">
              <li>Check that all environment variables are set in .env file</li>
              <li>Verify Email/Password is enabled in Firebase Console → Authentication → Sign-in method</li>
              <li>Verify Google is enabled in Firebase Console → Authentication → Sign-in method</li>
              <li>Add localhost to authorized domains in Firebase Console → Authentication → Settings</li>
              <li>Check browser console (F12) for detailed error messages</li>
              <li>Try disabling browser extensions that might block authentication</li>
              <li>Clear browser cache and cookies</li>
              <li>Try a different browser or incognito mode</li>
            </ol>
          </Card>
        </div>
      </div>
    </div>
  );
}
