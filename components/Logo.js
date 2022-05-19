import { Image } from "react-native";

import logo from "../assets/airbnb_logo_icon_170605.png";

const Logo = () => {
  return <Image source={logo} style={logoStyle} />;
};

const logoStyle = {
  width: 30,
  height: 30,
};

export default Logo;
