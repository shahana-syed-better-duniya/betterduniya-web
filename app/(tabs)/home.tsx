import React from "react";
import {ActivityIndicator, StyleSheet, Text, TextInput, TouchableOpacity, View, BackHandler} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import AppLogo from "@/components/layouts/AppLogo";
import useSearchProductReview from "@/hooks/product/use-search-product-review";
import {AppConfigs} from "@/constants/app-configs";
import { useNavigation } from '@react-navigation/native';
import BackPromptModal from '@/components/products/Alert';



  const [showPrompt, setShowPrompt] = React.useState(false);

  React.useEffect(() => {
    const backAction = () => {
      setShowPrompt(true); // show the modal
      return true; // prevent default back action
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  const handleConfirm = () => {
    setShowPrompt(false);

  };

  const handleCancel = () => {
    setShowPrompt(false);
  };

export default function Home() {
  const {
    onSearch,
    isLoading,
    searchValue,
  } = useSearchProductReview();
  return (
    <View style={stylesLocal.container}>
      <BackPromptModal
        visible={showPrompt}
        onCancel={handleCancel}
        onConfirm={handleConfirm}
        title={"Hold on!"}
        desc={"Are you sure you want to cancel registration?"}
      />
      <View style={stylesLocal.logoWrapper}>
        <View style={stylesLocal.logoCircle}>
          <AppLogo/>
        </View>
        <Text style={stylesLocal.brandText}>{AppConfigs.APP_NAME}</Text>
      </View>

      <View style={stylesLocal.searchSection}>
        <View style={stylesLocal.searchBar}>
          <TextInput
            style={stylesLocal.searchInput}
            placeholder="Search..."
            placeholderTextColor="#bbb"
            value={searchValue.value}
            onChangeText={searchValue.onChangeValue}
          />
          <Icon name="search" size={22} color="#bbb" style={{marginLeft: 5}}/>
        </View>

        <TouchableOpacity style={stylesLocal.goButton} onPress={onSearch}>
          {isLoading ? (
            <ActivityIndicator color="#fff"/>
          ) : (
            <Text style={stylesLocal.goButtonText}>GO !</Text>
          )}
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={stylesLocal.fab}>
        <Icon name="search" size={28} color="#FFC107"/>
      </TouchableOpacity>
    </View>
  );
}

const stylesLocal = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
  },
  logoWrapper: {
    alignItems: "center",
    top: 70,
  },
  logoCircle: {
    width: 150,
    height: 150,
    borderRadius: 100,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
    shadowColor: "black",
    shadowRadius: 12,
    shadowOpacity: 0.1,
    elevation: 4,
  },
  brandText: {
    fontSize: 36,
    fontWeight: 600,
    fontFamily: "ClashGrotesk",
    color: "#1B1B1B",
  },
  searchSection: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FCFCFF",
    borderRadius: 28,
    height: 52,
    paddingHorizontal: 24,
    width: "84%",
    marginTop: -160,
    marginBottom: 47,
    shadowColor: "black",
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 18,
    color: "#222",
  },
  goButton: {
    backgroundColor: "#FFC107",
    paddingHorizontal: 44,
    paddingVertical: 11,
    borderRadius: 24,
    alignItems: "center",
    shadowColor: "black",
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    elevation: 4,
  },
  goButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
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
    shadowOffset: { width: 0, height: 3 },
    elevation: 5,
  },
});
