import {Dimensions, Image, Text, TouchableOpacity, View} from 'react-native'
import React from 'react'
import Icon from "react-native-vector-icons/Ionicons";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;



const ReviewCard = ({prodName, desc, imgUrl, username, displayName, userIcon, time, recommended, rating, type}:{
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
  return (
    <View style={{marginBottom: 25}}>
        <View style={{marginBottom: 10, flexDirection: "row", justifyContent: "space-between", alignItems: 'center',}}>

            <View style={{flexDirection: "row", gap: 8, alignItems: 'center'}}>
                <Image
                source={{ uri: userIcon }}
                style={{ width: 60, height: 60, borderRadius: 30 }}/>

                <View >
                    <Text style={{fontWeight: 600, fontSize: 17, marginTop: -4}}>{displayName}</Text>
                    <Text style={{color: "#696363", fontSize: 13}}>{username}</Text>
                    <Text style={{color: "#696363", fontSize: 11}}>{time}</Text>
                </View>
            </View>

            {type === "prod" &&
                <TouchableOpacity style={{width: 40, height: 40, borderRadius: 30, backgroundColor: "#F8F8FC", justifyContent: "center", alignItems: "center", marginRight: 8}}>
                  <Icon name="chevron-forward" size={22} color="#333" />
                </TouchableOpacity>
            }

            {type === "feed" &&
                <View>
                    {recommended ? (
                    <View style={{paddingLeft: 8, paddingRight: 11, backgroundColor: "#F5F5F5", flexDirection: "row", borderRadius: 30, alignItems: "center", justifyContent: "center"}}>
                        <Image source={require("../../assets/images/thumbsup.png")} style={{width: 28, height: 28}}/>
                        <Text style={{color: "#696363", fontSize: 12}}>Recommended</Text>
                    </View>
                    ) : (
                    <View style={{paddingLeft: 8, paddingRight: 11, backgroundColor: "#F5F5F5", flexDirection: "row", borderRadius: 30, alignItems: "center", justifyContent: "center"}}>
                        <Image source={require("../../assets/images/thumbsdown.png")} style={{width: 28, height: 28}}/>
                        <Text style={{color: "#696363", fontSize: 12}}>Not Recommended</Text>
                    </View>
                    )}

                    <View style={{marginTop: 3}}>
                        <View style={{flexDirection: "row", marginTop: 2, justifyContent: "flex-end"}}>
                            {Array(5)
                            .fill(null)
                            .map((_, i) => (
                                <Icon
                                key={i}
                                name={i < (rating ?? 0) ? "star" : "star-outline"}
                                size={18}
                                color="#FFC107"
                                style={{marginLeft: 1}}
                                />
                            ))}
                        </View>
                    </View>
                </View>
            }
        </View>

        <Text style={{fontWeight: 700, marginBottom: 3, fontSize: 16}}>{prodName}</Text>
        <Text style={{marginBottom: 8, fontSize: 16}}>{desc}</Text>
        <Image
        source={{ uri: imgUrl }}
        style={{ width: "auto", height: windowWidth * 0.43, borderRadius: 10, resizeMode: "cover" }}/>



    </View>
  )
}

export default ReviewCard
