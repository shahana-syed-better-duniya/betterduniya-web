import {Dimensions, Platform, StyleSheet} from "react-native";

const {width, height} = Dimensions.get("window");


const LOGO_SIZE = Math.min(110, Math.max(64, width * 0.28)); // between 64 and 110 px
const TITLE_SIZE = Math.min(34, Math.max(22, width * 0.08)); // between 22 and 34 px
const CARD_WIDTH = Math.min(width * 0.92, 420);


export const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  scrollContent: {
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: height * 0.04,
    paddingBottom: height * 0.05,
  },
  logoSection: {
    alignItems: "center",
    marginBottom: height * 0.02,
    marginTop: height * 0.01,
  },
  logoCircle: {
    backgroundColor: "#fff",
    borderRadius: 100,
    width: LOGO_SIZE,
    height: LOGO_SIZE,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
    marginBottom: 12,
  },
  logoImage: {
    width: "60%",
    height: "60%",
    maxWidth: LOGO_SIZE * 0.6,
    maxHeight: LOGO_SIZE * 0.6,
    resizeMode: "contain",
  },
  title: {
    fontSize: TITLE_SIZE,
    fontFamily: Platform.select({
      ios: "Menlo",
      android: "monospace",
      default: "monospace",
    }),
    fontWeight: "400",
    letterSpacing: 2,
    color: "#222",
    textShadowColor: "#ddd",
    textShadowOffset: {width: 0, height: 2},
    textShadowRadius: 2,
    marginTop: 8,
    marginBottom: 10,
  },
  card: {
    width: CARD_WIDTH,
    backgroundColor: "#fff",
    borderRadius: 28,
    paddingVertical: 24,
    paddingHorizontal: "5%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.11,
    shadowRadius: 12,
    elevation: 4,
    marginTop: 6,
    minHeight: 340,
  },
  tabRow: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    marginBottom: 26,
  },
  tabBtn: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    backgroundColor: "transparent",
    borderRadius: 30,
    marginHorizontal: 2,
    borderWidth: 1,
    borderColor: "#FFD740",
  },
  tabBtnActive: {
    backgroundColor: "#FFD740",
    borderColor: "#FFD740",
  },
  tabText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#FFD740",
  },
  tabTextActive: {
    color: "#fff",
    fontWeight: "700",
  },
  inputSection: {
    width: "100%",
    marginBottom: 10,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: "#eee",
    paddingVertical: 10,
    paddingHorizontal: 4,
    fontSize: 16,
    marginBottom: 12,
    color: "#222",
  },
  inputError: {
    color: "#d32f2f",
    fontSize: 13,
    marginBottom: 4,
    marginTop: -8,
  },
  forgotPassword: {
    alignSelf: "flex-end",
    marginBottom: 10,
  },
  forgotPasswordTitle: {
    color: "#888",
    fontSize: 16,
    fontWeight: 600,
  },
  forgotPasswordText: {
    color: "#888",
    fontSize: 13,
    marginTop: 8,
    marginBottom: 16,
  },
  loginBtn: {
    width: "100%",
    backgroundColor: "#FFD740",
    borderRadius: 30,
    paddingVertical: 13,
    alignItems: "center",
    marginVertical: 10,
    shadowColor: "#FFD740",
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 2,
  },
  loginBtnText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  orText: {
    marginVertical: 14,
    fontSize: 15,
    color: "#A9A9A9",
    textAlign: "center",
  },
  socialRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 4,
  },
  socialIcon: {
    width: 38,
    height: 38,
    marginHorizontal: 8,
    resizeMode: "contain",
  },
  successMessage: {
    color: "green",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
    textAlign: "center",
  },
});
