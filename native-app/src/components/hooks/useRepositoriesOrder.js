import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES_ORDER } from '../../graphql/queries';

const useRepositoriesOrder = ({ query, order }) => {
  const {
    data = {},
    loading,
    refetch,
  } = useQuery(GET_REPOSITORIES_ORDER, {
    variables: { orderBy: query, orderDirection: order },
    fetchPolicy: 'cache-and-network',
  });
  const { repositories = null } = data;

  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return { repositories: repositoryNodes, loading, refetch };
};

export default useRepositoriesOrder;
