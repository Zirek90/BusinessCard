import 'react-native-gesture-handler';
import React from 'react';
import {View, Switch} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-community/async-storage';
import {Validators} from './utils/Validators';
import Home from './components/Home';
import AddCard from './components/AddCard';
import DetailsCard from './components/DetailsCard';
import * as eva from '@eva-design/eva';
import {ApplicationProvider} from '@ui-kitten/components';
import ImagePicker from 'react-native-image-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();
const options = {
  quality: 0.4,
  maxWidth: 500,
  maxHeight: 500,
};

function App() {
  const [singleCard, setSingleCard] = React.useState({
    name: '',
    street: '',
    postalCode: '',
    city: '',
    phone: '',
    email: '',
    taxNumber: '',
    photo: null,
  });
  const [cards, setCards] = React.useState([]);
  const [error, setError] = React.useState('');
  const [theme, setTheme] = React.useState('light');

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
  };

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
    } catch (error) {
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
      setSingleCard({
        name: '',
        street: '',
        postalCode: '',
        city: '',
        phone: '',
        email: '',
        taxNumber: '',
        photo: null,
      });
      _fetchCards();
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };

  _addImageToCard = (mode) => {
    if (mode === 'takePicture') return _takePhotoOfCard();
    else if (mode === 'pickPicture') return _pickCardFromGalery();
  };

  _takePhotoOfCard = () => {
    ImagePicker.launchCamera(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
        setError('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
        setError(response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        setError(response.customButton);
      } else {
        // console.log(response);
        const photo = response.uri;
        setSingleCard({...singleCard, photo});
      }
    });
  };

  _pickCardFromGalery = () => {
    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
        setError('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
        setError(response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        setError(response.customButton);
      } else {
        const photo = response.uri;
        setSingleCard({...singleCard, photo});
        console.log(singleCard, photo);
      }
    });
  };

  _editCard = async (card) => {
    try {
      await AsyncStorage.setItem(card.name, JSON.stringify(card));
      alert('Wizytówka zedytowana');
    } catch (e) {
      console.log(e);
      setError(e);
    }
  };

  _removeCard = async (card) => {
    try {
      await AsyncStorage.removeItem(card);
      alert('Wizytowka usunieta');
      _fetchCards();
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };

  return (
    <ApplicationProvider {...eva} theme={eva[theme]}>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Strona główna"
          screenOptions={({route}) => ({
            tabBarIcon: ({focused, color, size}) => {
              if (route.name === 'Strona główna') iconName = 'home';
              else if (route.name === 'Dodaj wizytówke')
                iconName = 'add-outline';
              else if (route.name === 'Cała wizytówka')
                iconName = 'wallet-outline';

              return <Ionicons name={iconName} size={size} color={color} />;
            },
          })}
          tabBarOptions={{
            activeTintColor: 'blue',
            inactiveTintColor: 'gray',
          }}>
          <Tab.Screen name="Strona główna">
            {(props) => (
              <Home {...props} cards={cards} _removeCard={_removeCard} />
            )}
          </Tab.Screen>
          <Tab.Screen name="Dodaj wizytówke">
            {(props) => (
              <AddCard
                {...props}
                singleCard={singleCard}
                setSingleCard={setSingleCard}
                _addCard={_addCard}
                _addImageToCard={_addImageToCard}
                error={error}
              />
            )}
          </Tab.Screen>
          <Tab.Screen name="Cała wizytówka">
            {(props) => <DetailsCard {...props} _editCard={_editCard} />}
          </Tab.Screen>
        </Tab.Navigator>
      </NavigationContainer>

      <View
        style={{
          position: 'absolute',
          top: 0,
          right: 10,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Ionicons name={'sunny-outline'} size={19} color={'#ffbf00'} />
        <Switch
          trackColor={{false: '#bfc7c1', true: '#bfc7c1'}}
          thumbColor={theme === 'light' ? '#ffbf00' : 'blue'}
          ios_backgroundColor="#bfc7c1"
          onValueChange={toggleTheme}
          value={theme !== 'light' ? true : false}
        />
        <Ionicons name={'moon-outline'} size={19} color={'blue'} />
      </View>
    </ApplicationProvider>
  );
}

export default App;
