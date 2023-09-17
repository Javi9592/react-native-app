import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../../graphql/queries';

const useRepositories = () => {
  const { data={}, loading, refetch } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network'
  })
  const {repositories = null} = data

  const repositoryNodes = repositories
  ? repositories.edges.map(edge => edge.node)
  : [];

  return { repositories: repositoryNodes, loading, refetch};
};

export default useRepositories;