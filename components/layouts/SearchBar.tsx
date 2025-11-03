import React, { forwardRef } from "react";
import { Dimensions, Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

interface SearchBarProps {
  searchValue: string;
  icon: string;
  onChangeText: (val: string) => void;
  placeholder: string;
  onSearch: () => Promise<void>;
}
const {width, height} = Dimensions.get("window");

const SearchBar = forwardRef<TextInput, SearchBarProps>(function SearchBar(
  {searchValue, icon, onChangeText, placeholder, onSearch}, ref) {
    return (
      <View style={styles.searchRow}>
        <View style={styles.searchBar}>
          <Icon name={icon} size={20} color="#999" style={{marginRight: 6}}/>
          <TextInput
            ref={ref}
            style={styles.searchInput}
            placeholderTextColor="#bbb"
            placeholder={placeholder}
            value={searchValue}
            onChangeText={onChangeText}
            onSubmitEditing={() => {
                Keyboard.dismiss();   // Hides the keyboard
                onSearch();           // Calls search function
             }}
            returnKeyType="go"         // This shows "Go" on the keyboard
          />
        </View>
        <TouchableOpacity style={styles.goButton} onPress={onSearch}>
          <Text style={styles.goButtonText}>Go !</Text>
        </TouchableOpacity>
      </View>
    )
  }
)

export default SearchBar;

const styles = StyleSheet.create({
  searchRow: {flexDirection: "row", alignItems: "center", marginBottom: 16, marginHorizontal: 16, marginTop: 15},
  searchBar: {
    flex: 1,
    backgroundColor: "#fafafa",
    borderRadius: 18,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    height: height * 0.047,
    shadowColor: "black",
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  searchInput: {flex: 1, fontSize: 16, color: "#444"},
  goButton: {
    backgroundColor: "#FFC107",
    height: height * 0.045,
    paddingHorizontal: 16,
    marginLeft: 10,
    borderRadius: 18,
    justifyContent: "center", alignItems: "center",
    shadowColor: "black",
    shadowOpacity: 0.4,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  goButtonText: {fontWeight: "bold", color: "#fff", fontSize: 16},
  headerRow: {flexDirection: "row", alignItems: "center", marginBottom: 10,},
  avatar: {width: 62, height: 62, borderRadius: 31,},
  displayName: {fontWeight: "bold", fontSize: 18, color: "#222"},
  username: {color: "#888", fontSize: 14,},
  mutedText: {color: "#999", fontSize: 13, marginRight: 12},
  bioTitle: {fontWeight: "bold", fontSize: 16, marginTop: 12, marginBottom: 4},
  bioBox: {backgroundColor: "#F4F4F4", borderRadius: 7, padding: 14, marginBottom: 4},
  bioText: {fontSize: 15, color: "#222"},
  charCount: {alignSelf: "flex-end", fontSize: 12, color: "#999", marginBottom: 14},
  quickActionsRow: {flexDirection: "row", justifyContent: "space-between", marginTop: 12,},
  quickAction: {alignItems: "center", flex: 1},
});

