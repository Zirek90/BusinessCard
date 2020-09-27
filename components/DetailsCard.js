import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image, ScrollView, Linking, BackHandler } from 'react-native';
import { Layout, Card, Text, Divider, Button, Input } from '@ui-kitten/components';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useOrientation } from '../utils/useOrientation.js';
import { pickCard } from '../utils/managePhotos';

const DetailsCard = ({ route, navigation, _editCard, setError, language }) => {
  const [details, setDetails] = useState('');
  const [card, setCard] = useState('');
  const [edit, setEdit] = useState(false);
  useOrientation(navigation, 'details');

  useEffect(() => {
    if (route.params) {
      setDetails(route.params.details);
      setCard(route.params.details);
    }
  }, [route.params]);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => true);
    return () => BackHandler.removeEventListener('hardwareBackPress', () => true);
  }, []);

  const pickCardFromGalery = async () => {
    try {
      const photo = await pickCard();
      setCard({ ...card, photo });
    } catch (err) {
      setError(err);
    }
  };

  const Header = (props) => (
    <View {...props} style={styles.headerWrapper}>
      <Text category="h2" style={styles.title}>
        {details.name}
      </Text>
      <Button
        style={[styles.btn, { right: '10%' }]}
        status="warning"
        onPress={() => setEdit(!edit)}>
        {edit ? language.edit.return_btn : language.edit.edit_btn}
      </Button>
      <Button
        style={[styles.btn, { left: '10%' }]}
        status="success"
        disabled={!edit}
        onPress={() => {
          _editCard(card);
          setDetails(card);
          setEdit(false);
        }}>
        {language.edit.accept_btn}
      </Button>
    </View>
  );

  const content = (
    <Card header={Header}>
      <View style={[styles.wrapper, { paddingBottom: 10 }]}>
        <View style={styles.insideWrapper}>
          <Icon name="road" size={20} color="grey" style={styles.icons} />
          <Text style={styles.text}>{details.street} </Text>
        </View>

        <View style={styles.insideWrapper}>
          <Icon name="envelope" size={20} color="grey" style={styles.icons} />
          <Text style={{ fontSize: 20, paddingLeft: 10, paddingTop: 5 }}>{details.email}</Text>
        </View>
      </View>

      <View style={styles.wrapper}>
        <View style={styles.insideWrapper}>
          <Icon name="building" size={20} color="grey" style={styles.icons} />
          <Text style={styles.text}>{details.postalCode} </Text>
          <Text style={styles.text}>{details.city}</Text>
        </View>

        <View style={styles.insideWrapper}>
          <Icon name="google" size={20} color="grey" style={styles.icons} />
          <Text
            style={{ fontSize: 20, paddingLeft: 10, paddingTop: 5 }}
            onPress={() => Linking.openURL('https://' + details.website)}>
            {details.website}
          </Text>
        </View>
      </View>

      <View style={styles.wrapper}>
        <View style={styles.insideWrapper}>
          <Icon name="id-card" size={20} color="grey" style={styles.icons} />
          <Text style={{ fontSize: 20, paddingLeft: 0, paddingTop: 5 }}>
            {language.edit.tax_number}{' '}
          </Text>
          <Text style={{ fontSize: 20, paddingLeft: 5, paddingTop: 5 }}>{details.taxNumber}</Text>
        </View>

        <View style={styles.insideWrapper}>
          <Icon name="phone" size={20} color="grey" style={styles.icons} />
          <Text style={{ fontSize: 20, paddingLeft: 10, paddingTop: 5 }}>{details.phone}</Text>
        </View>
      </View>

      <Divider />
      {details.photo && <Image style={styles.image} source={{ uri: details.photo }} />}
    </Card>
  );

  const editable_content = (
    <Card header={Header}>
      <View style={[styles.wrapper, { paddingBottom: 10 }]}>
        <View style={styles.insideWrapper}>
          <Icon name="road" size={20} color="grey" style={styles.icons} />
          <Input
            style={styles.text}
            placeholder={language.add.street}
            value={card.street}
            onChangeText={(street) => setCard({ ...card, street })}
          />
        </View>

        <View style={styles.insideWrapper}>
          <Icon name="envelope" size={20} color="grey" style={styles.icons} />
          <Input
            style={styles.text}
            placeholder={language.add.email}
            value={card.email}
            onChangeText={(email) => setCard({ ...card, email })}
          />
        </View>
      </View>

      <View style={styles.wrapper}>
        <View style={styles.insideWrapper}>
          <Icon name="building" size={20} color="grey" style={styles.icons} />
          <Input
            style={styles.text}
            placeholder={language.add.postal_code}
            value={card.postalCode}
            onChangeText={(postalCode) => setCard({ ...card, postalCode })}
          />
          <Input
            style={styles.text}
            placeholder={language.add.city}
            value={card.city}
            onChangeText={(city) => setCard({ ...card, city })}
          />
        </View>

        <View style={styles.insideWrapper}>
          <Icon name="google" size={20} color="grey" style={styles.icons} />
          <Input
            style={styles.text}
            placeholder={language.add.website}
            value={card.website}
            onChangeText={(website) => setCard({ ...card, website })}
          />
        </View>
      </View>

      <View style={styles.wrapper}>
        <View style={styles.insideWrapper}>
          <Icon name="id-card" size={20} color="grey" style={styles.icons} />
          <Input
            style={styles.text}
            placeholder={language.add.tax_number}
            value={card.taxNumber}
            onChangeText={(taxNumber) => setCard({ ...card, taxNumber })}
          />
        </View>

        <View style={styles.insideWrapper}>
          <Icon name="phone" size={20} color="grey" style={styles.icons} />
          <Input
            style={styles.text}
            placeholder={language.add.phone}
            value={card.phone}
            onChangeText={(phone) => setCard({ ...card, phone })}
          />
        </View>
      </View>

      <Divider />
      {card.photo && <Image style={styles.image} source={{ uri: card.photo }} />}
      <Button
        style={{ width: 150, alignSelf: 'center' }}
        status="info"
        onPress={() => pickCardFromGalery()}>
        {card.photo ? language.edit.replace_image_btn : language.edit.add_image_btn}
      </Button>
    </Card>
  );

  return (
    <Layout level="4" style={styles.container}>
      <ScrollView>{edit ? editable_content : content}</ScrollView>
    </Layout>
  );
};

export default DetailsCard;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    paddingTop: 30,
    flex: 1,
  },
  headerWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'relative',
  },
  title: {
    textAlign: 'center',
    padding: 15,
    // marginBottom: 42,
  },
  btn: {
    width: 100,
    height: 40,
    position: 'absolute',
    top: 25,
  },
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 10,
  },
  insideWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icons: {
    width: 35,
    paddingRight: 5,
  },
  text: {
    fontSize: 20,
  },
  image: {
    margin: 5,
    width: '100%',
    height: 300,
    resizeMode: 'contain',
  },
});
