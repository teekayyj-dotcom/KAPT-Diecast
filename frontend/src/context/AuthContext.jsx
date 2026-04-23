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

      if (user) {
        try {
          const syncedUser = await syncCurrentUserWithBackend()
          const resolvedUser = syncedUser
            ? {
                ...user,
                email: syncedUser.email || user.email,
                displayName: syncedUser.full_name || user.displayName || user.email,
                fullName: syncedUser.full_name || user.fullName,
                backendRole: syncedUser.role,
              }
            : user

          setCurrentUser(resolvedUser)
          setRole(syncedUser?.role || getUserRole(resolvedUser))
        } catch (e) {
          console.error('Failed to sync user with backend', e)
          setCurrentUser(user)
          setRole(getUserRole(user))
        }
      } else {
        setCurrentUser(null)
        setRole('guest')
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
