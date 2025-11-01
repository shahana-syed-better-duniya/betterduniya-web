import { Dimensions, StyleSheet } from "react-native";

const {width, height} = Dimensions.get("window");
// const LOGO_SIZE = Math.min(150, Math.max(180, width * 0.28)); // between 64 and 110 px
const LOGO_SIZE = 0.17;
const TITLE_SIZE = Math.min(50, Math.max(35, width * 0.08)); // between 22 and 34 px

export const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  card: {
    width: "100%",
    height: height * 0.5,
    padding: 20,
    borderRadius: 10,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    flex: 1,
    width: "100%",
    height: height * 0.5,
  },
  scrollContent: {
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: height * 0.04,
    paddingBottom: height * 0.05,
    width: "100%",
  },
  logoSection: {
    alignItems: "center",
    marginBottom: height * 0.02,
  },
  logoCircle: {
    backgroundColor: "#fff",
    borderRadius: 100,
    width: LOGO_SIZE * height,
    height: LOGO_SIZE * height,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
    marginBottom: 15,
    marginTop: height * 0.09
  },
  title: {
    fontSize: height * 0.04,
    fontWeight: 600,
    fontFamily: "ClashGrotesk",
    color: "#1B1B1B",
    marginBottom: height * 0.01,
  },
  appTitle: {
    fontSize: height * 0.04,
    fontWeight: 400,
    color: "#1B1B1B",
    marginBottom: height * 0.01,
    fontFamily: 'Jura_400Regular'
  },
  // card: {
  //   width: CARD_WIDTH,
  //   backgroundColor: "#fff",
  //   borderRadius: 28,
  //   paddingVertical: 24,
  //   paddingHorizontal: "5%",
  //   alignItems: "center",

  //   marginTop: 6,
  //   minHeight: 340,

  //   shadowColor: "#000",
  // shadowOffset: { width: 0, height: 8 }, // more height to push shadow down only
  // shadowOpacity: 0.0,
  // shadowRadius: 12,
  // // elevation: 3, // slightly higher for thicker shadow on Android
  // },
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
    paddingVertical: height * 0.1,
    alignItems: "center",
    backgroundColor: "transparent",
    borderRadius: 30,

  },
  tabBtnActive: {
    backgroundColor: "#FFBF00",
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
  },
  input: {
    borderBottomWidth: 1,
    borderColor: "#eee",
    paddingVertical: height * 0.01,
    paddingHorizontal: 5,
    fontSize: height * 0.02,
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
    marginBottom: height * 0.012,
  },
  forgotPasswordText: {
    color: "#888",
    fontSize: height * 0.0155,
    marginTop: height * 0.01,
    marginBottom: height * 0.03,
  },
  loginBtn: {
    width: "70%",
    backgroundColor: "#ffc107",
    borderRadius: 30,
    paddingVertical: height * 0.015,
    alignItems: "center",
    marginVertical: 10,
    shadowColor: "black",
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: {width: 0, height: 2},
    elevation: 2,
  },
  loginBtnText: {
    color: "#fff",
    fontSize: height * 0.022,
    fontWeight: "bold",
  },
  orText: {
    marginVertical: height * 0.02,
    fontSize: height * 0.0155,
    color: "#A9A9A9",
    textAlign: "center",
  },
  socialRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  socialIcon: {
    width: height * 0.045,
    height: height * 0.045,
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
  },
  header: {fontWeight: "bold", fontSize: 24, marginTop: 7, marginBottom: 16},
});
