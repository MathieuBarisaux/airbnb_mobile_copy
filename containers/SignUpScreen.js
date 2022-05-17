import { useNavigation } from "@react-navigation/core";
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  TouchableHighlight,
  Image,
  ActivityIndicator,
  Button,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useState } from "react";

// ** Dependancies **
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

// ** Image **
import logo from "../assets/airbnb_logo_icon_170605.png";

// ** Styles **
import styles from "../styles/styles";

export default function SignInScreen({ setToken }) {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  const [secondPassword, setSecondPassword] = useState("");

  const [requestLoading, setRequestLoading] = useState(null);

  const [errorRequest, setErrorRequest] = useState("");

  const requestServer = async () => {
    try {
      if (email && password) {
        setErrorRequest("");
        setRequestLoading(true);

        const data = {
          email: email,
          password: password,
        };

        const response = await axios.post(
          "https://express-airbnb-api.herokuapp.com/user/log_in",
          data
        );

        if (response.status === 200) {
          setRequestLoading(null);
          setToken(response.data.token);
        } else {
          setErrorRequest("Email or password is not correct");
        }
      } else {
        setErrorRequest("We need more element to connect you.");
      }
    } catch (error) {
      console.log(error.response);
      setRequestLoading(null);
      setErrorRequest("Email or password is not correct");
    }
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={{ flex: 1 }}>
      <SafeAreaView
        style={{
          flex: 1,
        }}
      >
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "space-around",
            padding: 10,
          }}
        >
          <View
            style={{ alignItems: "center", justifyContent: "space-around" }}
          >
            <Image source={logo} style={styles.logo} resizeMode={"contain"} />
            <Text style={styles.logo__title}>Sign up</Text>
          </View>

          <View style={{ width: "90%" }}>
            <TextInput
              placeholder="Email"
              style={styles.inputText}
              onChangeText={(text) => setEmail(text)}
            />

            <TextInput
              placeholder="Username"
              style={[styles.inputText, styles.inputText__margin]}
              onChangeText={(text) => setUsername(text)}
            />

            <TextInput
              placeholder="Describe yourself in a fews words..."
              multiline={true}
              numberOfLines={4}
              style={[styles.inputText__area]}
              onChangeText={(text) => setDescription(text)}
            />

            <TextInput
              placeholder="Password"
              secureTextEntry={true}
              style={[styles.inputText, styles.inputText__margin]}
              onChangeText={(text) => setPassword(text)}
            />

            <TextInput
              placeholder="Confirm password"
              secureTextEntry={true}
              style={[styles.inputText, styles.inputText__margin]}
              onChangeText={(text) => setSecondPassword(text)}
            />
          </View>

          <View style={{ alignItems: "center" }}>
            {requestLoading ? (
              <ActivityIndicator size={"large"} />
            ) : (
              <TouchableHighlight
                title="Sign in"
                style={styles.button}
                onPress={requestServer}
              >
                <Text style={styles.textButton}>Sign up</Text>
              </TouchableHighlight>
            )}

            <Text style={styles.errorMessage}>
              {errorRequest && errorRequest}
            </Text>

            <TouchableOpacity
              onPress={() => {
                navigation.navigate("SignIn");
              }}
            >
              <Text style={styles.textLink}>
                Already have an account ? Sign in
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
}
