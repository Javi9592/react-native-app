import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react-native';
import SignInForm from '../../components/SignIn/SignInForm';
import { Formik } from 'formik';

describe('SignIn', () => {
  describe('SignInContainer', () => {
    it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {
      // render the SignInContainer component, fill the text inputs and press the submit button
      const onSubmit = jest.fn()

      const { getByTestId, getByPlaceholderText } = render(
        <Formik initialValues={{ username: '', password: '' }} onSubmit={onSubmit}>
          {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
        </Formik>
      );

      await act(async () => {
        fireEvent.changeText(getByPlaceholderText('Username'), 'Mike');
      });
  
      await act(async () => {
        fireEvent.changeText(getByPlaceholderText('Password'), 'password');
      });
  
      await act(async () => {
        fireEvent.press(getByTestId('submitButton'));
      });
  
      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledTimes(1);
        expect(onSubmit.mock.calls[0][0]).toEqual({ username: "Mike", password: "password" });
      });
    });
  });
});