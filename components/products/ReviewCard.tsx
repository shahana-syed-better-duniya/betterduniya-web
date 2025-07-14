import { useBoolean } from "@/hooks/primitive/use-boolean";
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from "react";
import { Dimensions, Image, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import ExpandImg from './ExpandImg';


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

  const {height} = Dimensions.get("window");
  const isExpandDescription = useBoolean(false)
  const MAX_DISPLAY_LINES = 3;
  const MAX_DISPLAY_CHAR = 80;

  const isDescriptionLinesTooLong = desc.split('\n').length > MAX_DISPLAY_LINES;
  const isDescriptionCharsTooLong = desc.length > MAX_DISPLAY_CHAR;

  const displayDescription =
    isExpandDescription.value ? desc : desc.split('\n').filter((_, i) => i < MAX_DISPLAY_LINES).join('\n').substring(0, MAX_DISPLAY_CHAR)

  return (


    <View style={{marginBottom: 25}}>
      <ExpandImg visible={expandImg} imgUrl={imgUrl} onClose={() => setExpandImg(false)}/>
      <View style={{
        marginBottom: 10,
        flexDirection: "row",
        alignItems: 'center',
        paddingHorizontal: 12,
        width: '100%',
      }}>

        <View style={{flexDirection: "row", gap: 8, alignItems: 'center', flex: 1, minWidth: 0}}>
          <Image
            source={{uri: userIcon}}
            style={{width: height * 0.065, height: height * 0.065, borderRadius: 30}}/>
          <View style={{justifyContent: 'flex-start'}}>
            <Text style={{fontWeight: 600, fontSize: height * 0.018,}}>{displayName}</Text>
            <Text style={{color: "#696363", fontSize: height * 0.013}}>@{username}</Text>
            <Text style={{color: "#696363", fontSize: height * 0.013}}>{time}</Text>
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
            marginLeft: 8
          }}>
            <Icon name="chevron-forward" size={22} color="#333"/>
          </TouchableOpacity>
        }

        {type === "feed" &&
          <View style={{marginLeft: 8}}>
            <View style={{
              paddingLeft: 8,
              paddingRight: 11,
              backgroundColor: "#F5F5F5",
              flexDirection: "row",
              borderRadius: 30,
              alignItems: "center",
              justifyContent: "center"
            }}>
              <Image
                source={recommended ? require("../../assets/images/thumbsup.png") : require("../../assets/images/thumbsdown.png")}
                style={{width: height * 0.03, height: height * 0.03}}/>
              <Text style={{
                color: "#696363",
                fontSize: height * 0.0135
              }}>{recommended ? "Recommended" : "Not Recommended"}</Text>
            </View>

            <View style={{marginTop: height * 0.003}}>
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

      <Text style={{fontWeight: 700, marginBottom: 3, fontSize: height * 0.018, marginHorizontal: 12}}>{prodName}</Text>
      <Text style={{
        marginBottom: 8,
        fontSize: height * 0.018,
        marginHorizontal: 12
      }}>
        {displayDescription}
        {(isDescriptionLinesTooLong || isDescriptionCharsTooLong) &&
          <Text onPress={isExpandDescription.onToggle} style={{fontWeight: 600, color: '#202020'}}>
            {isExpandDescription.value ? ' Show less' : '... Read more'}
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
