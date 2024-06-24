import React from 'react';
import { View, Text, FlatList, StyleSheet, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const deletePassword = async (passwordToDelete) => {
  try {
    const savedPasswords = JSON.parse(await AsyncStorage.getItem('passwords')) || [];
    const updatedPasswords = savedPasswords.filter(password => password !== passwordToDelete);
    await AsyncStorage.setItem('passwords', JSON.stringify(updatedPasswords));
  } catch (e) {
    console.error(e);
  }
};

const PasswordList = () => {
  const [passwords, setPasswords] = React.useState([]);

  React.useEffect(() => {
    const fetchPasswords = async () => {
      try {
        const savedPasswords = JSON.parse(await AsyncStorage.getItem('passwords')) || [];
        setPasswords(savedPasswords);
      } catch (e) {
        console.error(e);
      }
    };
    fetchPasswords();
  }, []);

  const handleDeletePassword = async (password) => {
    await deletePassword(password);
    const savedPasswords = JSON.parse(await AsyncStorage.getItem('passwords')) || [];
    setPasswords(savedPasswords);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={passwords}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.passwordContainer}>
            <Text style={styles.password}>{index + 1}. {item}</Text>
            <Button title="Delete" onPress={() => handleDeletePassword(item)} />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  passwordContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  password: {
    fontSize: 18,
  },
});

export default PasswordList;
