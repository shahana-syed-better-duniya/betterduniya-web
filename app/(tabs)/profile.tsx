import React from "react";
import {Image, StyleSheet, Text, TouchableOpacity, View,} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons";
import {useUserContext} from "@/utils/user/user-context";
import SearchBar from "@/components/layouts/SearchBar";

export default function Profile() {
  const {username, firstName, lastName} = useUserContext();
  return (
    <View style={styles.container}>
      <View style={styles.searchRow}>
        <SearchBar searchValue={username} placeholder={username} onSearch={async () => {
        }}/>
      </View>

      {/* Profile Header */}
      <View style={styles.headerRow}>
        <Image
          source={{
            uri: "https://randomuser.me/api/portraits/men/32.jpg",
          }}
          style={styles.avatar}
        />
        <View style={{flex: 1, marginLeft: 12}}>
          <Text style={styles.displayName}>{firstName} {lastName}</Text>
          <Text style={styles.username}>@{username}</Text>
          <View style={{flexDirection: "row", marginTop: 2}}>
            <Text style={styles.mutedText}>100 Interests</Text>
            <Text style={styles.mutedText}> 50 Followers</Text>
          </View>
        </View>
        <TouchableOpacity>
          <Icon name="create-outline" size={22} color="#222"/>
        </TouchableOpacity>
      </View>

      {/* Bio */}
      <Text style={styles.bioTitle}>Bio</Text>
      <View style={styles.bioBox}>
        <Text style={styles.bioText}>
          I love to help people to take informed decisions through my reviews and experiences!
        </Text>
      </View>
      <Text style={styles.charCount}>1500 Characters</Text>

      {/* Quick Actions */}
      <View style={styles.quickActionsRow}>
        <View style={styles.quickAction}>
          <Icon name="arrow-up-outline" size={42} color="#222"/>
          <Text style={styles.quickLabel}>betterdunya</Text>
        </View>
        <View style={styles.quickAction}>
          <Icon name="bulb-outline" size={42} color="#222"/>
          <Text style={styles.quickLabel}>Interests</Text>
        </View>
        <View style={styles.quickAction}>
          <Icon name="heart-outline" size={42} color="#222"/>
          <Text style={styles.quickLabel}>Followers</Text>
        </View>
      </View>

      {/* Floating Buttons */}
      <View style={styles.fabStack}>
        <View style={styles.fabWithBadge}>
          <TouchableOpacity style={styles.fab}>
            <Icon name="mail-outline" size={24} color="#222"/>
          </TouchableOpacity>
          <View style={styles.badge}><Text style={styles.badgeText}>2</Text></View>
        </View>
        <View style={styles.fabWithBadge}>
          <TouchableOpacity style={styles.fab}>
            <MaterialIcon name="flash-outline" size={24} color="#222"/>
          </TouchableOpacity>
          <View style={styles.badge}><Text style={styles.badgeText}>3</Text></View>
        </View>
        <TouchableOpacity style={styles.fab}>
          <Icon name="settings-outline" size={24} color="#222"/>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: "#fff", paddingTop: 20, paddingHorizontal: 14,},
  searchRow: {flexDirection: "row", alignItems: "center", marginBottom: 16,},
  searchBar: {
    flex: 1,
    backgroundColor: "#fafafa",
    borderRadius: 18,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    height: 40,
    elevation: 2,
    shadowColor: "#000", shadowOpacity: 0.04, shadowRadius: 2,
  },
  searchInput: {flex: 1, fontSize: 16, color: "#444"},
  goButton: {
    backgroundColor: "#FFC107",
    height: 38,
    paddingHorizontal: 16,
    marginLeft: 10,
    borderRadius: 18,
    justifyContent: "center", alignItems: "center",
    elevation: 2,
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
  quickLabel: {fontSize: 13, color: "#888", marginTop: 5},
  fabStack: {
    position: "absolute", right: 18, top: 370, alignItems: "flex-end", zIndex: 10,
  },
  fabWithBadge: {marginBottom: 22},
  fab: {
    backgroundColor: "#fff", borderRadius: 22, width: 44, height: 44,
    justifyContent: "center", alignItems: "center", elevation: 3,
    shadowColor: "#000", shadowOpacity: 0.08, shadowRadius: 3,
  },
  badge: {
    position: "absolute", top: -7, right: -7,
    backgroundColor: "#bdbdbd", borderRadius: 10, minWidth: 20, height: 20,
    justifyContent: "center", alignItems: "center",
    paddingHorizontal: 4,
  },
  badgeText: {color: "#fff", fontSize: 12, fontWeight: "bold"},
  navBar: {
    flexDirection: "row", alignItems: "center", justifyContent: "space-around",
    borderTopWidth: 1, borderTopColor: "#eee",
    height: 58, backgroundColor: "#fff", position: "absolute", bottom: 0, left: 0, right: 0,
  },
  navAvatar: {width: 30, height: 30, borderRadius: 15, borderWidth: 2, borderColor: "#fff"},
});
