import React from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {
  Layout,
  Card,
  Text,
  Input,
  ButtonGroup,
  Button,
} from '@ui-kitten/components';
import photo from '../assets/images.png';


const AddCard = ({navigation, singleCard, setSingleCard, _addCard, error}) => {
  return (
    <Layout style={styles.container}>
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

        <View style={styles.imageWrapper}>
          {/* <Text category="h4">Wybierz zdjecie wizytówki</Text> */}
          <Image style={styles.images} source={photo} />
        </View>

        <View style={styles.buttonGroup}>
          <Button style={styles.btn} status="success">
            <Text
              style={{
                alignItems: 'center',
                margin: 'auto',
                justifyContent: 'center',
                textAlign: 'center',
                flex: 1,
              }}>
              Zrób zdjęcie wizytówki
            </Text>
          </Button>
          <Button style={styles.btn} status="success">
            Wybierz wizytówke z galeri
          </Button>
        </View>
      </Card>
      <Button
            style={styles.btnAdd}
            onPress={() =>
              this._addCard()
                .then(() => navigation.navigate('Strona główna'))
                .catch((e) => console.log("Couldn't add card"))
            }>
            Dodaj wizytowke
          </Button>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: "center",
    backgroundColor: 'lightgrey',
    padding: 10,
  },
  cardWrapper: {
    width: '100%',
    height: '100%',
    margin: 5,
    alignItems: "center"
  },
  imageWrapper: {
    height: 150,
    width: "90%",
    flexDirection: "row",
    marginBottom: 15,
    alignItems: "center"
  },
  images: {
    width: "100%",
    height: "100%"
  },
  buttonGroup: {
    flexDirection: 'row',
    // alignItems: "center",
    justifyContent: 'center',
  },
  btn: {
    width: '45%',
  },
  btnAdd: {
    position: 'absolute',
    bottom: 15,
  },
});

export default AddCard;
