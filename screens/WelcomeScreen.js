import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { auth } from '../firebaseConfig'; // Asegúrate de importar correctamente tu configuración de Firebase
import { db } from '../firebaseConfig'; // Importa la instancia de Firestore
import {collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';

const Welcome = () => {
  const [bookName, setBookName] = useState('');
  const [opinion, setOpinion] = useState('');
  const [opinions, setOpinions] = useState([]);
  const [user, setUser] = useState(null);

  // Función para obtener las opiniones de Firestore
  const fetchOpinions = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'opiniones'));
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id, // ID del documento
        ...doc.data() // Datos del documento
      }));
      setOpinions(data);
    } catch (error) {
      console.error('Error al cargar opiniones:', error);
    }
  };

  // Función para agregar una opinión
  const addOpinion = async () => {
    if (bookName.trim() && opinion.trim()) {
      try {
        await addDoc(collection(db, 'opiniones'), {
          bookName,
          opinion,
          userId: user.uid, // ID del usuario autenticado
        });
        fetchOpinions(); // Actualiza la lista después de agregar
        setBookName(''); // Limpia el campo del nombre del libro
        setOpinion(''); // Limpia el campo de opinión
      } catch (error) {
        console.error('Error al agregar la opinión:', error);
      }
    } else {
      alert('Por favor completa todos los campos.');
    }
  };

  // Función para eliminar una opinión
  const removeOpinion = async (id) => {
    try {
      await deleteDoc(doc(db, 'opiniones', id)); // Elimina el documento por ID
      fetchOpinions(); // Actualiza la lista después de eliminar
    } catch (error) {
      console.error('Error al eliminar la opinión:', error);
    }
  };

  // Maneja el estado del usuario autenticado
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        fetchOpinions(); // Cargar opiniones cuando el usuario esté autenticado
      } else {
        setUser(null);
      }
    });
    return unsubscribe;
  }, []);

  return (
    <View style={styles.container}>
      {user ? (
        <>
          <Text style={styles.title}>Bienvenido, {user.email}</Text>
          <TextInput
            placeholder="Nombre del libro"
            value={bookName}
            onChangeText={setBookName}
            style={styles.input}
          />
          <TextInput
            placeholder="Tu opinión"
            value={opinion}
            onChangeText={setOpinion}
            style={styles.input}
          />
          <TouchableOpacity style={styles.button} onPress={addOpinion}>
            <Text style={styles.buttonText}>Agregar Opinión</Text>
          </TouchableOpacity>
          <FlatList
            data={opinions}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.opinionItem}>
                <Text>
                  <Text style={styles.bookName}>{item.bookName}:</Text> {item.opinion}
                </Text>
                {item.userId === user.uid && (
                  <Button
                    title="Eliminar"
                    onPress={() => removeOpinion(item.id)}
                    color="#ff5c5c"
                  />
                )}
              </View>
            )}
          />
        </>
      ) : (
        <Text style={styles.infoText}>Por favor, inicia sesión para ver y agregar opiniones.</Text>
      )}
    </View>
  );
};

// Estilos para la pantalla
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  opinionItem: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#e8e8e8',
    borderRadius: 5,
  },
  bookName: {
    fontWeight: 'bold',
  },
  infoText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom:15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  }
});

export default Welcome;
