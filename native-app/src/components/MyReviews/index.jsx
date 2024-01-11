import React from 'react';
import { View, StyleSheet, Pressable, FlatList, Alert } from 'react-native';
import theme from '../../theme';
import Text from '../Text';
import useReviews from '../hooks/useReviews';
import { format, parseISO } from 'date-fns';
import { useNavigate } from 'react-router-native';
import useDeleteReview from '../hooks/useDeleteReview';

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
  button1: {
    margin: 10,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#0984e3',
    padding: 9,
    paddingHorizontal: 30,
    borderRadius: 4,
    backgroundColor: '#0984e3',
  },
  button2: {
    margin: 10,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: 'red',
    padding: 9,
    paddingHorizontal: 30,
    borderRadius: 4,
    backgroundColor: 'red',
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

const ReviewsItem = ({ review, refetch }) => {
  const parsedDate = parseISO(review.createdAt);
  const date = format(parsedDate, 'yyyy/MM/dd');
  const navigate = useNavigate();

  const [deleteTheReview] = useDeleteReview();

  const deleteAlert = () =>
    Alert.alert('Delete review', 'Are you sure you want to delete this review?', [
      {
        text: 'CANCEL',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'DELETE', onPress: () => deleteReview() },
    ]);

  const deleteReview = async () => {
    try {
      await deleteTheReview(review);
      refetch()
    } catch (error) {
      console.error(error);
    }
  };

  
  const onPress = ({ id }) => {
    navigate(`/${id}`);
  };

  return (
    <View>
    <View style={{ flexDirection: 'row', paddingVertical: 10 }}>
      <View style={styles.rating}>
        <Text style={styles.textRating}>{review.rating}</Text>
      </View>
      <View style={{paddingRight: 95}}>
        <Text fontWeight='bold' style={styles.texts}>{review.repository.fullName}</Text>
        <Text color='textSecondary' style={styles.texts}>{date}</Text>
        <Text style={styles.texts}>{review.text}</Text>
      </View>
    </View>
    <View style={{flexDirection: 'row'}}>
    <Pressable style={styles.button1} onPress={() => onPress(review.repository)}>
        <Text fontWeight='bold' color='white'>
          View Repository
        </Text>
      </Pressable>
      <Pressable style={styles.button2} onPress={deleteAlert}>
        <Text fontWeight='bold' color='white'>
          Delete Review
        </Text>
      </Pressable>
      </View>
    </View>
  );
};

const MyReviews = () => {
const {reviews, loading, refetch}= useReviews();
  
  
if (loading) {
  return null
}

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewsItem review={item} refetch={refetch}/>}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={() => (
        <Text style={{ backgroundColor: '#dfe6e9' }}></Text>
      )}
    />
  );
};

export default MyReviews;
