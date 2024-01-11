import { Pressable, StyleSheet, View } from 'react-native';
import FormikTextInput from './FormikTextInput';
import Text from '../Text';

const CreateReviewForm = ({ onSubmit }) => {
  const styles = StyleSheet.create({
    form: {
      margin: 20,
      alignSelf: 'center',
      minWidth: 350,
    },
    button: {
      alignSelf: 'center',
      borderWidth: 1,
      padding: 5,
      paddingHorizontal: 20,
      borderRadius: 4,
      backgroundColor: '#0984e3',
    },
  });

  return (
    <View style={styles.form}>
      <FormikTextInput name='ownerName' placeholder='Repository owner name' placeholderTextColor="#b2bec3"/>
      <FormikTextInput name='repositoryName' placeholder='Repository name' placeholderTextColor="#b2bec3"/>
      <FormikTextInput name='rating' placeholder='Rating between 0 and 100' placeholderTextColor="#b2bec3" type='number'/>
      <FormikTextInput name='text' placeholder='Review' placeholderTextColor="#b2bec3"/>
      <Pressable onPress={onSubmit} style={styles.button}>
        <Text style={{ color: 'white' }}>Create a Review</Text>
      </Pressable>
    </View>
  );
};
export default CreateReviewForm;
