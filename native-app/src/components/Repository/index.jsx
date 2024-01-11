import React from 'react';
import { View, StyleSheet, Pressable, FlatList } from 'react-native';
import theme from '../../theme';
import Stats from './Stats';
import RepositoryItemHeader from './RepositoryItemHeader';
import useRepository from '../hooks/useRepository';
import { useParams } from 'react-router-native';
import Text from '../Text';
import * as Linking from 'expo-linking';
import useRepositoryReviews from '../hooks/useRepositoryReviews';
import { format, parseISO } from 'date-fns';

const styles = StyleSheet.create({
  image: {
    width: 48,
    height: 48,
    borderRadius: 4,
  },
  container: {
    padding: 20,
    paddingBottom: 20,
    paddingEnd: 53,
  },
  language: {
    padding: 5,
    backgroundColor: theme.colors.primary,
    color: theme.colors.white,
    alignSelf: 'flex-start',
    borderRadius: 4,
    overflow: 'hidden',
  },
  button: {
    margin: 10,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#0984e3',
    padding: 9,
    paddingHorizontal: 60,
    borderRadius: 4,
    backgroundColor: '#0984e3',
  },
  rating: {
    borderWidth: 3,
    borderColor: 'blue',
    margin: 15,
    borderRadius: 1000,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textRating: {
    color: 'blue',
  },
  texts: {
    margin: 3,
  }
});

const RepositoryInfo = ({ repository, onPress }) => {
  return (
    <View key={repository} style={styles.container}>
      <RepositoryItemHeader repository={repository} styles={styles.image} />
      <Stats repository={repository} />
      <Pressable style={styles.button} onPress={onPress}>
        <Text fontWeight='bold' color='white'>
          Open in GitHub
        </Text>
      </Pressable>
    </View>
  );
};

const ReviewItem = ({ review }) => {
  const parsedDate = parseISO(review.createdAt);
  const date = format(parsedDate, 'yyyy/MM/dd');
  return (
    <View style={{ flexDirection: 'row', paddingVertical: 10 }}>
      <View style={styles.rating}>
        <Text style={styles.textRating}>{review.rating}</Text>
      </View>
      <View style={{paddingRight: 95}}>
        <Text fontWeight='bold' style={styles.texts}>{review.user.username}</Text>
        <Text color='textSecondary' style={styles.texts}>{date}</Text>
        <Text style={styles.texts}>{review.text}</Text>
      </View>
    </View>
  );
};

const Repository = () => {
  const match = useParams();
  const repository = useRepository(match).repository;
  const { reviews, fetchMore, data } = useRepositoryReviews(match);

  const onPress = () => {
    Linking.openURL(repository.url);
  };

  const handleReached = () => {
    fetchMore()
  }
  
  
if (!data.repository) {
  return null
}

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => (
        <RepositoryInfo repository={repository} onPress={onPress} />
      )}
      onEndReached={() => handleReached()}
      onEndReachedThreshold={0.5}
      ItemSeparatorComponent={() => (
        <Text style={{ backgroundColor: '#dfe6e9' }}></Text>
      )}
    />
  );
};

export default Repository;
