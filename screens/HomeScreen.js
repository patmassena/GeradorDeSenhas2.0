import React from 'react';
import { Button, View, StyleSheet } from 'react-native';
import PasswordGenerator from '../components/PasswordGenerator';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <PasswordGenerator />
      <Button title="Ver senhas aleatórias salvas" onPress={() => navigation.navigate('SavedPasswords')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});

export default HomeScreen;
