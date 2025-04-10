// screens/CreateEventScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, ScrollView } from 'react-native';
import { collection, addDoc } from 'firebase/firestore';
import { db, auth } from '../firebase';

export default function CreateEventScreen({ navigation }) {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');

  const handleCreateEvent = async () => {
    if (!title || !date || !description) {
      Alert.alert('Error', 'All fields are required');
      return;
    }
    try {
      await addDoc(collection(db, 'events'), {
        title,
        date,
        description,
        userId: auth.currentUser.uid,
        isFavourite: false
      });
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Create New Event</Text>
      <TextInput placeholder="Event Title" style={styles.input} value={title} onChangeText={setTitle} />
      <TextInput placeholder="Event Date (YYYY-MM-DD)" style={styles.input} value={date} onChangeText={setDate} />
      <TextInput placeholder="Description" style={[styles.input, { height: 100 }]} multiline value={description} onChangeText={setDescription} />
      <TouchableOpacity style={styles.button} onPress={handleCreateEvent}>
        <Text style={styles.buttonText}>Create Event</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, justifyContent: 'center', padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 20, textAlign: 'center', color: '#333' },
  input: { backgroundColor: '#eef3fd', padding: 15, marginVertical: 10, borderRadius: 10, borderWidth: 1, borderColor: '#4287f5' },
  button: { backgroundColor: '#4287f5', padding: 15, borderRadius: 10, marginTop: 10 },
  buttonText: { color: '#fff', textAlign: 'center', fontWeight: '600', fontSize: 16 },
});
