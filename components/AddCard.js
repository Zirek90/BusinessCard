import React from 'react';
import {StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import {Layout, Card, Text, Input, Button} from '@ui-kitten/components';
import Ionicons from 'react-native-vector-icons/Ionicons';

const AddCard = ({ navigation, singleCard, setSingleCard, _addCard, _addImageToCard, error }) => (
  <Layout style={styles.container} level="4">
    <Card style={styles.cardWrapper}>
      <Input
        placeholder="Imie/Nazwa firmy"
        value={singleCard.name}
        onChangeText={(name) => setSingleCard({...singleCard, name})}
      />
      <Input
        placeholder="Ulica"
        value={singleCard.street}
        onChangeText={(street) => setSingleCard({...singleCard, street})}
      />
      <Input
        placeholder="Kod pocztowy"
        value={singleCard.postalCode}
        onChangeText={(postalCode) =>
          setSingleCard({...singleCard, postalCode})
        }
      />
      <Input
        placeholder="Miasto"
        value={singleCard.city}
        onChangeText={(city) => setSingleCard({...singleCard, city})}
      />
      <Input
        placeholder="Telefon"
        value={singleCard.phone}
        onChangeText={(phone) => setSingleCard({...singleCard, phone})}
      />
      <Input
        placeholder="Email"
        value={singleCard.email}
        onChangeText={(email) => setSingleCard({...singleCard, email})}
      />
      <Input
        placeholder="Nip"
        value={singleCard.taxNumber}
        onChangeText={(taxNumber) => setSingleCard({...singleCard, taxNumber})}
      />
      <View style={{flexDirection: "column"}}>
        {error.length && error.map((err, i) => <Text key={i} style={{color: 'red'}}>{err}</Text>)}
        
      </View>

      <View style={styles.imageWrapper}>
        {singleCard.photo ? (
          <TouchableOpacity 
            style={{width: "100%"}} 
            onPress={() => _addImageToCard('takePicture')}>
              <Image  style={styles.images} source={{uri: singleCard.photo}} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.btn}
            onPress={() => _addImageToCard('takePicture')}>
            <Ionicons name={'camera-outline'} size={100} color={'lightgrey'} />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.submitContainer}>
        <Button
          style={{alignSelf: 'flex-end'}}
          onPress={() =>
            _addCard()
              .then(() => !error.length && navigation.navigate('Strona główna'))
              .catch((e) => console.log("Couldn't add card"))
          }>
          Dodaj wizytowke
        </Button>
      </View>
    </Card>
  </Layout>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    paddingTop: 30,
  },
  cardWrapper: {
    width: '100%',
    height: '100%',
    margin: 5,
    alignItems: 'center',
  },
  imageWrapper: {
    height: 150,
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  images: {
    width: "100%",
    height: "100%",
    resizeMode: "contain"
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  btn: {
    width: '80%',
    borderWidth: 1,
    borderColor: 'lightgrey',
    borderStyle: 'solid',
    borderRadius: 10,
    alignItems: 'center',
    padding: 5,
  },
  btnText: {
    color: 'black',
    fontSize: 16,
    textAlign: 'center',
  },
  submitContainer: {
    alignSelf: 'center',
    flexDirection: 'row',
    flex: 1,
  },
});

export default AddCard;
