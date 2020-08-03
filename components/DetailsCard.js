import React from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {
  Layout,
  Card,
  Text,
  Divider,
  Button,
  Input,
} from '@ui-kitten/components';
import {AsyncStorage} from 'react-native';

const DetailsCard = ({route, navigation, _editCard}) => {
  if (route.params) {
    const {details} = route.params;
    const [card, setCard] = React.useState(details);
    const [edit, setEdit] = React.useState(false);

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
          <Text style={styles.text}>{details.street} </Text>
          <Text style={styles.text}>{details.postalCode}, </Text>
          <Text style={styles.text}>{details.city}</Text>
        </View>
        <Text style={{fontSize: 20, paddingLeft: 10, paddingTop: 5}}>
          {details.email}
        </Text>
        <Text style={{fontSize: 20, paddingLeft: 10, paddingTop: 5}}>
          {details.phone}
        </Text>
        <Text style={{fontSize: 20, paddingLeft: 10, paddingTop: 5}}>
          {details.taxNumber}
        </Text>
        <Divider />
        <Image style={styles.image} source={{uri: details.photo}} />
      </Card>
    );

    const editable_content = (
      <Card header={Header}>
        <View style={styles.wrapper}>
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
          <Input
            style={styles.text}
            value={card.city}
            onChangeText={(city) => setCard({...card, city})}
          />
        </View>
        {/* <View style={styles.wrapper}> */}
        <Input
          style={styles.text}
          value={card.email}
          onChangeText={(email) => setCard({...card, email})}
        />
        <Input
          style={styles.text}
          value={card.phone}
          onChangeText={(phone) => setCard({...card, phone})}
        />
        <Input
          style={styles.text}
          value={card.taxNumber}
          onChangeText={(taxNumber) => setCard({...card, taxNumber})}
        />
        {/* </View> */}
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
    padding: 10,
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
