import React from "react";
import {ActivityIndicator, BackHandler, StyleSheet, Text, TextInput, TouchableOpacity, Dimensions, View} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import AppLogo from "@/components/layouts/AppLogo";
import useSearchProductReview from "@/hooks/product/use-search-product-review";
import {AppConfigs} from "@/constants/app-configs";
import BackPromptModal from '@/components/products/BackPromptModal';
import {useFonts} from "expo-font";
import {Jura_400Regular} from "@expo-google-fonts/jura";
import {useBoolean} from "@/hooks/primitive/use-boolean";
import styles from "@/components/products/product-review-list-styles";
import SearchBar from "@/components/layouts/SearchBar";
import ProductReviewList from "@/components/products/ProductReviewList";
import {useProductReviewContext} from "@/utils/products/product-review-context";

const {width} = Dimensions.get("window");

export default function Home() {
  let [fontsLoaded] = useFonts({
    Jura_400Regular,
  });


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

  const {
    onSearch,
    isLoading,
    searchValue,
  } = useSearchProductReview();

  const isSearched = useBoolean(false);
  const isSearchValueChanged = useBoolean(false);

  const handleSearch = async () => {
    isSearched.onTrue();
    await onSearch();
  }

  const handleChangeSearchText = (val: string) => {
    isSearchValueChanged.onTrue();
    searchValue.onChangeValue(val);
  }

  const {summary, previousSearchValue} = useProductReviewContext();
  if (isSearched.value) {
    return (
      <View style={styles.container}>
        <View style={{marginBottom: 20}}>
          <SearchBar searchValue={searchValue.value || (isSearchValueChanged.value ? '' : previousSearchValue)}
                     icon={"search-outline"}
                     onChangeText={handleChangeSearchText}
                     placeholder={'Search Product...'}
                     onSearch={onSearch}/>
        </View>
        <ProductReviewList summary={summary ?? {reviews: [], userById: {}, imageUriById: {}}}/> <TouchableOpacity
        style={styles.fab}>
        <Icon name="search" size={28} color="#FFC107"/>
      </TouchableOpacity>
      </View>
    )
  }


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

        <TouchableOpacity style={stylesLocal.goButton} onPress={handleSearch}>
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

const stylesLocal= StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
  },
  logoWrapper: {
    alignItems: "center",
    top: width * 0.2,
  },
  logoCircle: {
    width: width * 0.38,
    height: width * 0.38,
    borderRadius: 100,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: width * 0.035,
    shadowColor: "black",
    shadowRadius: 12,
    shadowOpacity: 0.1,
    elevation: 4,
  },
  brandText: {
    fontSize: width * 0.085,
    fontWeight: 600,
    fontFamily: "Jura_400Regular",
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
    height: width * 0.14,
    paddingHorizontal: 24,
    width: "84%",
    marginTop: width * -0.2,
    marginBottom: width * 0.13,
    shadowColor: "black",
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: {width: 0, height: 4},
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
    paddingVertical: width * 0.03,
    borderRadius: 24,
    alignItems: "center",
    shadowColor: "black",
    shadowRadius: 5,
    shadowOffset: {width: 0, height: 4},
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
    shadowOffset: {width: 0, height: 3},
    elevation: 5,
  },
});
