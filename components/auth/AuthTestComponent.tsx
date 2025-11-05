/**
 * Authentication Testing Component
 * Add this to any screen to test auth functionality
 */
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import useAuthTokens from '@/hooks/auth/use-auth-tokens';
import useAuthTokenRefresh from '@/hooks/auth/use-auth-token-refresh';
import { useUserContext } from '@/utils/user/user-context';
import { debugAuthStateWith } from '@/utils/auth/token-debug';
import { isAuthStateConsistent, forceLogoutAndCleanup } from '@/utils/auth/auth-cleanup';

export const AuthTestComponent = () => {
  const { 
    onGetAccessToken, 
    onGetRefreshToken, 
    onGetRefreshTokenExpiry, 
    onSetAccessToken,
    onClearTokens 
  } = useAuthTokens();
  
  const { onRefreshToken } = useAuthTokenRefresh();
  const { userId, username, isLoaded, resetUserContext } = useUserContext();

  const testTokenStorage = async () => {
    console.log("🧪 === TESTING TOKEN STORAGE ===");
    try {
      // Test saving and retrieving token
      const testToken = `test_token_${Date.now()}`;
      await onSetAccessToken(testToken);
      const retrieved = await onGetAccessToken();
      
      console.log("✅ Test Result:", testToken === retrieved ? "PASSED" : "FAILED");
      console.log("📝 Expected:", testToken);
      console.log("📝 Retrieved:", retrieved);
    } catch (error) {
      console.error("❌ Token storage test failed:", error);
    }
  };

  const testTokenRefresh = async () => {
    console.log("🧪 === TESTING TOKEN REFRESH ===");
    try {
      const result = await onRefreshToken();
      console.log("✅ Refresh Result:", result ? "SUCCESS" : "FAILED");
      if (result) {
        console.log("📝 New Access Token Length:", result.length);
      }
    } catch (error) {
      console.error("❌ Token refresh test failed:", error);
    }
  };

  const testAuthStateConsistency = async () => {
    console.log("🧪 === TESTING AUTH STATE CONSISTENCY ===");
    try {
      const isConsistent = await isAuthStateConsistent({
        onGetAccessToken,
        onGetRefreshToken,
        userId
      });
      
      console.log("✅ Auth State Consistent:", isConsistent ? "YES" : "NO");
      
      if (!isConsistent) {
        console.log("⚠️ Inconsistent state detected - this would trigger auto-logout");
      }
    } catch (error) {
      console.error("❌ Auth state consistency test failed:", error);
    }
  };

  const testDebugAuthState = async () => {
    console.log("🧪 === RUNNING DEBUG AUTH STATE ===");
    try {
      await debugAuthStateWith({
        onGetAccessToken,
        onGetRefreshToken,
        onGetRefreshTokenExpiry,
        userId,
        username,
        isLoaded
      });
    } catch (error) {
      console.error("❌ Debug auth state failed:", error);
    }
  };

  const testForceLogout = async () => {
    console.log("🧪 === TESTING FORCE LOGOUT ===");
    if (confirm("This will log you out completely. Continue?")) {
      try {
        await forceLogoutAndCleanup({
          onClearTokens,
          resetUserContext: async () => resetUserContext()
        });
        console.log("✅ Force logout completed");
      } catch (error) {
        console.error("❌ Force logout test failed:", error);
      }
    }
  };

  const runAllTests = async () => {
    console.log("🚀 === RUNNING ALL AUTH TESTS ===");
    await testDebugAuthState();
    await testTokenStorage();
    await testAuthStateConsistency();
    // Skip refresh test if no refresh token available
    const refreshToken = await onGetRefreshToken();
    if (refreshToken) {
      await testTokenRefresh();
    } else {
      console.log("⏭️ Skipping refresh test - no refresh token available");
    }
    console.log("✅ === ALL TESTS COMPLETED ===");
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>🔐 Auth Testing Panel</Text>
      
      <View style={styles.infoSection}>
        <Text style={styles.infoTitle}>Current Auth Status:</Text>
        <Text style={styles.infoText}>User ID: {userId || 'None'}</Text>
        <Text style={styles.infoText}>Username: {username || 'None'}</Text>
        <Text style={styles.infoText}>Loaded: {isLoaded ? 'Yes' : 'No'}</Text>
      </View>

      <View style={styles.buttonSection}>
        <TouchableOpacity style={styles.button} onPress={testDebugAuthState}>
          <Text style={styles.buttonText}>🔍 Debug Auth State</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={testTokenStorage}>
          <Text style={styles.buttonText}>💾 Test Token Storage</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={testAuthStateConsistency}>
          <Text style={styles.buttonText}>🔄 Test State Consistency</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={testTokenRefresh}>
          <Text style={styles.buttonText}>🔃 Test Token Refresh</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.dangerButton]} onPress={testForceLogout}>
          <Text style={styles.buttonText}>🚪 Test Force Logout</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.primaryButton]} onPress={runAllTests}>
          <Text style={styles.buttonText}>🚀 Run All Tests</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.noteSection}>
        <Text style={styles.noteTitle}>📋 Testing Notes:</Text>
        <Text style={styles.noteText}>• Check browser console for detailed logs</Text>
        <Text style={styles.noteText}>• Debug Auth State shows current token status</Text>
        <Text style={styles.noteText}>• Token Storage tests save/retrieve functionality</Text>
        <Text style={styles.noteText}>• State Consistency checks user vs token mismatch</Text>
        <Text style={styles.noteText}>• Token Refresh tests the refresh endpoint</Text>
        <Text style={styles.noteText}>• Force Logout clears all auth data</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  infoSection: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  infoText: {
    fontSize: 14,
    marginBottom: 5,
    color: '#666',
  },
  buttonSection: {
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
  },
  primaryButton: {
    backgroundColor: '#34C759',
  },
  dangerButton: {
    backgroundColor: '#FF3B30',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  noteSection: {
    backgroundColor: '#FFF9C4',
    padding: 15,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#FFC107',
  },
  noteTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  noteText: {
    fontSize: 12,
    marginBottom: 3,
    color: '#666',
  },
});

export default AuthTestComponent;