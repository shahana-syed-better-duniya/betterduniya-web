export const GOOGLE_OAUTH_APP_GUID = '891699588983-jiu9s1f5d9scrtddevkjs92n46pbgmi4';

export const oauthConfig = {
  authorizationEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
  tokenEndpoint: 'https://oauth2.googleapis.com/token',
  issuer: 'https://accounts.google.com',
  clientId: `${GOOGLE_OAUTH_APP_GUID}.apps.googleusercontent.com`,
  scheme: `com.googleusercontent.apps.${GOOGLE_OAUTH_APP_GUID}`,
  redirectUrl: `com.googleusercontent.apps.${GOOGLE_OAUTH_APP_GUID}:/oauth2redirect/google`,
  scopes: ['openid', 'profile', 'email'],
};
