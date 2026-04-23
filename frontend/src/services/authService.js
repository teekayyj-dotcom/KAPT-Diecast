import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth'
import { auth } from '../firebase'
import { buildApiUrl } from '../config/api'

const syncUserWithBackend = async (user) => {
  const token = await user.getIdToken()
  const response = await fetch(buildApiUrl('/auth/me'), {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    throw new Error('Failed to sync user with backend')
  }

  return response.json()
}

export const registerWithEmail = async (email, password, displayName) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password)

  if (displayName) {
    await updateProfile(userCredential.user, { displayName })
  }

  await syncUserWithBackend(userCredential.user)

  return userCredential.user
}

export const loginWithEmail = async (email, password) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password)
  await syncUserWithBackend(userCredential.user)
  return userCredential.user
}

export const loginWithGoogle = async () => {
  const provider = new GoogleAuthProvider()
  const userCredential = await signInWithPopup(auth, provider)
  await syncUserWithBackend(userCredential.user)
  return userCredential.user
}

export const logout = async () => {
  await signOut(auth)
}

export const getFirebaseToken = async () => {
  const user = auth.currentUser
  if (!user) return null
  return user.getIdToken()
}
