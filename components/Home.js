import React from "react";
import { StyleSheet, View, Text, TouchableHighlight } from "react-native";

const Home = ({ navigation, _fetchData, cards }) => {

  React.useEffect(() => {
    _fetchData();
  }, [])


  return (
      <View style={styles.container}>
      {console.log(Card)}
        <TouchableHighlight
          style={styles.buttons}
          underlayColor={"black"}
          onPress={() => navigation.navigate("Dodaj wizytówke")}
        >
          <Text style={styles.textBtns}>Dodaj wizytowke</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.buttons}
          underlayColor={"black"}
          onPress={() => navigation.navigate("Strona główna")}
        >
          <Text style={styles.textBtns}>Zobacz wszystkie wizytowki</Text>
        </TouchableHighlight>

               {/* { cards 
        ? cards.map((card, index) => (
        <Card key={index}>
          <Card.Content>
            <Title>{card.name}</Title>
            <Paragraph>{card.phone}</Paragraph>
            <Paragraph>{card.email}</Paragraph>
            <Paragraph>{card.taxNumber}</Paragraph>
          </Card.Content>
        </Card>
      ))
        : <Text>Brak wizytówek</Text>} */}

 
      </View>
  );
}

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "grey"
  },
  buttons: {
    width: 300,
    height: 50,
    margin: 20,
    backgroundColor: "white",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  textBtns: {
    fontSize: 20,
    fontWeight: "bold",
    color: "grey"
  }
});
