import React from 'react';
import { FlatList } from 'react-native';
import RepositoryItem from './RepositoryItem';
import Text from './Text';
import useRepositories from './hooks/useRepositories';

const RepositoryList = () => {
  const { repositories } = useRepositories();

  return (
    <FlatList
      data={repositories}
      renderItem={({ item }) => <RepositoryItem repository={item} />}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={() => (
        <Text style={{ backgroundColor: 'lightgray' }}></Text>
      )}
    />
  );
};

export default RepositoryList;
