import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-community/async-storage';
import { Validators } from './utils/Validators';
import Settings from './components/Settings';
import Home from './components/Home';
import AddCard from './components/AddCard';
import DetailsCard from './components/DetailsCard';
import * as eva from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Orientation from 'react-native-orientation';
import SplashScreen from 'react-native-splash-screen';
import { LANGUAGE_OPTIONS } from './utils/languageOptions';
import { takePhoto } from './utils/managePhotos';

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
  const [cards, setCards] = useState([]);
  const [detailsAvailable, setDetailsAvailable] = useState(false);
  const [error, setError] = useState('');
  const [visible, setVisible] = useState(false);
  const [theme, setTheme] = useState('light');
  const [language, setLanguage] = useState(LANGUAGE_OPTIONS.POLISH);

  useEffect(() => {
    SplashScreen.hide();

    const manageInitialThemeAndLanguage = async () => {
      const t = await AsyncStorage.getItem('theme');
      const l = await AsyncStorage.getItem('language');

      if (t) setTheme(t);
      if (l) setLanguage(JSON.parse(l));
    };
    manageInitialThemeAndLanguage();
    _fetchCards();
  }, []);

  const selectCardsKeysForFetch = async () => {
    const keys = await AsyncStorage.getAllKeys();
    const t = keys.indexOf('theme');
    const l = keys.indexOf('language');
    if (t > -1) keys.splice(t, 1);
    if (l > -1) keys.splice(l, 1);
    return keys;
  };

  const _fetchCards = async () => {
    try {
      const allCards = [];
      // const keys = await AsyncStorage.getAllKeys();
      const keys = await selectCardsKeysForFetch();

      await AsyncStorage.multiGet(keys, (err, stores) => {
        stores.map((result, i, store) => {
          let value = store[i][1];
          let parsedValue = JSON.parse(value);
          allCards.push(parsedValue);
        });
      });
      // console.log(allCards)
      setCards(allCards);
    } catch (err) {
      console.log(err);
      setError((prev) => [...prev, err]);
    }
  };

  const _addCard = async () => {
    try {
      const errorList = [];
      const card = singleCard;

      errorList.push(Validators.nameValidator(card.name));
      errorList.push(Validators.postalCodeValidator(card.postalCode));
      errorList.push(Validators.phoneValidator(card.phone));
      errorList.push(Validators.websiteValidator(card.website));
      errorList.push(Validators.emailValidator(card.email));
      errorList.push(Validators.taxNumberValidator(card.taxNumber));
      if (errorList.flat().length) {
        setError(errorList.flat());
        return 'Error';
      }

      await AsyncStorage.setItem(card.name, JSON.stringify(card));
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
      Alert.alert(language.add.success_title, language.add.success_content);
    } catch (err) {
      console.log(err);
      setError(err);
    }
  };

  const takePhotoOfCard = async () => {
    try {
      const photo = await takePhoto();
      setSingleCard({ ...singleCard, photo });
    } catch (err) {
      setError(err);
    }
  };

  const _editCard = async (card) => {
    try {
      await AsyncStorage.setItem(card.name, JSON.stringify(card));
      Alert.alert(language.edit.success_title, language.edit.success_content);
      _fetchCards();
    } catch (err) {
      console.log(err);
      setError(err);
    }
  };

  const _removeCard = async (card) => {
    try {
      await AsyncStorage.removeItem(card);
      Alert.alert(language.remove.success_title, language.remove.success_content);
      setDetailsAvailable(false);
      _fetchCards();
    } catch (err) {
      console.log(err);
      setError(err);
    }
  };

  const confirmRemoveCard = (card) => {
    Alert.alert(
      language.remove.confirm_title,
      language.remove.confirm_content,
      [
        {
          text: language.remove.confirm_no,
          onPress: () => null,
        },
        { text: language.remove.yes, onPress: () => _removeCard(card) },
      ],
      { cancelable: false },
    );
  };

  const toggleTheme = async () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    await AsyncStorage.setItem('theme', nextTheme);
  };

  const toggleLanguage = async () => {
    const nextLanguage =
      language.no_businesscards === 'No business cards available'
        ? LANGUAGE_OPTIONS.POLISH
        : LANGUAGE_OPTIONS.ENGLISH;
    setLanguage(nextLanguage);
    await AsyncStorage.setItem('language', JSON.stringify(nextLanguage));
  };

  const handleOrientation = (mode) => {
    Orientation.unlockAllOrientations();
    if (mode === 'details') {
      Orientation.lockToLandscape();
    } else Orientation.lockToPortrait();
  };

  return (
    <ApplicationProvider {...eva} theme={eva[theme]}>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName={language.menu.home}
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              if (route.name === 'Home') iconName = 'home';
              else if (route.name === 'Add business card') iconName = 'add-outline';
              else if (route.name === 'Details') iconName = 'wallet-outline';

              return <Ionicons name={iconName} size={size} color={color} />;
            },
          })}
          tabBarOptions={{
            activeTintColor: 'blue',
            inactiveTintColor: 'gray',
          }}>
          <Tab.Screen
            name="Home"
            options={{
              title: language.menu.home,
            }}
            listeners={{
              tabPress: () => handleOrientation('home'),
            }}>
            {(props) => (
              <Home
                {...props}
                cards={cards}
                confirmRemoveCard={confirmRemoveCard}
                setDetailsAvailable={setDetailsAvailable}
                language={language}
              />
            )}
          </Tab.Screen>
          <Tab.Screen
            name="Add business card"
            options={{
              title: language.menu.add,
            }}
            listeners={{
              tabPress: () => handleOrientation('add'),
            }}>
            {(props) => (
              <AddCard
                {...props}
                singleCard={singleCard}
                setSingleCard={setSingleCard}
                _addCard={_addCard}
                _addImageToCard={takePhotoOfCard}
                error={error}
                language={language}
              />
            )}
          </Tab.Screen>
          {detailsAvailable && (
            <Tab.Screen
              name="Details"
              options={{
                title: language.menu.details,
              }}
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
          )}
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
