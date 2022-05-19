import {
  ScrollView,
  View,
  Image,
  Text,
  ActivityIndicator,
  Dimensions,
} from "react-native";

import { useState, useEffect } from "react";

// ** Dependancies **
import axios from "axios";
import { SwiperFlatList } from "react-native-swiper-flatlist";
import MapView from "react-native-maps";

// ** components **
import Rating from "../components/Rating";

// ** styles **
import styles from "../styles/styles";
import homeStyles from "../styles/homeStyles";

const SelectOfferScreen = ({ route }) => {
  const [offer, setOffer] = useState("");

  const [load, setLoad] = useState(false);

  const [limitDescription, setLimitDescription] = useState(3);

  useEffect(() => {
    const callServer = async () => {
      setLoad(false);
      const response = await axios.get(
        `https://express-airbnb-api.herokuapp.com/rooms/${route.params.itemId}`
      );

      setOffer(response.data);
      setLoad(true);
    };
    callServer();
  }, []);

  return (
    <>
      {!load ? (
        <ActivityIndicator
          style={styles.activityLoad}
          size={"large"}
          color={"#FFBAC0"}
        />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ position: "relative" }}>
            <SwiperFlatList
              data={offer.photos}
              showPagination
              style={{ height: 300, width: Dimensions.get("window").width }}
              renderItem={({ item }) => (
                <Image
                  style={{
                    height: 300,
                    width: Dimensions.get("window").width,
                  }}
                  source={{ uri: item.url }}
                />
              )}
            />

            <Text style={homeStyles.offerCard__price}>{offer.price} €</Text>
          </View>

          <View style={{ alignItems: "center" }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "flex-end",
                width: "90%",
              }}
            >
              <View style={{ paddingVertical: 15 }}>
                <Text style={{ paddingBottom: 15, fontSize: 15 }}>
                  {offer.title}
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "flex-end",
                  }}
                >
                  <Rating data={offer} />
                  <Text style={{ color: "#BFBFBE", marginLeft: 10 }}>
                    {offer.reviews} reviews
                  </Text>
                </View>
              </View>

              <Image
                source={{ uri: offer.user.account.photo.url }}
                style={{
                  width: 70,
                  height: 70,
                  borderRadius: 100,
                }}
              />
            </View>

            <Text
              numberOfLines={limitDescription}
              style={{ width: "90%", marginTop: 10 }}
            >
              {offer.description}
            </Text>

            <View style={{ width: "90%", marginTop: 10 }}>
              {limitDescription === 3 ? (
                <Text
                  style={{ color: "#707170" }}
                  onPress={() => {
                    setLimitDescription(15);
                  }}
                >
                  Show more ▼
                </Text>
              ) : (
                <Text
                  style={{ color: "#707170" }}
                  onPress={() => {
                    setLimitDescription(3);
                  }}
                >
                  Show less ▲
                </Text>
              )}
            </View>
          </View>

          <MapView
            style={{ width: "100%", height: 260, marginTop: 10 }}
            initialRegion={{
              latitude: offer.location[1],
              longitude: offer.location[0],
              latitudeDelta: 0.1,
              longitudeDelta: 0.1,
            }}
          >
            <MapView.Marker
              coordinate={{
                latitude: offer.location[1],
                longitude: offer.location[0],
              }}
            />
          </MapView>
        </ScrollView>
      )}
    </>
  );
};

export default SelectOfferScreen;
