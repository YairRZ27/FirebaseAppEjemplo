import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import { auth } from '../firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const CreateAccountScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const handleRegister = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert("Cuenta Creada", "Tu cuenta ha sido creada exitosamente.", [{ text: "OK", onPress: () => navigation.navigate('Login') }]);
    } catch (error) {
      Alert.alert("Error", error.message); 
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crear Cuenta</Text>
      <TextInput
        style={styles.input}
        placeholder="Correo Electrónico"
        placeholderTextColor="#999"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        placeholderTextColor="#999"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Registrarse</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.link}>
        <Text style={styles.linkText}>¿Ya tienes una cuenta? Inicia sesión</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 30,
  },
  input: {
    width: '100%',
    height: 50,
    borderRadius: 10,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    marginBottom: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  link: {
    marginTop: 20,
  },
  linkText: {
    color: '#4CAF50',
    fontSize: 14,
  },
  error: {
    color: 'red',
    fontSize: 14,
    marginBottom: 10,
  },
});

export default CreateAccountScreen;
