import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from "./components/Home";
import AddCard from "./components/AddCard";
const Stack = createStackNavigator();

function App() {
  const [card, setCard] = React.useState({
    name: "",
    street: "",
    postalCode: "",
    city: "",
    phone: "",
    email: "",
    nip: ""
  });
  const [error, setError] = React.useState("");
  

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="AddCard">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="AddCard" component={AddCard} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
