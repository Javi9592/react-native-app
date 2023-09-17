import { useApolloClient, useMutation } from '@apollo/client';
import { AUTHORIZE } from '../../graphql/mutations';
import { useContext } from 'react';
import AuthStorageContext from '../../contexts/AuthStorageContext';

const useSignIn = () => {
  const client = useApolloClient();
  const authStorage = useContext(AuthStorageContext);
  const [mutate, result] = useMutation(AUTHORIZE);

  const signIn = async ({ username, password }) => {
    try {
      const { data } = await mutate({ variables: { credentials: { username, password } } });
      await authStorage.setAccessToken(data.authenticate.accessToken);
      client.resetStore()
      return data.authenticate;
    } catch (error) {
      throw error;
    }
  };

  return [signIn, result];
};

export default useSignIn;
