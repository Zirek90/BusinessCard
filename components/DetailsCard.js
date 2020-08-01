import React from "react";
import { StyleSheet, View, TextInput, Image, ScrollView, TouchableOpacity } from "react-native";
import {Layout, Card, Text, Divider, Button, Input} from '@ui-kitten/components';
import { AsyncStorage } from "react-native";
import Orientation from 'react-native-orientation';


 const DetailsCard = ({route, navigation, _editCard}) => {
  if (route.params) {
   const {details} = route.params;
   const [card, setCard] = React.useState(details)
   const [edit, setEdit] = React.useState(false)

  
    const Header = (props) => (
      <View {...props} style={styles.headerWrapper}>
        <Text category='h2' style={styles.title}>{details.name}</Text>
        <Button 
          style={{width: 100, height: 40, position: "absolute", top: 0, right: 10}}
          status="warning"
          onPress={() => setEdit(!edit)}
          >
          {edit ? "Powrót": "Edytuj"}
        </Button>
        {edit && 
          <Button 
            style={{width: 100, height: 40, position: "absolute", top: 0, right: 120}}
            status="success"
            onPress={() => {
              _editCard(card)
              setEdit(false)
              navigation.navigate("Strona główna")
              }}
            >
            Akceptuj
          </Button>
        }
      </View>
    );

    const content = (
      <Card header={Header}>
          <View style={[styles.wrapper,{paddingBottom: 30}]}>
            <Text style={styles.text}>Ulica: {details.street}</Text>
            <Text style={styles.text}>Kod pocztowy: {details.postalCode}</Text>
            <Text style={styles.text}>Miasto: {details.city}</Text>
          </View>
          <View style={styles.wrapper}>
            <Text style={styles.text}>Email: {details.email}</Text>
            <Text style={styles.text}>Telefon: {details.phone}</Text>
            <Text style={styles.text}>NIP: {details.taxNumber}</Text>
          </View>
          <Divider />
          <Image style={styles.image} source={{uri: details.photo}} />
        </Card>
    )

    const editable_content = (
      <Card header={Header}>
          <View style={styles.wrapper}>
            <Input style={styles.text} value={card.street} onChangeText={(street) => setCard({...card, street})}/>
            <Input style={styles.text} value={card.postalCode} onChangeText={(postalCode) => setCard({...card, postalCode})}/>
            <Input style={styles.text} value={card.city} onChangeText={(city) => setCard({...card, city})}/>
          </View>
          <View style={styles.wrapper}>
            <Input style={styles.text} value={card.email} onChangeText={(email) => setCard({...card, email})}/>
            <Input style={styles.text} value={card.phone} onChangeText={(phone) => setCard({...card, phone})}/>
            <Input style={styles.text} value={card.taxNumber} onChangeText={(taxNumber) => setCard({...card, taxNumber})}/>
          </View>
          <Divider />
          <Image style={styles.image} source={{uri: details.photo}} />
        </Card>
    )

    return (
      <Layout level="3" style={styles.container}>
        <ScrollView>
          {edit
           ? editable_content
           : content
          }
        </ScrollView>
      </Layout>
    );
    }
    else {
      return (
        <Layout level="3" style={{flex: 1, margin: 15}}>
          <Card style={{flex: 1, justifyContent: "center"}}>
            <Text category="h3" style={{textAlign: "center"}}>
              Prosze wybierz wizytówkę z ekranu głównego aby zobaczyć szczegóły
            </Text>
          </Card>
        </Layout>
      )
    }
}

export default DetailsCard;

const styles = StyleSheet.create({
  container: {
    padding: 10
  },
  headerWrapper: {
    flexDirection: "row", 
    justifyContent: "center", 
    position: "relative"
  },
  title: {
    textAlign: "center"
  },
  wrapper: {
    flexDirection: "row",
    padding: 10
    // justifyContent: "space-between"
  },
  text: {
    fontSize: 20,
    width: "33%"
  },
  image: {
    margin: 5,
    width: "100%", 
    height: 500,
    resizeMode: "contain"
  }
});
