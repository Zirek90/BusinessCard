import React from 'react';
import Home from "../Home";
import AddCard from "../AddCard";
import { createStackNavigator } from '@react-navigation/stack';

const AddCardsStack = createStackNavigator();

function EditCardsStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={Home} />
      <HomeStack.Screen name="AddCard" component={AddCard} />
    </HomeStack.Navigator>
  );
}

export default EditCardsStackScreen;