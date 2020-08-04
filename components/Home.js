import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Linking
} from 'react-native';
import {Layout, Card, Text, Divider, Button} from '@ui-kitten/components';

const Home = ({navigation, cards, _removeCard}) => (
  <Layout style={styles.container} level="4">
    <ScrollView style={{width: '100%'}}>
      {cards.length 
        ? (
          <Text style={{textAlign: 'center'}}>
            Kliknij wizytówke aby w nią wejść
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
              <Text category="h6" style={{color: 'red'}}>
                X
              </Text>
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
                  <Text>Tel: {card.phone}</Text>
                  <Text>Email: {card.email}</Text>
                  <Text>NIP: {card.taxNumber}</Text>
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
        <Card>
          <Text category="h2" style={styles.textNoCards}>
            Brak wizytowek
          </Text>
        </Card>
      )}
    </ScrollView>
  </Layout>
);

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
    position: 'relative',
  },
  removeBtn: {
    position: 'absolute',
    top: -4,
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
