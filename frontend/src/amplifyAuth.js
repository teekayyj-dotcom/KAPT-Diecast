import { Amplify } from 'aws-amplify'

const userPoolId = import.meta.env.VITE_COGNITO_USER_POOL_ID?.trim() || 'us-east-1_sPexa5AeC'
const clientId = import.meta.env.VITE_COGNITO_CLIENT_ID?.trim() || '3g86qsse5ceuelbg0rifkf1kui'
const region = import.meta.env.VITE_COGNITO_REGION?.trim() || userPoolId?.split('_')[0] || 'us-east-1'
const domain = import.meta.env.VITE_COGNITO_DOMAIN?.trim()
const isLocalHost = (hostname) => hostname === 'localhost' || hostname === '127.0.0.1'
const defaultOrigin = typeof window !== 'undefined' ? window.location.origin : ''
const useLocalRedirects =
  typeof window === 'undefined' || isLocalHost(window.location.hostname)
const redirectSignIn = useLocalRedirects
  ? import.meta.env.VITE_COGNITO_SIGN_IN_REDIRECT_URL?.trim() || defaultOrigin
  : import.meta.env.VITE_COGNITO_SIGN_IN_REDIRECT_URL_PROD?.trim() ||
    import.meta.env.VITE_COGNITO_SIGN_IN_REDIRECT_URL?.trim() ||
    defaultOrigin
const redirectSignOut = useLocalRedirects
  ? import.meta.env.VITE_COGNITO_SIGN_OUT_REDIRECT_URL?.trim() || defaultOrigin
  : import.meta.env.VITE_COGNITO_SIGN_OUT_REDIRECT_URL_PROD?.trim() ||
    import.meta.env.VITE_COGNITO_SIGN_OUT_REDIRECT_URL?.trim() ||
    defaultOrigin

export const amplifyAuthConfig = {
  userPoolId,
  clientId,
  region,
  domain,
  redirectSignIn,
  redirectSignOut,
  googleClientId: import.meta.env.VITE_GOOGLE_CLIENT_ID?.trim() || '',
}

export const isAmplifyAuthConfigured = Boolean(userPoolId && clientId && region)

export const isGoogleFederationConfigured = Boolean(
  isAmplifyAuthConfigured && domain && redirectSignIn && redirectSignOut,
)

export const getAmplifyAuthConfigError = () => {
  if (isAmplifyAuthConfigured) {
    return null
  }

  return 'Amplify Auth is not configured. Set VITE_COGNITO_USER_POOL_ID, VITE_COGNITO_CLIENT_ID, and VITE_COGNITO_REGION.'
}

export const getGoogleAuthConfigError = () => {
  if (isGoogleFederationConfigured) {
    return null
  }

  return 'Google sign-in needs VITE_COGNITO_DOMAIN plus sign-in/sign-out redirect URLs.'
}

if (isAmplifyAuthConfigured) {
  const authConfig = {
    Cognito: {
      userPoolId,
      userPoolClientId: clientId,
      loginWith: {
        email: true,
      },
    },
  }

  if (domain && redirectSignIn && redirectSignOut) {
    authConfig.Cognito.loginWith.oauth = {
      domain,
      scopes: ['openid', 'email', 'profile'],
      redirectSignIn: [redirectSignIn],
      redirectSignOut: [redirectSignOut],
      responseType: 'code',
      providers: ['Google'],
    }
  }

  Amplify.configure({
    Auth: authConfig,
  })
}
