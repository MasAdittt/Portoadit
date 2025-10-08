// Tambahkan ini di file firebase.js untuk debug konfigurasi
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// DEBUG: Log konfigurasi Firebase
console.log('Firebase Config Debug:');
console.log('- API Key:', firebaseConfig.apiKey ? '✓ Set' : '✗ Missing');
console.log('- Auth Domain:', firebaseConfig.authDomain || '✗ Missing');
console.log('- Database URL:', firebaseConfig.databaseURL || '✗ Missing');
console.log('- Project ID:', firebaseConfig.projectId || '✗ Missing');
console.log('- Storage Bucket:', firebaseConfig.storageBucket || '✗ Missing');
console.log('- App ID:', firebaseConfig.appId ? '✓ Set' : '✗ Missing');

// Pastikan storageBucket tidak undefined
if (!firebaseConfig.storageBucket) {
  console.error('❌ CRITICAL: storageBucket is missing!');
  console.log('Current value:', firebaseConfig.storageBucket);
  console.log('Environment variable:', import.meta.env.VITE_FIREBASE_STORAGE_BUCKET);
}

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const database = getDatabase(app);
export const storage = getStorage(app);

// DEBUG: Log storage instance
console.log('Firebase Storage:', storage);
console.log('Storage bucket:', storage._bucket);

export { analytics };
export default app;