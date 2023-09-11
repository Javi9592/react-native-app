import React from 'react';
import { Formik } from 'formik';
import { Pressable, StyleSheet, View } from 'react-native';
import Text from './Text';
import * as yup from 'yup';
import FormikTextInput from './FormikTextInput';

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

const validationSchema = yup.object({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
});

const SignIn = () => {
  const initialValues = {
    username: '',
    password: '',
  };

  const submitSign = (values) => {
    console.log(values);
  };
  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={submitSign}
        validationSchema={validationSchema}
      >
        {({ handleSubmit }) => {
          return (
            <View style={styles.form}>
              <FormikTextInput name='username' placeholder='Username' />
              <FormikTextInput
                name='password'
                placeholder='Password'
                secureTextEntry
              />
              <Pressable onPress={handleSubmit} style={styles.button}>
                <Text style={{ color: 'white' }}>Log In</Text>
              </Pressable>
            </View>
          );
        }}
      </Formik>
    </>
  );
};

export default SignIn;
