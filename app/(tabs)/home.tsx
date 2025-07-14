import AppLogo from "@/components/layouts/AppLogo";
import SearchBar from "@/components/layouts/SearchBar";
import BackPromptModal from '@/components/products/BackPromptModal';
import ProductReviewList from "@/components/products/ProductReviewList";
import { AppConfigs } from "@/constants/app-configs";
import { useBoolean } from "@/hooks/primitive/use-boolean";
import useSearchProductReview from "@/hooks/product/use-search-product-review";
import { styles as authStyles } from "@/utils/auth/styles";
import { useProductReviewContext } from "@/utils/products/product-review-context";
import React from "react";
import {
    ActivityIndicator,
    Animated,
    BackHandler,
    Dimensions,
    FlatList,
    NativeScrollEvent,
    NativeSyntheticEvent,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import feedStyles from "../../components/products/product-review-list-styles";

const {width, height} = Dimensions.get("window");

const FILTERS = ["All"];
const HEADER_MAX_HEIGHT = 125;
const HEADER_MIN_HEIGHT = 60;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

export default function Home() {
  const [showPrompt, setShowPrompt] = React.useState(false);
  const headerTranslateY = React.useRef(new Animated.Value(0)).current;
  const lastScrollY = React.useRef(0);
  const isHeaderHidden = React.useRef(false);
  const [headerHeight, setHeaderHeight] = React.useState(HEADER_MAX_HEIGHT);
  const [selected, setSelected] = React.useState("All");

  const isSearched = useBoolean(false);
  const isSearchValueChanged = useBoolean(false);

  React.useEffect(() => {
    const backAction = () => {
      if (!isSearched.value) {
        setShowPrompt(true); // show the modal
      } else {
        // If searched, clear search instead of exiting
        isSearched.onFalse();
        isSearchValueChanged.onFalse();
        searchValue.onChangeValue("");
      }
      return true; // prevent default back action
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }, [isSearched.value]);

  const handleConfirm = () => {
    setShowPrompt(false);
    if (!isSearched.value) {
      BackHandler.exitApp();
    }
  };

  const handleCancel = () => {
    setShowPrompt(false);
  };

  const {
    onSearch,
    isLoading,
    searchValue,
  } = useSearchProductReview();

  const handleSearch = async () => {
    isSearched.onTrue();
    await onSearch();
  }

  const handleChangeSearchText = (val: string) => {
    isSearchValueChanged.onTrue();
    searchValue.onChangeValue(val);
  }

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const currentY = event.nativeEvent.contentOffset.y;
    const diff = currentY - lastScrollY.current;
    if (Math.abs(diff) > 5) {
      if (diff > 0 && !isHeaderHidden.current && currentY > 0) {
        Animated.timing(headerTranslateY, {
          toValue: -headerHeight - 8, // add buffer for full hide
          duration: 250,
          useNativeDriver: true,
        }).start();
        isHeaderHidden.current = true;
      } else if (diff < 0 && isHeaderHidden.current) {
        Animated.timing(headerTranslateY, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }).start();
        isHeaderHidden.current = false;
      }
    }
    lastScrollY.current = currentY;
  };

  const {summary, previousSearchValue} = useProductReviewContext();
  if (isSearched.value) {
    return (
      <View style={feedStyles.container}>
        <Animated.View
          onLayout={e => setHeaderHeight(e.nativeEvent.layout.height)}
          style={{
            position: 'absolute',
            top: 0,
            zIndex: 1,
            marginBottom: height * 0.02,
            backgroundColor: 'white',
            width: '100%',
            paddingBottom: 5,
            paddingTop: height * 0.02,
            transform: [{translateY: headerTranslateY}],
            overflow: 'hidden', // Prevent overflow
          }}
        >
          <SearchBar
            searchValue={searchValue.value || (isSearchValueChanged.value ? '' : previousSearchValue)}
            icon={"search-outline"}
            onChangeText={handleChangeSearchText}
            placeholder={'Search Product...'}
            onSearch={handleSearch}
          />
          <FlatList
            data={FILTERS}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item}
            contentContainerStyle={feedStyles.filterRow}
            renderItem={({item}) => (
              <TouchableOpacity
                style={[
                  feedStyles.filterPill,
                  selected === item && feedStyles.selectedPill,
                ]}
                onPress={() => setSelected(item)}
              >
                <Text
                  style={[
                    feedStyles.pillText,
                    selected === item && feedStyles.selectedPillText,
                  ]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            )}
          />
        </Animated.View>
        <FlatList
          style={{paddingTop: HEADER_MAX_HEIGHT, width: '100%'}}
          scrollEventThrottle={16}
          onScroll={handleScroll}
          data={selected !== 'All' ? [] : (summary?.reviews || [])}
          keyExtractor={(item, idx) => item?.id?.toString?.() || idx.toString()}
          renderItem={({item}) =>
            selected !== 'All' ? null : (
              <ProductReviewList
                summary={summary ?? {reviews: [], userById: {}, profileImageUriByUserId: {}, reviewImageUriById: {}}}/>
            )
          }
          ListEmptyComponent={selected !== 'All' ? null : null}
        />
        <TouchableOpacity style={feedStyles.fab}>
          <Icon name="search" size={28} color="#FFC107"/>
        </TouchableOpacity>
      </View>
    );
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
        <Text style={authStyles.appTitle}>{AppConfigs.APP_NAME}</Text>
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

const stylesLocal = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
  },
  logoWrapper: {
    alignItems: "center",
    top: height * 0.1,
  },
  logoCircle: {
    width: height * 0.18,
    height: height * 0.18,
    borderRadius: 200,
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
    fontSize: height * 0.04,
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
    borderRadius: 100,
    height: height * 0.06,
    paddingHorizontal: 24,
    width: "84%",
    marginTop: height * -0.1,
    marginBottom: height * 0.06,
    shadowColor: "black",
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: {width: 0, height: 4},
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    paddingHorizontal: 1,
    paddingVertical: 10,
    fontSize: 18,
    color: "#222",
  },
  goButton: {
    backgroundColor: "#FFC107",
    paddingHorizontal: 44,
    paddingVertical: height * 0.015,
    borderRadius: 100,
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
