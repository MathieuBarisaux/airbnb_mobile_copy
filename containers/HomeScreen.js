import { useNavigation } from "@react-navigation/core";
import {
  Button,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  Image,
} from "react-native";
import { useState, useEffect } from "react";

// ** Styles **
import styles from "../styles/styles";
import homeStyles from "../styles/homeStyles";

// ** Components **
import Rating from "../components/Rating";

// ** Dependancies **
import axios from "axios";
import { Entypo } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

export default function HomeScreen() {
  const navigation = useNavigation();

  const [isLoad, setIsLoad] = useState(false);
  const [allOffer, setAllOffer] = useState([]);

  useEffect(() => {
    const callServer = async () => {
      const response = await axios.get(
        "https://express-airbnb-api.herokuapp.com/rooms"
      );

      setAllOffer(response.data);
      setIsLoad(true);
    };
    callServer();
  }, []);

  return (
    <View>
      {isLoad ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={allOffer}
          contentContainerStyle={{
            justifyContent: "center",
            alignItems: "center",
          }}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                style={homeStyles.offerCard}
                onPress={() => {
                  navigation.navigate("SelectOffer", {
                    itemId: item._id,
                  });
                }}
              >
                <View style={{ width: "100%", position: "relative" }}>
                  <Image
                    source={{ uri: item.photos[0].url }}
                    style={homeStyles.offerCard__picture}
                    resizeMode={"cover"}
                  />
                  <Text style={homeStyles.offerCard__price}>
                    {item.price} €
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "flex-end",
                  }}
                >
                  <View style={{ paddingVertical: 15 }}>
                    <Text style={{ paddingBottom: 15, fontSize: 15 }}>
                      {item.title}
                    </Text>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "flex-end",
                      }}
                    >
                      <Rating data={item} />
                      <Text style={{ color: "#BFBFBE", marginLeft: 10 }}>
                        {item.reviews} reviews
                      </Text>
                    </View>
                  </View>

                  <Image
                    source={{ uri: item.user.account.photo.url }}
                    style={{
                      width: 70,
                      height: 70,
                      borderRadius: 100,
                    }}
                  />
                </View>
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item) => item._id}
        />
      ) : (
        <ActivityIndicator
          style={styles.activityLoad}
          size={"large"}
          color={"#FFBAC0"}
        />
      )}
    </View>
  );
}
