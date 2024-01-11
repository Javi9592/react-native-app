import React from 'react';
import { StyleSheet, View } from 'react-native';
import AppBar from './AppBar';
import { Route, Routes, Navigate } from 'react-router-native';
import SignIn from './SignIn';
import Repositories from './Repositories';
import Repository from './Repository';
import CreateReview from './CreateReview';
import SignUp from './SignUp';
import MyReviews from './MyReviews';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
  },
});

const Main = ({ authStorage }) => {
  return (
    <View style={styles.container}>
      <AppBar authStorage={authStorage} />
      <Routes>
        <Route path='/' element={<Repositories />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/:id' element={<Repository />} />
        <Route path='*' element={<Navigate to='/' />} />
        <Route path='/createReview' element={<CreateReview />}/>
        <Route path='/signup'  element={<SignUp />} />
        <Route path='/myReviews'  element={<MyReviews />} />
      </Routes>
    </View>
  );
};

export default Main;
