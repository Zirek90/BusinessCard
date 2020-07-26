import React from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import { AsyncStorage } from "react-native";

 const AddCard = ({singleCard, setSingleCard, error}) => {


    return (
      <View style={styles.container}>
        <View style={styles.inputsContainer}>
          <Text style={styles.inputsText}>Imie/Nazwa firmy:</Text>
          <TextInput
            style={styles.inputs}
            onChangeText={name => setSingleCard({...singleCard, name })}
          />
        </View>
        <View style={styles.inputsContainer}>
          <Text style={styles.inputsText}>Ulica:</Text>
          <TextInput
            style={styles.inputs}
            onChangeText={street => setSingleCard({...singleCard, street })}
          />
        </View>
        <View style={styles.inputsContainer}>
          <Text style={styles.inputsText}>Kod pocztowy:</Text>
          <TextInput
            style={styles.inputs}
            onChangeText={postalCode => setSingleCard({...singleCard, postalCode })}
          />
        </View>
        <View style={styles.inputsContainer}>
          <Text style={styles.inputsText}>Miasto:</Text>
          <TextInput
            style={styles.inputs}
            onChangeText={city => setSingleCard({...singleCard, city })}
          />
        </View>
        <View style={styles.inputsContainer}>
          <Text style={styles.inputsText}>Telefon:</Text>
          <TextInput
            style={styles.inputs}
            onChangeText={phone => setSingleCard({...singleCard, phone })}
          />
        </View>
        <View style={styles.inputsContainer}>
          <Text style={styles.inputsText}>Email:</Text>
          <TextInput
            style={styles.inputs}
            onChangeText={email => setSingleCard({...singleCard, email })}
          />
        </View>
        <View style={styles.inputsContainer}>
          <Text style={styles.inputsText}>Nip:</Text>
          <TextInput
            style={styles.inputs}
            onChangeText={nip => setSingleCard({...singleCard, nip })}
          />
        </View>
        <View>
          <Text style={{ color: "red" }}>{error}</Text>
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