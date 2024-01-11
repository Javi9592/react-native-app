import { useMutation } from '@apollo/client';
import { SIGN_UP } from '../../graphql/mutations';

const useSignUp = () => {
  const [mutate, result] = useMutation(SIGN_UP);

  const signUp = async ({ username, password }) => {
    try {
      const result = await mutate({ variables: { user: { username, password } } });
      return result;
    } catch (error) {
      throw error;
    }
  };

  return [signUp, result];
};

export default useSignUp;
