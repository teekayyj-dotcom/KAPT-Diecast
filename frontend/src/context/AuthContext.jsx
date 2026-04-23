import { createContext, useContext, useEffect, useState } from 'react'
import { getUserRole } from '../utils/roles'
import {
  getCurrentAuthenticatedUser,
  subscribeToAuthChanges,
  syncCurrentUserWithBackend,
} from '../services/authService'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [role, setRole] = useState('guest')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    const applyUser = async (user) => {
      if (!isMounted) {
        return
      }

      setCurrentUser(user)
      setRole(user ? getUserRole(user) : 'guest')

      if (user) {
        try {
          await syncCurrentUserWithBackend()
        } catch (e) {
          console.error('Failed to sync user with backend', e)
        }
      }

      setLoading(false)
    }

    getCurrentAuthenticatedUser()
      .then(applyUser)
      .catch((error) => {
        if (isMounted) {
          setCurrentUser(null)
          setRole('guest')
          setLoading(false)
        }
      })

    const unsubscribe = subscribeToAuthChanges((user) => {
      applyUser(user)
    })

    return () => {
      isMounted = false
      unsubscribe()
    }
  }, [])

  return (
    <AuthContext.Provider value={{ currentUser, role, isAdmin: role === 'admin', loading }}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
