import { View } from "react-native";

import { Entypo } from "@expo/vector-icons";

const Rating = (props) => {
  const { ratingValue } = props.data;

  let totalStar = [];
  for (let i = 0; i < 5; i++) {
    if (i < ratingValue) {
      totalStar.push(<Entypo name="star" size={20} color="#FFB120" key={i} />);
    } else {
      totalStar.push(<Entypo name="star" size={20} color="grey" key={i} />);
    }
  }

  return <View style={{ flexDirection: "row" }}>{totalStar}</View>;
};

export default Rating;
