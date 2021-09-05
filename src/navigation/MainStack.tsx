import React from 'react';
import {createStackNavigator, StackScreenProps} from '@react-navigation/stack';
import {LoginScreen} from '../screens/LoginScreen';
import {TodoScreen} from '../screens/TodoScreen';

const Stack = createStackNavigator();

interface Props extends StackScreenProps<any, any> {}

export const MyStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{headerShown: false}}
        name="LoginScreen"
        component={LoginScreen}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="TodoScreen"
        component={TodoScreen}
      />
    </Stack.Navigator>
  );
};
