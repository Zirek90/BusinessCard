import React, { Component } from "./node_modules/react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import { AsyncStorage } from "react-native";

 const AddCard = () => {


//   _addData = async () => {
//     const { error, ...data } = this.state;

//     try {
//       await AsyncStorage.setItem(this.state.name, JSON.stringify(data))
//         .then(alert("Twoja wizytowka zostala zapisana"));
//     } catch (error) {
//       this.setState({ error });
//     }
//   };

    return (
      <View style={styles.container}>
        <View style={styles.inputsContainer}>
          <Text style={styles.inputsText}>Imie/Nazwa firmy:</Text>
          <TextInput
            style={styles.inputs}
            // onChangeText={name => this.setState({ name })}
          />
        </View>
        <View style={styles.inputsContainer}>
          <Text style={styles.inputsText}>Ulica:</Text>
          <TextInput
            style={styles.inputs}
            // onChangeText={street => this.setState({ street })}
          />
        </View>
        <View style={styles.inputsContainer}>
          <Text style={styles.inputsText}>Kod pocztowy:</Text>
          <TextInput
            style={styles.inputs}
            // onChangeText={postalCode => this.setState({ postalCode })}
          />
        </View>
        <View style={styles.inputsContainer}>
          <Text style={styles.inputsText}>Miasto:</Text>
          <TextInput
            style={styles.inputs}
            // onChangeText={city => this.setState({ city })}
          />
        </View>
        <View style={styles.inputsContainer}>
          <Text style={styles.inputsText}>Telefon:</Text>
          <TextInput
            style={styles.inputs}
            // onChangeText={phone => this.setState({ phone })}
          />
        </View>
        <View style={styles.inputsContainer}>
          <Text style={styles.inputsText}>Email:</Text>
          <TextInput
            style={styles.inputs}
            // onChangeText={email => this.setState({ email })}
          />
        </View>
        <View style={styles.inputsContainer}>
          <Text style={styles.inputsText}>Nip:</Text>
          <TextInput
            style={styles.inputs}
            // onChangeText={nip => this.setState({ nip })}
          />
        </View>
        <View>
          {/* <Text style={{ color: "red" }}>{this.state.error}</Text> */}
        </View>
        <View>
          {/* <Button onPress={this._addData} title="Dodaj wizytowke" /> */}
        </View>
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  inputsContainer: {
    flex: 1,
    flexDirection: "row",
    margin: 5,
    justifyContent: "center",
    alignItems: "center"
  },
  inputsText: {
    flex: 1,
    fontSize: 16,
    color: "black"
  },
  inputs: {
    flex: 3,
    borderColor: "grey",
    borderWidth: 1
  }
});

export default AddCard;