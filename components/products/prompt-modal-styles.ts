import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    width: 300,
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    padding: 25,
    alignItems: 'center',
  },
  title: {fontSize: 22, fontWeight: 'bold', color: '#333333', textAlign: 'center'},
  message: {marginTop: 10, fontSize: 17, textAlign: 'center', color: '#666666'},
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
    gap: 20,
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    backgroundColor: '#FFB300',
    borderRadius: 50,
    shadowColor: "black",
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: {width: 0, height: 2},
    elevation: 3,
  },
  btnTxt: {
    fontWeight: 800,
    color: '#FFFFFF',
  }
});
