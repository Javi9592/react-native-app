import { useQuery } from '@apollo/client';
import { SEARCH_KEY } from '../../graphql/queries';

const useSearch = ({ searchKeyword }) => {
  const {
    data = {},
    loading,
    refetch,
  } = useQuery(SEARCH_KEY, {
    variables: { searchKeyword: searchKeyword },
    fetchPolicy: 'cache-and-network',
  });
  const { repositories = null } = data;

  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return { repositories: repositoryNodes, loading, refetch };
};

export default useSearch;
