import Constants from 'expo-constants';
import { ApolloClient, InMemoryCache, createHttpLink} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: Constants.expoConfig.extra.apolloUri,
});

const createApolloClient = (authStorage) => {
  
  const authLink = setContext(async (_, { headers }) => {
    const token = await authStorage.getAccessToken();
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      },
    };
  });


   return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields:{
            repository: {
              keyArgs: false,
              // merge: (existing, incoming, {readField}) => {
              //   console.log("readField", readField('reviews', incoming));
              //   console.log('existing',existing, 'incoming', incoming)
              //   return {...incoming}
              // }
            }
          }
        }
      }
    })
  });
};



export default createApolloClient
