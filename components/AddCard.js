import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { Layout, Card, Text, Input, Button } from '@ui-kitten/components';
import Ionicons from 'react-native-vector-icons/Ionicons';

const AddCard = ({
  navigation,
  singleCard,
  setSingleCard,
  _addCard,
  _addImageToCard,
  error,
  language,
}) => (
  <Layout style={styles.container} level="4">
    <Card style={styles.cardWrapper}>
      <Input
        style={styles.inputs}
        placeholder={language.add.name}
        value={singleCard.name}
        onChangeText={(name) => setSingleCard({ ...singleCard, name })}
      />
      <Input
        placeholder={language.add.street}
        value={singleCard.street}
        onChangeText={(street) => setSingleCard({ ...singleCard, street })}
      />
      <Input
        placeholder={language.add.postal_code}
        value={singleCard.postalCode}
        onChangeText={(postalCode) => setSingleCard({ ...singleCard, postalCode })}
      />
      <Input
        placeholder={language.add.city}
        value={singleCard.city}
        onChangeText={(city) => setSingleCard({ ...singleCard, city })}
      />
      <Input
        placeholder={language.add.phone}
        value={singleCard.phone}
        onChangeText={(phone) => setSingleCard({ ...singleCard, phone })}
      />
      <Input
        placeholder={language.add.website}
        value={singleCard.website}
        onChangeText={(website) => setSingleCard({ ...singleCard, website })}
      />
      <Input
        placeholder={language.add.email}
        value={singleCard.email}
        onChangeText={(email) => setSingleCard({ ...singleCard, email })}
      />
      <Input
        style={{ marginBottom: 10 }}
        placeholder={language.add.tax_number}
        value={singleCard.taxNumber}
        onChangeText={(taxNumber) => setSingleCard({ ...singleCard, taxNumber })}
      />
      <View style={{ flexDirection: 'column' }}>
        {error.length
          ? error.map((err, i) => (
              <Text key={i} style={{ color: 'red' }}>
                {err}
              </Text>
            ))
          : null}
      </View>

      <View style={styles.imageWrapper}>
        {singleCard.photo ? (
          <TouchableOpacity style={{ width: '100%' }} onPress={() => _addImageToCard()}>
            <Image style={styles.images} source={{ uri: singleCard.photo }} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.btn} onPress={() => _addImageToCard()}>
            <Ionicons name={'camera-outline'} size={100} color={'lightgrey'} />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.submitContainer}>
        <Button
          style={{ alignSelf: 'flex-end' }}
          onPress={() =>
            _addCard()
              .then(() => singleCard.name && navigation.navigate('Strona główna'))
              .catch((e) => console.log("Couldn't add card"))
          }>
          {language.add.button}
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
  inputs: {
    width: '100%',
  },
  imageWrapper: {
    height: 150,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  images: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  btn: {
    width: '70%',
    borderWidth: 1,
    borderColor: 'lightgrey',
    borderStyle: 'solid',
    borderRadius: 10,
    alignItems: 'center',
    padding: 5,
    marginTop: -20,
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
