import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 30,
  },
  title: {
    color: "#C1C1C1",
    fontWeight: "bold",
    fontSize: 17,
    marginBottom: 6,
  },
  filterRow: {
    paddingVertical: 5,
    paddingHorizontal: 5,
    marginLeft: 12,
  },
  filterPill: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    backgroundColor: "#EDEDED",
    borderRadius: 18,
    marginRight: 9,

  },
  selectedPill: {
    backgroundColor: "#FFC107",
  },
  pillText: {
    color: "#888",
    fontWeight: "500",
  },
  selectedPillText: {
    color: "#fff",
    fontWeight: "bold",
  },
  feedItem: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  fab: {
    position: "absolute",
    bottom: 32,
    right: 22,
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "black",
    shadowOpacity: 0.4,
    shadowRadius: 5,
    shadowOffset: {width: 0, height: 3},
    elevation: 5,
  },
});

export default styles;
