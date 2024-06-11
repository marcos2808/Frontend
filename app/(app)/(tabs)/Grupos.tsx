import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { useRouter } from 'expo-router';

type Contact = {
  id: string;
  title: string;
  description: string;
};

const DATA: Contact[] = [
  {
    id: '1',
    title: 'Familia',
    description: 'Grupo familiar',
  },
  {
    id: '2',
    title: 'Amigos',
    description: 'Grupo de amigos cercanos',
  },
  {
    id: '3',
    title: 'Trabajo',
    description: 'Colegas de trabajo',
  },
];

type ItemProps = {
  item: Contact;
  onPress: () => void;
};

const Item: React.FC<ItemProps> = ({ item, onPress }) => (
  <TouchableOpacity style={styles.item} onPress={onPress}>
    <View style={styles.icon}>
      <FeatherIcon name="users" size={24} color="#fff" />
    </View>
    <View style={styles.itemDetails}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </View>
    <FeatherIcon name="chevron-right" size={20} color="#C6C6C6" />
  </TouchableOpacity>
);

const TabTwoScreen: React.FC = () => {
  const navigation = useNavigation();
  const router = useRouter();

  const renderItem = ({ item }: { item: Contact }) => (
    <Item
      item={item}
      onPress={() => router.push({ pathname: '/(app)/GroupDetails', params: { id: item.id }} )}
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        style={styles.flatlist}
      />

      <TouchableOpacity style={styles.addButton} onPress={() => router.push('/(app)/CreateGroup')}>
        <FeatherIcon name="plus" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 20,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  icon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#007bff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemDetails: {
    flex: 1,
    marginLeft: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  flatlist: {
    width: '100%',
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#007bff',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
  },
});

export default TabTwoScreen;
