import React, { useState } from 'react';
import { Button, View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const generatePassword = () => {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let password = '';
  for (let i = 0; i < 8; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
};

const savePassword = async (password) => {
  try {
    const savedPasswords = JSON.parse(await AsyncStorage.getItem('passwords')) || [];
    savedPasswords.push(password);
    await AsyncStorage.setItem('passwords', JSON.stringify(savedPasswords));
  } catch (e) {
    console.error(e);
    Alert.alert("Erro", "Falha ao salvar senha");
  }
};

const updatePassword = async (currentPassword, newPassword) => {
  if (newPassword.length > 8) {
    Alert.alert("Erro", "Nova Senha não deve ter mais que 8 caracteres");
    return false; // Falha na atualização devido ao comprimento da nova senha
  }
  try {
    const savedPasswords = JSON.parse(await AsyncStorage.getItem('passwords')) || [];
    const index = savedPasswords.indexOf(currentPassword);
    if (index !== -1) {
      savedPasswords[index] = newPassword;
      await AsyncStorage.setItem('passwords', JSON.stringify(savedPasswords));
      return true;
    } else {
      Alert.alert("Erro", "Falha ao atualizar senha.");
      return false;
    }
  } catch (e) {
    console.error(e);
    Alert.alert("Erro", "Falha ao atualizar senha.");
    return false;
  }
};

const PasswordGenerator = () => {
  const [password, setPassword] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleGeneratePassword = () => {
    const newPassword = generatePassword();
    setPassword(newPassword);
    savePassword(newPassword);
  };

  const handleUpdatePassword = async () => {
    if (currentPassword && newPassword) {
      const success = await updatePassword(currentPassword, newPassword);
      if (success) {
        Alert.alert("Sucesso", "Senha atualizada com sucesso!");
        setCurrentPassword('');
        setNewPassword('');
      }
    } else {
      Alert.alert("Erro", "Por favor preencha ambos os campos.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gerando Senhas Aleatórias pro Tio Anderson</Text>
      <Text style={styles.instructions}>Pressione o botão para gerar uma nova senha </Text>
      <Button title="Gerar Senha" onPress={handleGeneratePassword} />
      {password !== '' && <Text style={styles.password}>Aqui uma senha aleatória: {password}</Text>}
      <View style={styles.separator} />
      <Text style={styles.title}>Atualize a senha aleatória com mais caracteres aleatórios!</Text>
      <Text style={styles.instructions}>Digite a senha atual e a nova senha</Text>
      <TextInput
        style={styles.input}
        placeholder="Senha Atual"
        value={currentPassword}
        onChangeText={setCurrentPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Nova Senha (ainda mais aleatória)"
        value={newPassword}
        onChangeText={setNewPassword}
      />
      <Button title="Atualizar Senha" onPress={handleUpdatePassword} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  instructions: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
  password: {
    fontSize: 18,
    marginVertical: 10,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  separator: {
    marginVertical: 20,
    height: 1,
    backgroundColor: 'gray',
  },
});

export default PasswordGenerator;
