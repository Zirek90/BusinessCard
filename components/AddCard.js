import React from 'react';
import {StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import {
  Layout,
  Card,
  Text,
  Input,
  ButtonGroup,
  Button,
} from '@ui-kitten/components';
import photo from '../assets/images.png';

const AddCard = ({navigation, singleCard, setSingleCard, _addCard, _addImageToCard, error}) => {
  return (
    <Layout style={styles.container} level="3">
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
          onChangeText={(taxNumber) =>
            setSingleCard({...singleCard, taxNumber})
          }
        />
        <View>
          <Text style={{color: 'red'}}>{error}</Text>
        </View>

        <View style={styles.buttonGroup}>
          <TouchableOpacity style={styles.btn} onPress={() => _addImageToCard("takePicture")}>
            <Text style={styles.btnText}>Zrób zdjęcie wizytówki</Text>
          </TouchableOpacity>

          {/* <TouchableOpacity style={styles.btn} onPress={() => _addImageToCard("pickPicture")}>
            <Text style={styles.btnText}>Wybierz wizytówke z galeri</Text>
          </TouchableOpacity> */}
        </View>

        <View style={styles.imageWrapper}>
          {singleCard.photo
            ? <Image style={styles.images} source={{uri: singleCard.photo}} />
            : <Text category="h4" style={{textAlign: "center"}}>Wybierz zdjecie wizytówki</Text>
          }  
     
        </View>

        <Button
          onPress={() =>
            this._addCard()
              .then(() => !error.length && navigation.navigate('Strona główna'))
              .catch((e) => console.log("Couldn't add card"))
          }
        >
        Dodaj wizytowke
      </Button>
      </Card>

      
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'lightgrey',
    padding: 10,
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
    margin: 15,
    alignItems: 'center',
  },
  images: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    margin: 'auto',
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  btn: {
    width: '47%',
    borderWidth: 1,
    borderColor: 'lightgreen',
    backgroundColor: 'rgba(147, 230, 150, 0.2)',
    borderStyle: 'solid',
    borderRadius: 10,
    margin: 5,
    padding: 2,
  },
  btnText: {
    color: 'black',
    fontSize: 16,
    textAlign: 'center',
  }
});

export default AddCard;
