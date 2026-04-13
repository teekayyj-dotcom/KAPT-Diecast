import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth'
import { auth } from '../firebase'

export const registerWithEmail = async (email, password, displayName) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password)

  if (displayName) {
    await updateProfile(userCredential.user, { displayName })
  }

  return userCredential.user
}

export const loginWithEmail = async (email, password) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password)
  return userCredential.user
}

export const loginWithGoogle = async () => {
  const provider = new GoogleAuthProvider()
  const userCredential = await signInWithPopup(auth, provider)
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

