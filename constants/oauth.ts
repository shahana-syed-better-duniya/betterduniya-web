export const GOOGLE_OAUTH_APP_GUID = '365559828766-e3ebe5cujt9r4s7vb6o2v1rfbuojgs4v';

export const oauthConfig = {
  authorizationEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
  tokenEndpoint: 'https://oauth2.googleapis.com/token',
  issuer: 'https://accounts.google.com',
  clientId: `${GOOGLE_OAUTH_APP_GUID}.apps.googleusercontent.com`,
  scheme: `com.googleusercontent.apps.${GOOGLE_OAUTH_APP_GUID}`,
  redirectUrl: `com.googleusercontent.apps.${GOOGLE_OAUTH_APP_GUID}:/oauth2redirect/google`,
  scopes: ['openid', 'profile', 'email'],
};
