import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-community/async-storage';
import {Validators} from './utils/Validators';
import Home from './components/Home';
import AddCard from './components/AddCard';
import DetailsCard from "./components/DetailsCard";
import * as eva from '@eva-design/eva';
import {ApplicationProvider, Layout, Text} from '@ui-kitten/components';
import ImagePicker from 'react-native-image-picker';

const Tab = createBottomTabNavigator();

function App() {
  const [singleCard, setSingleCard] = React.useState({
    name: '',
    street: '',
    postalCode: '',
    city: '',
    phone: '',
    email: '',
    taxNumber: '',
  });
  const [cards, setCards] = React.useState([]);
  const [error, setError] = React.useState('');


  // React.useEffect(async() => {
  //   const keys = await AsyncStorage.getAllKeys();
  //   console.log(keys)
  //   keys.forEach(async(el) => await AsyncStorage.removeItem(el))
  // }, [])


  React.useEffect(() => {
    _fetchCards();
  }, []);

  _fetchCards = async () => {
    try {
      const allCards = [];
      const keys = await AsyncStorage.getAllKeys();
      const items = await AsyncStorage.multiGet(keys, (err, stores) => {
        stores.map((result, i, store) => {
          // let key = store[i][0];
          let value = store[i][1];
          let parsedValue = JSON.parse(value);
          allCards.push(parsedValue);
        });
      });
      // console.log(allCards)
      setCards(allCards);
    } 
    catch (error) {
      console.log(error);
      setError(error);
    }
  };

  _addCard = async () => {
    try {
      const error = [];
      const card = singleCard;

      error.push(Validators.nameValidator(card.name));
      error.push(Validators.phoneValidator(card.phone));
      error.push(Validators.emailValidator(card.email));
      error.push(Validators.taxNumberValidator(card.taxNumber));
      if (error.flat().length) return setError(error.flat());

      await AsyncStorage.setItem(card.name, JSON.stringify(card));
      alert('Twoja wizytowka zostala zapisana');
      _fetchCards();
    } 
    catch (error) {
      console.log(error);
      setError(error);
    }
  };

  _removeCard = async (card) => {
    try {
      await AsyncStorage.removeItem(card);
      alert("Wizytowka usunieta")
      _fetchCards()
    }
    catch(error) {
      console.log(error);
      setError(error)
    }
  }

  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <NavigationContainer>
        <Tab.Navigator initialRouteName="Strona główna">
          <Tab.Screen name="Strona główna">
            {(props) => (
              <Home {...props} cards={cards} _removeCard={_removeCard}/>
            )}
          </Tab.Screen>
          <Tab.Screen name="Dodaj wizytówke">
            {(props) => (
              <AddCard
                {...props}
                singleCard={singleCard}
                setSingleCard={setSingleCard}
                _addCard={_addCard}
                error={error}
              />
            )}
          </Tab.Screen>
          {/* <Tab.Screen name="Cała wizytówka" navigationOptions={{header: null}}>
            {(props) => (
              <DetailsCard {...props} />
            )}
          </Tab.Screen> */}
        </Tab.Navigator>

        
      </NavigationContainer>
    </ApplicationProvider>
  );
}

export default App;
