import { Pressable, StyleSheet, View } from 'react-native';
import FormikTextInput from './FormikTextInput';
import Text from '../Text';

const SignUpForm = ({ onSubmit }) => {
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
      <FormikTextInput name='username' placeholder='Username' placeholderTextColor="#b2bec3"/>
      <FormikTextInput name='password' placeholder='Password' secureTextEntry placeholderTextColor="#b2bec3"/>
      <FormikTextInput name='rPassword' placeholder='Password Confirmation' secureTextEntry placeholderTextColor="#b2bec3"/>
      <Pressable onPress={onSubmit} style={styles.button} testID='submitButton'>
        <Text style={{ color: 'white' }}>Sign Up</Text>
      </Pressable>
    </View>
  );
};
export default SignUpForm;
