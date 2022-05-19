import React, { useState, useEffect } from "react";
import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// ** Screens **
import HomeScreen from "./containers/HomeScreen";
import ProfileScreen from "./containers/ProfileScreen";
import SignInScreen from "./containers/SignInScreen";
import SignUpScreen from "./containers/SignUpScreen";
import SettingsScreen from "./containers/SettingsScreen";
import SplashScreen from "./containers/SplashScreen";
import SelectOfferScreen from "./containers/SelectOfferScreen";
import AroundMe from "./containers/AroundMe";

import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";

import { SafeAreaProvider } from "react-native-safe-area-context";

// ** Components **
import Logo from "./components/Logo";
import GoBackIcon from "./components/GoBackIcon";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);

  const setToken = async (token) => {
    if (token) {
      await AsyncStorage.setItem("userToken", token);
    } else {
      await AsyncStorage.removeItem("userToken");
    }

    setUserToken(token);
  };

  useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      // We should also handle error for production apps
      const userToken = await AsyncStorage.getItem("userToken");

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      setUserToken(userToken);

      setIsLoading(false);
    };

    bootstrapAsync();
  }, []);

  if (isLoading === true) {
    // We haven't finished checking for the token yet
    return null;
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {userToken === null ? (
            // No token found, user isn't signed in
            <>
              <Stack.Screen name="SignIn">
                {() => <SignInScreen setToken={setToken} />}
              </Stack.Screen>
              <Stack.Screen name="SignUp">
                {() => <SignUpScreen setToken={setToken} />}
              </Stack.Screen>
            </>
          ) : (
            // User is signed in ! 🎉
            <Stack.Screen name="Tab" options={{ headerShown: false }}>
              {() => (
                <Tab.Navigator
                  screenOptions={{
                    headerShown: false,
                    tabBarActiveTintColor: "tomato",
                    tabBarInactiveTintColor: "gray",
                  }}
                >
                  {/* TAB HOME */}
                  <Tab.Screen
                    name="TabHome"
                    options={{
                      tabBarLabel: "Home",
                      tabBarIcon: ({ color, size }) => (
                        <Ionicons name={"ios-home"} size={size} color={color} />
                      ),
                    }}
                  >
                    {() => (
                      <Stack.Navigator>
                        <Stack.Screen
                          name="Home"
                          options={{
                            title: "My App",
                            headerTitleAlign: "center",
                            headerStyle: { backgroundColor: "white" },
                            headerTitle: (props) => <Logo {...props} />,
                          }}
                        >
                          {() => <HomeScreen />}
                        </Stack.Screen>

                        <Stack.Screen
                          name="SelectOffer"
                          options={{
                            title: "Select Offer",
                            headerStyle: { backgroundColor: "white" },
                            headerTitleAlign: "center",
                            headerLeft: (props) => {
                              Platform.OS === "android" ? (
                                ""
                              ) : (
                                <GoBackIcon {...props} />
                              );
                            },
                            headerTitle: (props) => <Logo {...props} />,
                          }}
                        >
                          {(props) => <SelectOfferScreen {...props} />}
                        </Stack.Screen>
                      </Stack.Navigator>
                    )}
                  </Tab.Screen>

                  {/* TAB AROUND ME */}
                  <Tab.Screen
                    name="AroundMe"
                    options={{
                      tabBarLabel: "Around me",
                      tabBarIcon: ({ color, size }) => (
                        <SimpleLineIcons
                          name="location-pin"
                          size={size}
                          color={color}
                        />
                      ),
                    }}
                  >
                    {() => (
                      <Stack.Navigator>
                        <Stack.Screen name="Around me">
                          {(props) => <AroundMe {...props} />}
                        </Stack.Screen>
                      </Stack.Navigator>
                    )}
                  </Tab.Screen>

                  {/* TAB PROFIL */}
                  <Tab.Screen
                    name="TabSettings"
                    options={{
                      tabBarLabel: "My profil",
                      tabBarIcon: ({ color, size }) => (
                        <AntDesign name="user" size={size} color={color} />
                      ),
                    }}
                  >
                    {() => (
                      <Stack.Navigator>
                        <Stack.Screen
                          name="My profil"
                          options={{
                            title: "My profile",
                          }}
                        >
                          {() => <SettingsScreen setToken={setToken} />}
                        </Stack.Screen>
                      </Stack.Navigator>
                    )}
                  </Tab.Screen>
                </Tab.Navigator>
              )}
            </Stack.Screen>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
