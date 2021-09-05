import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {MyStack} from './src/navigation/MainStack';
import {TodoProvider} from './src/context/todoContext';

export function App() {
  return (
    <NavigationContainer>
      <TodoProvider>
        <MyStack />
      </TodoProvider>
    </NavigationContainer>
  );
}
