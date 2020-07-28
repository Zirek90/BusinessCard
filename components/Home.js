import React from "react";
import { StyleSheet, View, TouchableHighlight, Image } from "react-native";
import { Layout, Card, Text, Divider } from '@ui-kitten/components';
import photo from "../assets/images.png"

const Home = ({ navigation, _fetchData, cards }) => {

  React.useEffect(() => {
    _fetchData();
  }, [])



  return (
      <Layout style={styles.container} level="1">
      {cards 
        ? cards.map((card, index) => (
          <TouchableHighlight key={index} style={styles.card}>
            <Card>
            
              <Text category='h3' style={{textAlign: "center"}}>{card.name}</Text>
              <Divider/>
              <View style={styles.wrappers}>
                <View>
                  <Text>{card.phone}</Text>
                  <Text>{card.email}</Text>
                  <Text>{card.taxNumber}</Text>
                </View>
                <View>
                  <Image style={styles.images} source={photo} />
                </View>
              </View>
            </Card>
          </TouchableHighlight>
        ))
        : <Text>Brak wizytowek</Text>
      }
      

 
      </Layout>
  );
}

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    alignItems: "center",
    backgroundColor: "lightgrey",
    padding: 25
  },
  card: {
    width: "100%"
  },
  wrappers: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 5
  },
  textBtns: {
    fontSize: 20,
    fontWeight: "bold",
    color: "grey"
  },
  images: {
    width: 100,
    height: 60
  }
});
