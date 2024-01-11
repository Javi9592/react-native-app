import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Pressable,
  SafeAreaView,
} from 'react-native';
import Text from '../Text';
import theme from '../../theme';
import { Link, useLocation } from 'react-router-native';
import { useApolloClient, useQuery } from '@apollo/client';
import { ME } from '../../graphql/queries';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingTop: 15,
    backgroundColor: theme.appBar.primary,
    paddingLeft: 10,
  },
  scroll: {
    paddingBottom: 15,
  },
  text: {
    color: theme.appBar.textSecondary,
    margin: 4,
    marginHorizontal: 10,
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

const AppBar = ({ authStorage }) => {
  const client = useApolloClient();
  const user = useQuery(ME);

  const logOut = () => {
    authStorage.removeAccessToken();
    client.resetStore();
  };
  return (
    <SafeAreaView style={{ backgroundColor: '#24292e' }}>
      <View style={styles.container}>
        <ScrollView horizontal style={styles.scroll}>
          <AppBarTab active to='/'>
            Repositories
          </AppBarTab>
          {!user.data?.me ? (
            <View style={{ flexDirection: 'row' }}>
              <AppBarTab active to='/signin'>
                Sign In
              </AppBarTab>
              <AppBarTab active to='/signup'>
                Sign Up
              </AppBarTab>
            </View>
          ) : (
            <View style={{ flexDirection: 'row' }}>
              <AppBarTab active to='/createReview'>
                Create a Review
              </AppBarTab>
              <AppBarTab active to='/myReviews'>
                My Reviews
              </AppBarTab>
              <Pressable onPress={logOut} style={styles.button}>
                <Text style={styles.text} fontWeight='bold'>
                  Log Out
                </Text>
              </Pressable>
            </View>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default AppBar;
