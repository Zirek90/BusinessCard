import React from 'react';
import {StyleSheet, View, TouchableOpacity, Image} from 'react-native';
import {Layout, Card, Text, Divider, Button} from '@ui-kitten/components';
import photo from '../assets/images.png';

const Home = ({navigation, cards, _removeCard}) => {
  return (
    <Layout style={styles.container} level="3">
      {cards.length ? (
        cards.map((card, index) => (
          <Card key={index} style={styles.card}>
            <TouchableOpacity 
              style={styles.removeBtn}
              onPress={() => _removeCard(card.name)}
              >
              <Text style={{color: "red"}}>X</Text>
            </TouchableOpacity>

            <Text category="h4" style={{textAlign: 'center'}}>
              {card.name}
            </Text>
            <Divider />
            <View style={styles.wrappers}>
              <View>
                <Text>{card.phone}</Text>
                <Text>{card.email}</Text>
                <Text>{card.taxNumber}</Text>
              </View>
              <View>
              {card.photo && 
                <Image style={styles.images} source={{uri: card.photo}} />
              }
                
              </View>
            </View>
              <Button 
                style={styles.btn}
                onPress={() => navigation.navigate("Cała wizytówka", {
                  itemId: index,
                  details: card
                  })}
                >
              <Text>Zobacz wiecej</Text>
            </Button>
          </Card>
        ))
      ) : (
        <Text category="h2" style={styles.textNoCards}>Brak wizytowek</Text>
      )}
    </Layout>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'lightgrey',
    padding: 10,
  },
  card: {
    width: '100%',
    margin: 5,
    position: 'relative',
  },
  removeBtn: {
    position: 'absolute',
    top: 0,
    right: 5,
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
    alignSelf: "center"
  },
  images: {
    width: 100,
    height: 60,
  },
  textNoCards: {
    fontWeight: "bold",
    marginTop: 20,
  }
});
