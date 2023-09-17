import React from 'react';
import { View, StyleSheet, ScrollView, Pressable } from 'react-native';
import Text from './Text';
import Constants from 'expo-constants';
import theme from '../theme';
import { Link, useLocation } from 'react-router-native';
import { useApolloClient, useQuery } from '@apollo/client';
import { ME } from '../graphql/queries';
import { authStorage } from '../../App';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingTop: Constants.statusBarHeight + 2,
    backgroundColor: theme.appBar.primary,
    paddingLeft: 10,
  },
  scroll: {
    paddingBottom: 15,
  },
  text: {
    color: theme.appBar.textSecondary,
    margin: 2,
  },
  active: {
    color: theme.appBar.textPrimary,
  },
});

const AppBarTab = ({ children, to }) => {
  const { pathname } = useLocation();
  const active = pathname === to;
  const textStyles = [styles.text, active && styles.active];
  return (
    <Link to={to}>
      <Text fontWeight='bold' style={textStyles}>
        {children}
      </Text>
    </Link>
  );
};

const AppBar = () => {
  const client = useApolloClient();
  const user = useQuery(ME);
  console.log('user in AppBar', user.data);

  const logOut = () => {
    console.log('hello');
    authStorage.removeAccessToken();
    client.resetStore()
  }
  return (
    <View style={styles.container}>
      <ScrollView horizontal style={styles.scroll}>
        <AppBarTab active to='/'>
          Repositories
        </AppBarTab>
        {!user.data?.me ? (
          <AppBarTab active to='/signin'>
            Sign In
          </AppBarTab>
        ) : (
          <Pressable onPress={logOut} style={styles.button}>
            <Text style={styles.text} fontWeight='bold'>Log Out</Text>
          </Pressable>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
