import React from 'react';
import Main from './src/components/Main';
import { NativeRouter } from 'react-router-native';
import { StatusBar } from 'expo-status-bar';

const App = () => {
  return (
    <>
      <StatusBar style='ligth' />
        <NativeRouter>
          <Main />
        </NativeRouter>
    </>
  );
};

export default App;
