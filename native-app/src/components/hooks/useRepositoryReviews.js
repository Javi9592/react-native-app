import { useQuery } from '@apollo/client';
import { REPOSITORY_REVIEWS_DOS } from '../../graphql/queries';

const useRepositoryReviews = ({ id }) => {
  const {
    data = {},
    fetchMore,
    loading,
  } = useQuery(REPOSITORY_REVIEWS_DOS, {
    variables: { repositoryId: id, first: 2 },
    fetchPolicy: 'cache-and-network',
  });
  const variables = { repositoryId: id, first: 2 };

  const { repository = null } = data;

  const nameData = repository ? repository.name : null;
  const ownerName = repository ? repository.ownerName : null;

  const repositoryNodes = repository
    ? repository.reviews.edges.map((edges) => edges.node)
    : [];

  const handleFetchMore = () => {
    const canFetchMore =
      !loading && data && data.repository.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
        ...variables,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const nextResult = {
          repository: {
            ...fetchMoreResult.repository,
            reviews: {
              ...fetchMoreResult.repository.reviews,
              edges: [
                ...previousResult.repository.reviews.edges,
                ...fetchMoreResult.repository.reviews.edges,
              ],
            },
          },
        };
        return nextResult;
      },
    });
  };

  return {
    reviews: repositoryNodes,
    name: nameData,
    ownerName: ownerName,
    loading,
    fetchMore: handleFetchMore,
    data: data,
    id: id,
  };
};

export default useRepositoryReviews;
