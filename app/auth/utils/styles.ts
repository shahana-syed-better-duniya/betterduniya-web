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
    marginBottom: 15,
  },
  logoImage: {
    width: "60%",
    height: "60%",
    maxWidth: LOGO_SIZE * 0.6,
    maxHeight: LOGO_SIZE * 0.6,
    resizeMode: "contain",
  },
  title: {
    fontSize: 36,
    fontWeight: 700,
    fontFamily: "Kanit-Regular.ttf",
    color: "#1B1B1B",
    marginBottom: 10,
  },
  card: {
    width: CARD_WIDTH,
    backgroundColor: "#fff",
    borderRadius: 28,
    paddingVertical: 24,
    paddingHorizontal: "5%",
    alignItems: "center",

    marginTop: 6,
    minHeight: 340,

    shadowColor: "#000",
  shadowOffset: { width: 0, height: 8 }, // more height to push shadow down only
  shadowOpacity: 0.0,
  shadowRadius: 12,
  // elevation: 3, // slightly higher for thicker shadow on Android
  },
  tabRow: {
    flexDirection: "row",
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#D9D9D9",
    width: "70%",
    justifyContent: "center",
    marginBottom: 26,
  },
  tabBtn: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    backgroundColor: "transparent",
    borderRadius: 30,
    
  },
  tabBtnActive: {
    backgroundColor: "#FFBF00",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  tabText: {
    fontSize: 16,
    fontWeight: 700,
    color: "#FFBF00",
  },
  tabTextActive: {
    color: "#fff",
  },
  inputSection: {
    width: "70%",
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
    width: "70%",
    backgroundColor: "#FFD740",
    borderRadius: 30,
    paddingVertical: 13,
    alignItems: "center",
    marginVertical: 10,
    shadowColor: "black",
    shadowOpacity: 0.55,
    shadowRadius: 5,
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
  verifyBtn: {
    width: "85%",
    backgroundColor: "#FFD740",
    borderRadius: 30,
    paddingVertical: 12,
    alignItems: "center",
    shadowColor: "#FFD740",
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 2,
    marginBottom: 16,
  },
  verifyBtnText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  }
});
