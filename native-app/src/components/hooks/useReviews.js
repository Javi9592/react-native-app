import { useQuery } from '@apollo/client';
import { USER_REVIEWS } from '../../graphql/queries';

const useReviews = () => {
  const { data={}, loading, refetch } = useQuery(USER_REVIEWS, {
    fetchPolicy: 'cache-and-network'
  })
  const {me = null} = data

  const reviewsNodes = me
  ? me.reviews.edges.map(edge => edge.node)
  : [];

  return { reviews: reviewsNodes, loading, refetch};
};

export default useReviews;