import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-community/async-storage';
import Home from "./components/Home";
import AddCard from "./components/AddCard";

const Tab = createBottomTabNavigator();

function App() {
  const [singleCard, setSingleCard] = React.useState({
    name: "",
    street: "",
    postalCode: "",
    city: "",
    phone: "",
    email: "",
    nip: ""
  });
  const [cards, setCards] = React.useState([])
  const [error, setError] = React.useState("");

  _fetchData = async () => {

    try {
      const allCards = [];
      const keys = await AsyncStorage.getAllKeys();
      const items = await AsyncStorage.multiGet(keys, (err, stores) => {
        stores.map((result, i, store) => {
          // let key = store[i][0];
          let value = store[i][1];
          let parsedValue = JSON.parse(value);
          allCards.push(parsedValue);
        })
      })
      console.log(allCards)
      setCards(allCards)
    } 
    catch (error) {
      console.log(error);
      setError(error);
    }
  };

  React.useEffect(() => {
    console.log(singleCard)
  }, [singleCard])

  //   _addData = async () => {

  //   try {
  //     await AsyncStorage.setItem(this.state.name, JSON.stringify(data))
  //     alert("Twoja wizytowka zostala zapisana");
  //   } catch (error) {
  //     console.log(error);
  //     setError(error);
  //   }
  // };
  

  return (
    <NavigationContainer>
        <Tab.Navigator initialRouteName="Strona główna">
          <Tab.Screen name="Strona główna" >
            {props => <Home{...props} _fetchData={_fetchData}/>}
          </Tab.Screen>
          <Tab.Screen name="Dodaj wizytówke">
            {props => <AddCard {...props} singleCard={singleCard} setSingleCard={setSingleCard} error={error}/>}
          </Tab.Screen>
        </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
