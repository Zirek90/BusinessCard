import React from 'react';
import Home from "../Home";
import AddCard from "../AddCard";

import { createStackNavigator } from '@react-navigation/stack';

const AddCardsStack = createStackNavigator();

function AddCardsStackScreen() {
    return (
      <HomeStack.Navigator>
        <HomeStack.Screen name="Strona główna" component={Home} />
        <HomeStack.Screen name="Dodaj wizytówke" component={AddCard} />
      </HomeStack.Navigator>
    );
  }

  export default AddCardsStackScreen