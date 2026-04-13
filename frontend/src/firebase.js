import { initializeApp } from 'firebase/app'
import { getAnalytics, isSupported } from 'firebase/analytics'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'AIzaSyA6dODUQEpX-oVsGJCwQObg_pzIOPtd8OU',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'kapt-diecast.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'kapt-diecast',
  storageBucket:
    import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'kapt-diecast.firebasestorage.app',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '577710641299',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:577710641299:web:e2a1183a56436fadf13d66',
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || 'G-L5NWW1B53E',
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

const shouldEnableAnalytics =
  import.meta.env.VITE_ENABLE_FIREBASE_ANALYTICS === 'true' &&
  typeof window !== 'undefined' &&
  firebaseConfig.measurementId

if (shouldEnableAnalytics) {
  isSupported().then((supported) => {
    if (supported) {
      getAnalytics(app)
    }
  })
}

export { app, auth }
