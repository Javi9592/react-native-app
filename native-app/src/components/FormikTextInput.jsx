import React from 'react';
import { StyleSheet } from 'react-native';
import { useField } from 'formik';
import StylesTextInput from './StylesTextInput';
import Text from './Text';

const styles = StyleSheet.create({
  errorText: {
    color: '#d73a4a',
    marginTop: 5,
    marginBottom: 5
  },
});

const FormikTextInput = ({ name, ...props }) => {
  const [field, meta, helpers] = useField(name);
  const showError = meta.touched && meta.error;

  return (
    <>
      <StylesTextInput
        onChangeText={value => helpers.setValue(value)}
        onBlur={() => helpers.setTouched(true)}
        value={field.value}
        error={showError}
        {...props}
        
      />
      {showError && <Text style={styles.errorText}>{meta.error}</Text>}
    </>
  );
};

export default FormikTextInput;