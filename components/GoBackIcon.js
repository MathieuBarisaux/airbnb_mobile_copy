import { Ionicons } from "@expo/vector-icons";

import { useNavigation } from "@react-navigation/native";
import { View } from "react-native";

const GoBackIcon = () => {
  const navigation = useNavigation();

  return (
    <View>
      <Ionicons
        name="arrow-back"
        size={24}
        color="#707170"
        onPress={navigation.goBack}
      />
    </View>
  );
};

export default GoBackIcon;
