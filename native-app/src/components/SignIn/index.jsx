import React from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import useSignIn from '../hooks/useSignIn';
import { useNavigate } from 'react-router-native';
import SignInForm from './SignInForm';

const validationSchema = yup.object({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
});

const SignIn = () => {
  const navigate = useNavigate();
  const [signIn] = useSignIn();
  const initialValues = {
    username: '',
    password: '',
  };

  const submitSign = async (values, { resetForm }) => {
    const { username, password } = values;

    try {
      const data = await signIn({ username, password });
      resetForm(initialValues)
      navigate("/")
    } catch (error) {
      console.error(error);
    }
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
            <SignInForm onSubmit={handleSubmit}/>
          );
        }}
      </Formik>
    </>
  );
};

export default SignIn;
