import { useQuery } from '@apollo/client';
import { REPOSITORY } from '../../graphql/queries';

const useRepository = ({ id }) => {
  //const number = 2;
  const {
    data = {},
    loading,
    refetch,
  } = useQuery(REPOSITORY, {
    variables: { repositoryId: id },
    fetchPolicy: 'cache-and-network',
  });
  const { repository = null } = data;


  const repositoryNodes = repository
    ? repository
    : [];

  return { repository: repositoryNodes, loading, refetch };
};

export default useRepository;
