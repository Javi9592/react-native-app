import React from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import useSignUp from '../hooks/useSignUp';
import { useNavigate } from 'react-router-native';
import SignUpForm from './SignUpForm';

const validationSchema = yup.object({
  username: yup
    .string()
    .required('Username is required')
    .min(1, 'Username must be 1 or more than 1')
    .max(30, 'Username must be less than 30'),
  password: yup
    .string()
    .required('Password is required')
    .min(5, 'Password must be 5 or more than 5')
    .max(50, 'Password must be less than 50'),
  rPassword:
    yup.string().oneOf(
      [yup.ref('password'),
      null],
      'Confirmation password need to coincide with the Password').required(
        'Password confirmation is required',
      )
});

const SignUp = () => {
  const navigate = useNavigate();
  const [signUp] = useSignUp();
  const initialValues = {
    username: '',
    password: '',
    rPassword: '',
  };

  const signUpIn = async (values, { resetForm }) => {
    const { username, password } = values;
    try {
      await signUp({ username, password });
      resetForm(initialValues)
      navigate("/signin")
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={signUpIn}
        validationSchema={validationSchema}
      >
        {({ handleSubmit }) => {
          return <SignUpForm onSubmit={handleSubmit} />;
        }}
      </Formik>
    </>
  );
};

export default SignUp;
