import { Image, View } from "react-native";
import Text from "../Text";

const RepositoryItemHeader = ({ repository, styles }) => {
    return (
      <View style={{ flexDirection: 'row', paddingBottom: 2, marginBottom: 10 }}>
        <View style={{ paddingRight: 10 }}>
          <Image
            source={{ uri: repository.ownerAvatarUrl }}
            style={styles}
          />
        </View>
        <View>
          <Text
            color='primary'
            fontWeight='bold'
            fontSize='subheading'
            style={{ marginBottom: 5 }}
            testID='repositoryName' 
          >
            {repository.fullName}
          </Text>
          <Text color='textSecondary' style={{ marginBottom: 5 }} testID='repositoryDescription'>
            {repository.description}
          </Text>
          <Text style={styles.language} testID='repositoryLanguage'>{repository.language}</Text>
        </View>
      </View>
    );
  };

  export default RepositoryItemHeader