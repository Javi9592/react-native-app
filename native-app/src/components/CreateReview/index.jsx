import React from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import useCreateReview from '../hooks/useCreateReview';
import { useNavigate } from 'react-router-native';
import CreateReviewForm from './CreateReview';

const validationSchema = yup.object({
  ownerName: yup.string().required('Repository owner name is required'),
  repositoryName: yup.string().required('Repository name is required'),
  rating: yup
    .number()
    .integer('Rating debe ser un número entero')
    .positive('Rating debe ser positivo')
    .min(0, 'Rating debe ser mayor o igual a 0')
    .max(100, 'Rating debe ser menor o igual a 100')
    .required('Rating es obligatorio'),
  text: yup.string(),
});

const CreateReview = () => {
  const navigate = useNavigate();
  const [CreateReview] = useCreateReview();
  const initialValues = {
    ownerName: '',
    repositoryName: '',
    rating: '',
    text: '',
  };

  const createReview = async (values, { resetForm }) => {
    const { ownerName, repositoryName, text } = values;
    const rating = parseInt(values.rating, 10);
    try {
      await CreateReview({ ownerName, repositoryName, rating, text });
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
        onSubmit={createReview}
        validationSchema={validationSchema}
      >
        {({ handleSubmit }) => {
          return <CreateReviewForm onSubmit={handleSubmit} />;
        }}
      </Formik>
    </>
  );
};

export default CreateReview;
