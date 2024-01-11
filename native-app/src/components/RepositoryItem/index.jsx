import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import theme from '../../theme';
import Stats from './Stats';
import RepositoryItemHeader from './RepositoryItemHeader';
import { useNavigate } from 'react-router-native';

const styles = StyleSheet.create({
  image: {
    width: 48,
    height: 48,
    borderRadius: 4,
  },
  container: {
    padding: 20,
    paddingBottom: 20,
    paddingEnd: 55,
  },
  language: {
    padding: 5,
    backgroundColor: theme.colors.primary,
    color: theme.colors.white,
    alignSelf: 'flex-start',
    borderRadius: 4,
    overflow: 'hidden',
  },
});

const RepositoryItem = ({ repository }) => {
  const navigate = useNavigate();
  const onPress = ({ id }) => {
    navigate(`/${id}`);
  };
  return (
    <Pressable onPress={() => onPress(repository)}>
      <View key={repository} style={styles.container}>
        <RepositoryItemHeader repository={repository} styles={styles.image} />
        <Stats repository={repository} />
      </View>
    </Pressable>
  );
};

export default RepositoryItem;
