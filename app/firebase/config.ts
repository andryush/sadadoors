import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIRBEASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIRBEASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIRBEASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIRBEASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIRBEASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIRBEASE_APP_ID,
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const auth = getAuth(app);

export { app, auth };
