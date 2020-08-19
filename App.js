import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-community/async-storage';
import {Validators} from './utils/Validators';
import Settings from './components/Settings';
import Home from './components/Home';
import AddCard from './components/AddCard';
import DetailsCard from './components/DetailsCard';
import * as eva from '@eva-design/eva';
import {ApplicationProvider} from '@ui-kitten/components';
import ImagePicker from 'react-native-image-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Orientation from 'react-native-orientation';
import SplashScreen from 'react-native-splash-screen';
import {LANGUAGE_OPTIONS} from './utils/languageOptions';
import {options} from './utils/imageOptions';

const Tab = createBottomTabNavigator();

function App() {
  const [singleCard, setSingleCard] = React.useState({
    name: '',
    street: '',
    postalCode: '',
    city: '',
    phone: '',
    website: '',
    email: '',
    taxNumber: '',
    photo: null,
  });
  const [cards, setCards] = React.useState([]);
  const [detailsAvailable, setDetailsAvailable] = React.useState(false);
  const [error, setError] = React.useState('');
  const [visible, setVisible] = React.useState(false);
  const [theme, setTheme] = React.useState('light');
  const [language, setLanguage] = React.useState(LANGUAGE_OPTIONS.POLISH);

  React.useEffect(() => {
    SplashScreen.hide();
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
  };

  const toggleLanguage = () => {
    const nextLanguage =
      language.no_businesscards === 'No business cards available'
        ? LANGUAGE_OPTIONS.POLISH
        : LANGUAGE_OPTIONS.ENGLISH;
    setLanguage(nextLanguage);
  };

  const handleOrientation = (mode) => {
    Orientation.unlockAllOrientations();
    if (mode === 'details') {
      Orientation.lockToLandscape();
    } else Orientation.lockToPortrait();
  };

  React.useEffect(() => {
    _fetchCards();
  }, []);

  const _fetchCards = async () => {
    try {
      const allCards = [];
      const keys = await AsyncStorage.getAllKeys();
      await AsyncStorage.multiGet(keys, (err, stores) => {
        stores.map((result, i, store) => {
          // let key = store[i][0];
          let value = store[i][1];
          let parsedValue = JSON.parse(value);
          allCards.push(parsedValue);
        });
      });
      // console.log(allCards)
      setCards(allCards);
    } catch (err) {
      console.log(err);
      setError(err);
    }
  };

  const _addCard = async () => {
    try {
      const errorList = [];
      const card = singleCard;

      errorList.push(Validators.nameValidator(card.name));
      errorList.push(Validators.phoneValidator(card.phone));
      errorList.push(Validators.emailValidator(card.email));
      errorList.push(Validators.taxNumberValidator(card.taxNumber));
      if (errorList.flat().length) return setError(errorList.flat());

      await AsyncStorage.setItem(card.name, JSON.stringify(card));
      alert(language.add_alert);
      setSingleCard({
        name: '',
        street: '',
        postalCode: '',
        city: '',
        phone: '',
        email: '',
        website: '',
        taxNumber: '',
        photo: null,
      });
      _fetchCards();
    } catch (err) {
      console.log(err);
      setError(err);
    }
  };

  const _takePhotoOfCard = () => {
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
        const photo = `data:image/jpeg;base64,${response.data}`;
        setSingleCard({...singleCard, photo});
      }
    });
  };

  const _editCard = async (card) => {
    try {
      await AsyncStorage.setItem(card.name, JSON.stringify(card));
      alert(language.edit_alert);
      _fetchCards();
    } catch (err) {
      console.log(err);
      setError(err);
    }
  };

  const _removeCard = async (card) => {
    try {
      await AsyncStorage.removeItem(card);
      alert(language.delete_alert);
      _fetchCards();
    } catch (err) {
      console.log(err);
      setError(err);
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
          <Tab.Screen
            name="Strona główna"
            listeners={{
              tabPress: () => handleOrientation('home'),
            }}>
            {(props) => (
              <Home
                {...props}
                cards={cards}
                _removeCard={_removeCard}
                setDetailsAvailable={setDetailsAvailable}
                language={language}
              />
            )}
          </Tab.Screen>
          <Tab.Screen
            name="Dodaj wizytówke"
            listeners={{
              tabPress: () => handleOrientation('add'),
            }}>
            {(props) => (
              <AddCard
                {...props}
                singleCard={singleCard}
                setSingleCard={setSingleCard}
                _addCard={_addCard}
                _addImageToCard={_takePhotoOfCard}
                error={error}
                language={language}
              />
            )}
          </Tab.Screen>
          {detailsAvailable &&<Tab.Screen
            name="Cała wizytówka"
            listeners={{
              tabPress: () => handleOrientation('details'),
            }}>
            {(props) => (
              <DetailsCard
                {...props}
                _editCard={_editCard}
                setError={setError}
                language={language}
              />
            )}
          </Tab.Screen>
          }
        </Tab.Navigator>
      </NavigationContainer>

      <Settings
        visible={visible}
        theme={theme}
        language={language}
        toggleTheme={toggleTheme}
        toggleLanguage={toggleLanguage}
        setVisible={setVisible}
      />
    </ApplicationProvider>
  );
}

export default App;
