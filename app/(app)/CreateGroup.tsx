
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

export default function CreateGroup() {
  const [groupName, setGroupName] = useState('');
  const [groupDescription, setGroupDescription] = useState('');

  
  const handleCreateGroup = () => {
    // Aquí puedes manejar la lógica para crear el grupo
    console.log('Creando grupo:', { groupName, groupDescription });
    // Aquí iría el código para enviar la información del grupo al backend, etc.

  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crear Grupo</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre del Grupo"
        value={groupName}
        onChangeText={text => setGroupName(text)}
      />
      <TextInput
        style={[styles.input, { height: 100 }]}
        placeholder="Descripción del Grupo"
        value={groupDescription}
        onChangeText={text => setGroupDescription(text)}
        multiline
      />
      <TouchableOpacity style={styles.createButton} onPress={handleCreateGroup}>
        <Text style={styles.buttonText}>Crear Grupo</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  createButton: {
    backgroundColor: '#38C959',
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});
