import React from 'react';
import { StyleSheet, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Layout, Card, Text, Divider } from '@ui-kitten/components';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useOrientation } from '../utils/useOrientation';

const Home = ({ navigation, cards, confirmRemoveCard, setDetailsAvailable, language }) => {
  useOrientation(navigation, 'home');

  return (
    <Layout style={styles.container} level="4">
      <ScrollView style={{ width: '100%' }}>
        {cards.length ? (
          <Text style={{ textAlign: 'center' }}>{language.home_description}</Text>
        ) : null}
        {cards.length ? (
          cards.map((card, index) => (
            <Card key={index} style={styles.card}>
              <TouchableOpacity
                style={styles.removeBtn}
                onPress={() => {
                  setDetailsAvailable(false);

                  confirmRemoveCard(card.name);
                }}>
                <Ionicons name={'trash-outline'} size={16} color={'red'} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={async () => {
                  await setDetailsAvailable(true);

                  await navigation.navigate('Details', {
                    itemId: index,
                    details: card,
                  });
                }}>
                <Text category="h4" style={{ textAlign: 'center', marginTop: -10 }}>
                  {card.name}
                </Text>
                <Divider />
                <View style={styles.wrappers}>
                  <View>
                    <Text>
                      {language.home.tax_number} {card.taxNumber}
                    </Text>
                  </View>
                  <View>
                    {card.photo && <Image style={styles.images} source={{ uri: card.photo }} />}
                  </View>
                </View>
              </TouchableOpacity>
            </Card>
          ))
        ) : (
          <Card style={{ marginTop: 10 }}>
            <Text category="h2" style={styles.textNoCards}>
              {language.no_businesscards}
            </Text>
          </Card>
        )}
      </ScrollView>
    </Layout>
  );
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
    alignItems: 'center',
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
    width: 90,
    height: 50,
    resizeMode: 'contain',
  },
  textNoCards: {
    fontWeight: 'bold',
  },
});
