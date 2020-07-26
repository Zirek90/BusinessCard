import React from "./node_modules/react";
import { StyleSheet, View, Text, TouchableHighlight } from "react-native";


const Home = () => {

  return (
    <View style={styles.container}>
      <TouchableHighlight
        style={styles.buttons}
        underlayColor={"black"}
      //   onPress={() => navigate("AddCard")}
      >
        <Text style={styles.textBtns}>Dodaj wizytowke</Text>
      </TouchableHighlight>
      <TouchableHighlight
        style={styles.buttons}
        underlayColor={"black"}
      //   onPress={() => navigate("DisplayCard")}
      >
        <Text style={styles.textBtns}>Zobacz wszystkie wizytowki</Text>
      </TouchableHighlight>
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
