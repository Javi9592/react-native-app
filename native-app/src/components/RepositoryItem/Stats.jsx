import { View } from "react-native";
import Text from "../Text";

const Stats = ({ repository }) => {
  const parseThousand = (value) => {
    return value >= 1000 ? `${Math.round(value / 100) / 10}k` : String(value);
  };
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
      <View style={{ flexDirection: 'column-reverse' }}>
        <Text align='center'>Stars</Text>
        <Text fontWeight='bold' align='center' testID='repositoryCount'>
          {parseThousand(repository.stargazersCount)}
        </Text>
      </View>
      <View style={{ flexDirection: 'column-reverse' }}>
        <Text align='center'>Forks</Text>
        <Text fontWeight='bold' align='center' testID='repositoryCount'>
          {parseThousand(repository.forksCount)}
        </Text>
      </View>
      <View style={{ flexDirection: 'column-reverse' }}>
        <Text align='center'>Reviews</Text>
        <Text fontWeight='bold' align='center' testID='repositoryCount'>
          {repository.reviewCount}
        </Text>
      </View>
      <View style={{ flexDirection: 'column-reverse' }}>
        <Text align='center'>Rating</Text>
        <Text fontWeight='bold' align='center' testID='repositoryCount'>
          {repository.ratingAverage}
        </Text>
      </View>
    </View>
  );
};

export default Stats;
