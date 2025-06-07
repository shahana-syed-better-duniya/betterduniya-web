import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useNavigation} from "expo-router";
import { router } from 'expo-router';

const VerifySuccessScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.logoSection}>
        <View style={styles.logoCircle}>
          <Text style={styles.logoText}>✓</Text>
        </View>
      </View>

      <Text style={styles.title}>Verification Successful!</Text>
      <Text style={styles.subtitle}>
        Your email has been verified successfully. You can now proceed to use the app.
      </Text>

      <TouchableOpacity style={styles.proceedBtn} onPress={() => router.replace('/(tabs)/home-screen')}>
        <Text style={styles.proceedBtnText}>Proceed</Text>
      </TouchableOpacity>
    </View>
  )
}


const styles = StyleSheet.create({
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

export default VerifySuccessScreen;
