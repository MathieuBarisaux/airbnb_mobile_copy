import { View } from "react-native";

// ** Dependancies **
import MapView from "react-native-maps";
import * as Location from "expo-location";
import axios from "axios";

// ** Hooks **
import { useEffect, useState } from "react";

const AroundMe = () => {
  const [isLoadingLocation, setIsLoadingLocation] = useState(true);
  const [error, setError] = useState();
  const [coords, setCoords] = useState();

  const [allRooms, setAllRooms] = useState("");
  const [isLoadingServer, setIsLoadingServer] = useState(true);

  useEffect(() => {
    const askPermission = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status === "granted") {
        let location = await Location.getCurrentPositionAsync({});

        const userLocation = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        };
        setCoords(userLocation);
      } else {
        setError(true);
      }

      setIsLoadingLocation(false);
    };
    askPermission();
  }, []);

  useEffect(() => {
    const callServer = async () => {
      if (coords) {
        const response = await axios.get(
          `https://express-airbnb-api.herokuapp.com/rooms/around?latitude=${coords.latitude}&longitude=${coords.longitude}`
        );

        setAllRooms(response.data);
      }

      setIsLoadingServer(false);
    };
    callServer();
  }, [coords]);

  return (
    <View style={{ flex: 1 }}>
      {isLoadingLocation ? (
        <MapView style={{ flex: 1 }}></MapView>
      ) : error ? (
        <MapView style={{ flex: 1 }}></MapView>
      ) : (
        <MapView
          style={{ flex: 1 }}
          initialRegion={{
            latitude: coords.latitude,
            longitude: coords.longitude,
            longitudeDelta: 0.1,
            latitudeDelta: 0.1,
          }}
        >
          {allRooms &&
            allRooms.map((room) => {
              return (
                <MapView.Marker
                  key={room._id}
                  coordinate={{
                    latitude: room.location[1],
                    longitude: room.location[0],
                  }}
                  title={room.title}
                />
              );
            })}
        </MapView>
      )}
    </View>
  );
};

export default AroundMe;
