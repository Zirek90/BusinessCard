import React from 'react';
import {StyleSheet, View, Image, ScrollView, Linking} from 'react-native';
import {
  Layout,
  Card,
  Text,
  Divider,
  Button,
  Input,
} from '@ui-kitten/components';
import Orientation from 'react-native-orientation';
import Icon from 'react-native-vector-icons/FontAwesome';

const DetailsCard = ({route, navigation, _editCard}) => {
  if (route.params) {
    const {details} = route.params;
    const [card, setCard] = React.useState(details);
    const [edit, setEdit] = React.useState(false);

    React.useEffect(() => {
      setCard(details);
    }, [details]);

    React.useEffect(() => {
      const unsubscribe = navigation.addListener('focus', () => {
        Orientation.unlockAllOrientations();
        Orientation.lockToLandscape();
      });

      return () => unsubscribe();
    });

    const Header = (props) => (
      <View {...props} style={styles.headerWrapper}>
        <Text category="h2" style={styles.title}>
          {details.name}
        </Text>
        <Button
          style={[styles.btn, {right: '10%'}]}
          status="warning"
          onPress={() => setEdit(!edit)}>
          {edit ? 'Powrót' : 'Edytuj'}
        </Button>
        <Button
          style={[styles.btn, {left: '10%'}]}
          status="success"
          disabled={!edit}
          onPress={() => {
            _editCard(card);
            setEdit(false);
            navigation.navigate('Strona główna');
          }}>
          Akceptuj
        </Button>
      </View>
    );

    const content = (
      <Card header={Header}>
        <View style={[styles.wrapper, {paddingBottom: 10}]}>
          <View style={styles.insideWrapper}>
            <Icon
              name="road"
              size={20}
              color="grey"
              style={{paddingRight: 5}}
            />
            <Text style={styles.text}>{details.street} </Text>
            <Text style={styles.text}>{details.postalCode} </Text>
          </View>

          <View style={styles.insideWrapper}>
            <Icon
              name="building"
              size={20}
              color="grey"
              style={{paddingRight: 5}}
            />
            <Text style={styles.text}>{details.city}</Text>
          </View>
        </View>

        <View style={styles.wrapper}>
          <View style={styles.insideWrapper}>
            <Icon
              name="envelope"
              size={20}
              color="grey"
              style={{paddingRight: 5}}
            />
            <Text style={{fontSize: 20, paddingLeft: 10, paddingTop: 5}}>
              {details.email}
            </Text>
          </View>

          <View style={styles.insideWrapper}>
            <Icon
              name="google"
              size={20}
              color="grey"
              style={{paddingRight: 5}}
            />
            <Text
              style={{fontSize: 20, paddingLeft: 10, paddingTop: 5}}
              onPress={() => Linking.openURL('https://' + details.website)}>
              {details.website}
            </Text>
          </View>
        </View>

        <View style={styles.wrapper}>
          <View style={styles.insideWrapper}>
            <Icon
              name="phone"
              size={20}
              color="grey"
              style={{paddingRight: 5}}
            />
            <Text style={{fontSize: 20, paddingLeft: 10, paddingTop: 5}}>
              {details.phone}
            </Text>
          </View>

          <View style={styles.insideWrapper}>
            <Icon
              name="id-card"
              size={20}
              color="grey"
              style={{paddingRight: 5}}
            />
            <Text style={{fontSize: 20, paddingLeft: 10, paddingTop: 5}}>
              {details.taxNumber}
            </Text>
          </View>
        </View>

        <Divider />
        <Image style={styles.image} source={{uri: details.photo}} />
      </Card>
    );

    const editable_content = (
      <Card header={Header}>
        <View style={[styles.wrapper, {paddingBottom: 10}]}>
          <View style={styles.insideWrapper}>
            <Icon
              name="road"
              size={20}
              color="grey"
              style={{paddingRight: 5}}
            />
            <Input
              style={styles.text}
              value={card.street}
              onChangeText={(street) => setCard({...card, street})}
            />
            <Input
              style={styles.text}
              value={card.postalCode}
              onChangeText={(postalCode) => setCard({...card, postalCode})}
            />
          </View>

          <View style={styles.insideWrapper}>
            <Icon
              name="building"
              size={20}
              color="grey"
              style={{paddingRight: 5}}
            />
            <Input
              style={styles.text}
              value={card.city}
              onChangeText={(city) => setCard({...card, city})}
            />
          </View>
        </View>

        <View style={styles.wrapper}>
          <View style={styles.insideWrapper}>
            <Icon
              name="envelope"
              size={20}
              color="grey"
              style={{paddingRight: 5}}
            />
            <Input
              style={styles.text}
              value={card.email}
              onChangeText={(email) => setCard({...card, email})}
            />
          </View>

          <View style={styles.insideWrapper}>
            <Icon
              name="google"
              size={20}
              color="grey"
              style={{paddingRight: 5}}
            />
            <Input
              style={styles.text}
              value={card.website}
              onChangeText={(website) => setCard({...card, website})}
            />
          </View>
        </View>

        <View style={styles.wrapper}>
          <View style={styles.insideWrapper}>
            <Icon
              name="phone"
              size={20}
              color="grey"
              style={{paddingRight: 5}}
            />
            <Input
              style={styles.text}
              value={card.phone}
              onChangeText={(phone) => setCard({...card, phone})}
            />
          </View>

          <View style={styles.insideWrapper}>
            <Icon
              name="id-card"
              size={20}
              color="grey"
              style={{paddingRight: 5}}
            />
            <Input
              style={styles.text}
              value={card.taxNumber}
              onChangeText={(taxNumber) => setCard({...card, taxNumber})}
            />
          </View>
        </View>

        <Divider />
        <Image style={styles.image} source={{uri: details.photo}} />
      </Card>
    );

    return (
      <Layout level="4" style={styles.container}>
        <ScrollView>{edit ? editable_content : content}</ScrollView>
      </Layout>
    );
  } else {
    return (
      <Layout level="4" style={styles.container}>
        <Card style={{flex: 1, justifyContent: 'center'}}>
          <Text category="h3" style={{textAlign: 'center'}}>
            Prosze wybierz wizytówkę z ekranu głównego aby zobaczyć szczegóły
          </Text>
        </Card>
      </Layout>
    );
  }
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
    marginBottom: 42,
  },
  btn: {
    width: 100,
    height: 40,
    position: 'absolute',
    top: 42,
  },
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  insideWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
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
