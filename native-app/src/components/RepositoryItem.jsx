import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import Text from './Text';
import theme from '../theme';

const parseThousand = (value) => {
  return value >= 1000 ? `${Math.round(value / 100) / 10}k` : String(value);
};

const styles = StyleSheet.create({
  image: {
    width: 48,
    height: 48,
    borderRadius: 4,
  },
  container: {
    padding: 20,
    paddingBottom: 20,
    paddingEnd: 5,
  },
  language: {
    padding: 5,
    backgroundColor: theme.colors.primary,
    color: theme.colors.white,
    alignSelf: 'flex-start',
    borderRadius: 4,
    overflow: 'hidden',
  },
});

const Stats = ({ repository }) => {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
      <View style={{flexDirection: 'column-reverse'}}>
        <Text align='center'>Stars</Text>
        <Text fontWeight='bold' align='center'>{parseThousand(repository.stargazersCount)}</Text>
      </View>
      <View style={{flexDirection: 'column-reverse'}}>
        <Text align='center'>Forks</Text>
        <Text fontWeight='bold' align='center'>{parseThousand(repository.forksCount)}</Text>
      </View>
      <View style={{flexDirection: 'column-reverse'}}>
        <Text align='center'>Reviews</Text>
        <Text fontWeight='bold' align='center'>{repository.reviewCount}</Text>
      </View>
      <View style={{flexDirection: 'column-reverse'}}>
        <Text align='center'>Rating</Text>
        <Text fontWeight='bold' align='center'>{repository.ratingAverage}</Text>
      </View>
    </View>
  );
};

const RepositoryItemHeader = ({ repository }) => {
  return (
    <View style={{ flexDirection: 'row', paddingBottom: 2, marginBottom: 10 }}>
      <View style={{ paddingRight: 10 }}>
        <Image
          source={{ uri: repository.ownerAvatarUrl }}
          style={styles.image}
        />
      </View>
      <View>
        <Text color='primary' fontWeight='bold' fontSize='subheading' style={{marginBottom: 5}}>
          {repository.fullName}
        </Text>
        <Text color='textSecondary' style={{marginBottom: 5}}>{repository.description}</Text>
        <Text style={styles.language}>{repository.language}</Text>
      </View>
    </View>
  );
};

const RepositoryItem = ({ repository }) => {
  return (
    <View key={repository.id} style={styles.container}>
      <RepositoryItemHeader repository={repository} />
      <Stats repository={repository} />
    </View>
  );
};

export default RepositoryItem;
