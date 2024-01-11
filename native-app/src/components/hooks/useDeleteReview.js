import { useMutation } from '@apollo/client';
import { DELETE_REVIEW } from '../../graphql/mutations';

const useDeleteReview = () => {
  const [mutate, result] = useMutation(DELETE_REVIEW);

  const deleteReview = async ({ id }) => {
    try {
      const { data } = await mutate({ variables: { deleteReviewId: id } });
      return data;
    } catch (error) {
      console.log(JSON.stringify(error));
      throw error;
    }
  };

  return [deleteReview, result];
};

export default useDeleteReview;
