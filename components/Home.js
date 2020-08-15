import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import {Layout, Card, Text, Divider, Button} from '@ui-kitten/components';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Orientation from 'react-native-orientation';

const Home = ({navigation, cards, _removeCard, language}) => {

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      Orientation.unlockAllOrientations();
      Orientation.lockToPortrait();
    });

    return () => unsubscribe();
  });

  return (
  <Layout style={styles.container} level="4">
    <ScrollView style={{width: '100%'}}>
      {cards.length 
        ? (
          <Text style={{textAlign: 'center'}}>
            {language.home_description}
          </Text>
          )
        : null
      }
      {cards.length ? (
        cards.map((card, index) => (
          <Card key={index} style={styles.card}>
            <TouchableOpacity
              style={styles.removeBtn}
              onPress={() => _removeCard(card.name)}>
                <Ionicons name={'trash-outline'} size={16} color={'red'} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Cała wizytówka', {
                  itemId: index,
                  details: card,
                })
              }>
              <Text category="h4" style={{textAlign: 'center', marginTop: -10}}>
                {card.name}
              </Text>
              <Divider />
              <View style={styles.wrappers}>
                <View>
                  <Text>{language.home.phone} {card.phone}</Text>
                  <Text>{language.home.email} {card.email}</Text>
                  <Text>{language.home.tax_number} {card.taxNumber}</Text>
                </View>
                <View>
                  {card.photo && (
                    <Image style={styles.images} source={{uri: card.photo}} />
                  )}
                </View>
              </View>
            </TouchableOpacity>
          </Card>
        ))
      ) : (
        <Card style={{marginTop: 10}}>
          <Text category="h2" style={styles.textNoCards}>
            {language.no_businesscards}
          </Text>
        </Card>
      )}
    </ScrollView>
  </Layout>
  )
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    paddingTop: 30,
  },
  card: {
    width: '100%',
    marginTop: 5,
    position: 'relative',
  },
  removeBtn: {
    position: 'absolute',
    top: 0,
    right: 2,
    color: 'red',
  },
  wrappers: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
  },
  btn: {
    height: 30,
    width: 150,
    margin: 5,
    alignSelf: 'center',
    color: 'white',
  },
  images: {
    width: 100,
    height: 60,
    resizeMode: 'contain',
  },
  textNoCards: {
    fontWeight: 'bold',
  },
});
