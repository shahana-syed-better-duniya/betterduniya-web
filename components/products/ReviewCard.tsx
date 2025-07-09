import {Image, Text, TouchableOpacity, useWindowDimensions, View} from 'react-native'
import React, {useEffect, useState} from "react";
import Icon from "react-native-vector-icons/Ionicons";
import {useBoolean} from "@/hooks/primitive/use-boolean";
import {LinearGradient} from 'expo-linear-gradient';
import ExpandImg from './ExpandImg'
import styles from './product-review-list-styles';


const ReviewCard = ({prodName, desc, imgUrl, username, displayName, userIcon, time, recommended, rating, type}: {
  prodName: string,
  desc: string,
  imgUrl: string,
  username: string,
  displayName: string,
  userIcon: string,
  time?: string,
  recommended?: boolean,
  rating?: number,
  type: string,
}) => {
  const [imgHeight, setImgHeight] = useState(200);
  const [isPortrait, setIsPortrait] = useState(false);
  const windowWidth = useWindowDimensions().width;

  const [expandImg, setExpandImg] = React.useState(false);

  useEffect(() => {
    if (imgUrl) {
      Image.getSize(
        imgUrl,
        (width, height) => {
          const ratio = height / width;
          setImgHeight(windowWidth * ratio);
          setIsPortrait(height > width);
        },
        (error) => {
          console.log("Image.getSize error:", error);
        }
      );
    }
  }, [imgUrl]);

  const isExpandDescription = useBoolean(false)
  const MAX_DISPLAY_LINES = 3;
  const MAX_DISPLAY_CHAR = 80;

  const isDescriptionLinesTooLong = desc.split('\n').length > MAX_DISPLAY_LINES;
  const isDescriptionCharsTooLong = desc.length > MAX_DISPLAY_CHAR;

  const displayDescription =
    isExpandDescription.value ? desc : desc.split('\n').filter((_, i) => i < MAX_DISPLAY_LINES).join('\n').substring(0, MAX_DISPLAY_CHAR)

  return (
  


    <View style={{marginBottom: 25}}>
      <ExpandImg visible={expandImg} imgUrl={imgUrl} onClose={()=>setExpandImg(false)}/>
      <View style={{
        marginBottom: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: 'center',
        marginHorizontal: 12
      }}>

        <View style={{flexDirection: "row", gap: 8, alignItems: 'center'}}>
          <Image
            source={{uri: userIcon}}
            style={{width: 60, height: 60, borderRadius: 30}}/>
          <View style={{justifyContent: 'flex-start'}}>
            <Text style={{fontWeight: 600, fontSize: 17,}}>{displayName}</Text>
            <Text style={{color: "#696363", fontSize: 13}}>{username}</Text>
            <Text style={{color: "#696363", fontSize: 11}}>{time}</Text>
          </View>
        </View>

        {type === "prod" &&
          <TouchableOpacity style={{
            width: 40,
            height: 40,
            borderRadius: 30,
            backgroundColor: "#F8F8FC",
            justifyContent: "center",
            alignItems: "center",
            marginRight: 8
          }}>
            <Icon name="chevron-forward" size={22} color="#333"/>
          </TouchableOpacity>
        }

        {type === "feed" &&
          <View>
            {recommended ? (
              <View style={{
                paddingLeft: 8,
                paddingRight: 11,
                backgroundColor: "#F5F5F5",
                flexDirection: "row",
                borderRadius: 30,
                alignItems: "center",
                justifyContent: "center"
              }}>
                <Image source={require("../../assets/images/thumbsup.png")} style={{width: 28, height: 28}}/>
                <Text style={{color: "#696363", fontSize: 12}}>Recommended</Text>
              </View>
            ) : (
              <View style={{
                paddingLeft: 8,
                paddingRight: 11,
                backgroundColor: "#F5F5F5",
                flexDirection: "row",
                borderRadius: 30,
                alignItems: "center",
                justifyContent: "center"
              }}>
                <Image source={require("../../assets/images/thumbsdown.png")} style={{width: 28, height: 28}}/>
                <Text style={{color: "#696363", fontSize: 12}}>Not Recommended</Text>
              </View>
            )}

            <View style={{marginTop: 3}}>
              <View style={{flexDirection: "row", marginTop: 2, justifyContent: "flex-end"}}>
                {Array(5)
                  .fill(null)
                  .map((_, i) => {
                    const safeRating = Number(rating) || 0; // ensures undefined, null, or NaN → 0
                    return (
                      <Icon
                        key={i}
                        name={i < Math.min(Math.abs(safeRating), 5) ? "star" : "star-outline"}
                        size={18}
                        color={safeRating < 0 ? "#F44336" : "#FFC107"}
                        style={{marginLeft: 1}}
                      />
                    );
                  })}
              </View>
            </View>
          </View>
        }
      </View>

      <Text style={{fontWeight: 700, marginBottom: 3, fontSize: 16, marginHorizontal: 12}}>{prodName}</Text>
      <Text style={{
        marginBottom: 8,
        fontSize: 16,
        marginHorizontal: 12
      }}>
        {displayDescription}
        {(isDescriptionLinesTooLong || isDescriptionCharsTooLong) &&
          <Text onPress={isExpandDescription.onToggle}>
            {isExpandDescription.value ? ' read less' : '... read more'}
          </Text>
        }
      </Text>

      <TouchableOpacity onPress={() => setExpandImg(true)}>
        <View
          style={{
            width: "100%",
            height: 200,
            backgroundColor: '#222328',
            overflow: 'hidden',
          }}
        >
          <LinearGradient
            colors={['#222328', '#312F2F']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            style={{flex: 1}}
          >
            <Image
              source={{uri: imgUrl}}
              style={{
                width: "100%",
                height: "100%",
                resizeMode: isPortrait ? "contain" : "cover",
              }}
            /></LinearGradient>
        </View>
      </TouchableOpacity>

      {expandImg && (
        <TouchableOpacity
          // style={[styles.overlay, { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }]}
          onPress={() => setExpandImg(false)}
        />
      )}

    </View>
  )
}

export default ReviewCard
