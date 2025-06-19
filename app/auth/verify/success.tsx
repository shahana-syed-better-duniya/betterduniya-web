import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {router} from "expo-router";
import {styles} from "@/utils/auth/styles";

const Success = () => {
  return (
    <View style={stylesLocal.container}>
      <View style={stylesLocal.logoSection}>
        <View style={stylesLocal.logoCircle}>
          <Text style={stylesLocal.logoText}>✓</Text>
        </View>
      </View>

      <Text style={stylesLocal.title}>Verification Successful!</Text>
      <Text style={stylesLocal.subtitle}>
        Your email has been verified successfully. You can now proceed to use the app.
      </Text>

      <TouchableOpacity style={styles.loginBtn} onPress={() => router.replace('/(tabs)/home-screen')}>
        <Text style={stylesLocal.proceedBtnText}>Go to Home Screen</Text>
      </TouchableOpacity>
    </View>
  )
}


const stylesLocal = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    paddingHorizontal: 16,
  },
  logoSection: {
    alignItems: "center",
    marginBottom: 24,
  },
  logoCircle: {
    backgroundColor: "#fff",
    borderRadius: 100,
    width: 80,
    height: 80,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  logoText: {
    fontSize: 36,
    color: "#4CAF50", // Green color for success
    fontWeight: "bold",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  proceedBtn: {
    width: "85%",
    backgroundColor: "#FFD740",
    borderRadius: 30,
    paddingVertical: 12,
    alignItems: "center",
    shadowColor: "#FFD740",
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 2,
  },
  proceedBtnText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Success;
