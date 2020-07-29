import React from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import { AsyncStorage } from "react-native";

 const DetailsCard = ({route, navigation}) => {
    const {card} = route.params;

    return (
      <View>
        {console.log(route)}
      </View>
    );
}

export default DetailsCard;