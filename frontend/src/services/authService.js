import { Hub } from 'aws-amplify/utils'
import {
  confirmSignUp,
  fetchAuthSession,
  fetchUserAttributes,
  getCurrentUser,
  signIn,
  signInWithRedirect,
  signOut,
  signUp,
} from 'aws-amplify/auth'
import {
  getAmplifyAuthConfigError,
  getGoogleAuthConfigError,
} from '../amplifyAuth'
import { buildApiUrl } from '../config/api'

const ensureAuthConfigured = () => {
  const configError = getAmplifyAuthConfigError()

  if (configError) {
    throw new Error(configError)
  }
}

const getErrorMessage = (error, fallbackMessage) => {
  if (!error) {
    return fallbackMessage
  }

  switch (error.code) {
    case 'UserNotConfirmedException':
      return 'Your account is not confirmed yet. Check your email for the verification code.'
    case 'UsernameExistsException':
      return 'This email is already registered.'
    case 'NotAuthorizedException':
      return 'Incorrect email or password.'
    case 'CodeMismatchException':
      return 'The verification code is incorrect.'
    case 'ExpiredCodeException':
      return 'The verification code has expired. Request a new one from Cognito.'
    case 'InvalidPasswordException':
      return 'Password does not meet the Cognito password policy.'
    default:
      return error.message || fallbackMessage
  }
}

const buildUserProfile = (user, tokens, attributes = {}) => {
  const payload = tokens.idToken?.payload || {}
  const email = payload.email || attributes.email || user.signInDetails?.loginId || user.username
  const displayName =
    payload.name ||
    attributes.name ||
    attributes.preferred_username ||
    payload['cognito:username'] ||
    email

  return {
    id: payload.sub,
    email,
    displayName,
    name: displayName,
    username: payload['cognito:username'] || user.username,
    token: tokens.idToken?.toString() || null,
  }
}

export const subscribeToAuthChanges = (listener) => {
  const cancel = Hub.listen('auth', async ({ payload }) => {
    switch (payload.event) {
      case 'signedIn':
      case 'signInWithRedirect':
      case 'tokenRefresh':
        listener(await getCurrentAuthenticatedUser())
        break
      case 'signedOut':
        listener(null)
        break
      default:
        break
    }
  })

  return cancel
}

const syncUserWithBackend = async (token) => {
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

export const getCurrentAuthenticatedUser = async () => {
  try {
    ensureAuthConfigured()

    const user = await getCurrentUser()
    const session = await fetchAuthSession()
    const attributes = await fetchUserAttributes()

    if (!session.tokens?.idToken) {
      return null
    }

    return buildUserProfile(user, session.tokens, attributes)
  } catch {
    return null
  }
}

export const syncCurrentUserWithBackend = async () => {
  const token = await getAuthToken()

  if (!token) {
    return null
  }

  return syncUserWithBackend(token)
}

export const registerWithEmail = async (email, password, displayName) => {
  ensureAuthConfigured()

  try {
    const result = await signUp({
      username: email,
      password,
      options: {
        userAttributes: {
          email,
          ...(displayName ? { name: displayName } : {}),
        },
      },
    })

    return {
      email,
      requiresConfirmation: !result.isSignUpComplete,
    }
  } catch (error) {
    throw new Error(getErrorMessage(error, 'Unable to create account.'))
  }
}

export const confirmEmailRegistration = async (email, code) => {
  ensureAuthConfigured()

  try {
    return await confirmSignUp({
      username: email,
      confirmationCode: code,
    })
  } catch (error) {
    throw new Error(getErrorMessage(error, 'Unable to confirm your email.'))
  }
}

export const loginWithEmail = async (email, password) => {
  ensureAuthConfigured()

  try {
    const result = await signIn({
      username: email,
      password,
    })

    if (result.nextStep?.signInStep === 'CONFIRM_SIGN_UP') {
      throw new Error('Your account is not confirmed yet. Check your email for the verification code.')
    }

    const user = await getCurrentAuthenticatedUser()

    if (!user?.token) {
      throw new Error('Unable to load your Cognito session after sign-in.')
    }

    await syncUserWithBackend(user.token)
    return user
  } catch (error) {
    throw new Error(getErrorMessage(error, 'Unable to log in.'))
  }
}

export const loginWithGoogle = async () => {
  ensureAuthConfigured()

  const configError = getGoogleAuthConfigError()
  if (configError) {
    throw new Error(configError)
  }

  try {
    await signInWithRedirect({
      provider: 'Google',
    })
  } catch (error) {
    throw new Error(getErrorMessage(error, 'Unable to start Google sign-in.'))
  }
}

export const logout = async () => {
  ensureAuthConfigured()
  await signOut()
}

export const getAuthToken = async () => {
  try {
    ensureAuthConfigured()
    const session = await fetchAuthSession()

    if (!session.tokens?.idToken) {
      return null
    }

    return session.tokens.idToken.toString()
  } catch {
    return null
  }
}
