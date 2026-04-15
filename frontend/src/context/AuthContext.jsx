import { createContext, useContext, useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebase'
import { getUserRole } from '../utils/roles'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [role, setRole] = useState('guest')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user)
      setRole(user ? getUserRole(user) : 'guest')
      
      if (user) {
        try {
          const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:8001";
          const token = await user.getIdToken();
          await fetch(`${apiBaseUrl}/auth/me`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
        } catch (e) {
          console.error("Failed to sync user with backend", e);
        }
      }
      
      setLoading(false)
    })

    return unsubscribe
  }, [])

  return (
    <AuthContext.Provider value={{ currentUser, role, isAdmin: role === 'admin', loading }}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
