import React, { useState } from 'react';
import { FlatList, StyleSheet, TextInput, View } from 'react-native';
import RepositoryItem from '../RepositoryItem';
import Text from '../Text';
import RNPickerSelect from 'react-native-picker-select';
import useRepositoriesOrder from '../hooks/useRepositoriesOrder';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useDebounce } from 'use-debounce';
import useSearch from '../hooks/useSearch';

const RepositoryList = () => {
  const [search, setSearch] = useState('');
  const [order, setOrder] = useState(undefined);

  const [value] = useDebounce(search, 500);

  const resultSearch = useSearch({
    searchKeyword: value
  }).repositories

  const order1 = useRepositoriesOrder({
    query: 'RATING_AVERAGE',
    order: 'ASC',
  }).repositories;

  const order2 = useRepositoriesOrder({
    query: 'RATING_AVERAGE',
    order: 'DESC',
  }).repositories;

  const resetInput = () => {
    setSearch('');
  };

  return (
    <View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputField}
          value={search}
          onChangeText={(value) => setSearch(value)}
        />
        {search.length > 0 && (
          <Icon
            name="close"
            size={20}
            onPress={resetInput}
          ></Icon>
        )}
      </View>
      <FlatList
        ListHeaderComponent={
          <RNPickerSelect
            placeholder={{
              label: 'Latest repositories',
              value: 'latest',
            }}
            onValueChange={(value) => setOrder(value)}
            items={[
              { label: 'Highest rated repositories', value: 'highest' },
              { label: 'Lowest rated repositories', value: 'lowest' },
            ]}
          />
        }
        data={
          order === 'highest'
            ? order2
            : order === 'lowest'
            ? order1
            : resultSearch
        }
        renderItem={({ item }) => <RepositoryItem repository={item} />}
        keyExtractor={(item) => item.id}
        testID='RepositoryListContainer'
        ItemSeparatorComponent={() => (
          <Text style={{ backgroundColor: 'lightgray' }}></Text>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#919191',
    borderWidth: 1,
    margin: 10,
    paddingLeft: 15,
    borderRadius: 5,
  },
  inputField: {
    flex: 1,
  },
});

export default RepositoryList;
