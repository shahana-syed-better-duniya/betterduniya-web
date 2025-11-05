// Add these to browser console for quick debugging:

// 1. Check current auth state
console.log("=== QUICK AUTH DEBUG ===");
console.log("localStorage (web):", localStorage.getItem("bd_access_token"));
console.log("Current URL:", window.location.href);

// 2. Clear all auth data (logout simulation)  
localStorage.removeItem("bd_access_token");
localStorage.removeItem("bd_refresh_token");
localStorage.removeItem("bd_refresh_token_expiry");
console.log("Auth tokens cleared from localStorage");

// 3. Manual token refresh test (replace with actual refresh token)
fetch('/user/refresh', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({RefreshToken: 'your_refresh_token_here'})
}).then(r => r.json()).then(console.log);

// 4. Check if axios interceptor is working
import axios from 'axios';
axios.get('/some-protected-endpoint').catch(console.log);