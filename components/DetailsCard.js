import React from "react";
import { StyleSheet, View, TextInput, Button, Image } from "react-native";
import {Layout, Card, Text, Divider} from '@ui-kitten/components';

import { AsyncStorage } from "react-native";

 const DetailsCard = ({route, navigation}) => {
    const {details} = route.params;

    const Header = (props) => (
      <View {...props}>
        <Text category='h6'>{details.name}</Text>
      </View>
    );

    return (
      <Layout level="3">
        {console.log(details)}
        <Card header={Header}>
          <Text>{details.street}</Text>
          <Text>{details.postalCode}</Text>
          <Text>{details.city}</Text>
          <Text>{details.email}</Text>
          <Text>{details.phone}</Text>
          <Text>{details.taxNumber}</Text>
          <Image source={{uri: details.photo}} />
        </Card>
      </Layout>
    );
}

export default DetailsCard;