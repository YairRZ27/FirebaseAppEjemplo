import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CreateAccountScreen from './screens/CreateAccountScreen';
import LoginScreen from './screens/LoginScreen';
import WelcomeScreen from './screens/WelcomeScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="CreateAccount">
        <Stack.Screen name="CreateAccount" component={CreateAccountScreen} options={{ title: 'Crear Cuenta' }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Iniciar Sesión' }} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ title: 'Bienvenido' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
