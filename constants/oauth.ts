export const GOOGLE_OAUTH_APP_GUID = '365559828766-e3ebe5cujt9r4s7vb6o2v1rfbuojgs4v';

export const oauthConfig = {
  issuer: 'https://accounts.google.com',
  clientId: `${GOOGLE_OAUTH_APP_GUID}.apps.googleusercontent.com`,
  redirectUrl: `com.googleusercontent.apps.duniya`,
  scopes: ['openid', 'profile'],
};
