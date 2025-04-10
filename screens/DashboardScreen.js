// screens/DashboardScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, StyleSheet, ActivityIndicator } from 'react-native';
import { signOut } from 'firebase/auth';
import { collection, query, where, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import EventCard from '../components/EventCard';

export default function DashboardScreen({ navigation }) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEvents = () => {
    // Query events created by current user
    const q = query(collection(db, 'events'), where('userId', '==', auth.currentUser.uid));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let eventsArray = [];
      querySnapshot.forEach((docSnap) => {
        eventsArray.push({ id: docSnap.id, ...docSnap.data() });
      });
      setEvents(eventsArray);
      setLoading(false);
    });
    return unsubscribe;
  };

  useEffect(() => {
    const unsubscribe = fetchEvents();
    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    signOut(auth)
      .then(() => navigation.replace('SignIn'))
      .catch((error) => Alert.alert('Error', error.message));
  };

  const handleDelete = (eventId) => {
    Alert.alert('Confirm Delete', 'Are you sure you want to delete this event?', [
      { text: 'Cancel' },
      { text: 'Delete', onPress: async () => {
          try {
            await deleteDoc(doc(db, 'events', eventId));
          } catch (error) {
            Alert.alert('Error', error.message);
          }
        }
      }
    ]);
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#4287f5" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Dashboard</Text>
        <TouchableOpacity onPress={handleLogout}>
          <Text style={styles.logout}>Logout</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={events}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <EventCard
            event={item}
            onEdit={() => navigation.navigate('EditEvent', { event: item })}
            onDelete={() => handleDelete(item.id)}
          />
        )}
        ListEmptyComponent={
          <Text style={styles.noEventText}>No events available. Create a new event!</Text>
        }
      />
      <TouchableOpacity style={styles.createButton} onPress={() => navigation.navigate('CreateEvent')}>
        <Text style={styles.createButtonText}>+ Create Event</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5', padding: 10 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  headerTitle: { fontSize: 24, fontWeight: 'bold' },
  logout: { color: '#4287f5', fontWeight: '600' },
  noEventText: { textAlign: 'center', marginVertical: 20, color: '#555' },
  createButton: { backgroundColor: '#4287f5', padding: 15, borderRadius: 5, alignItems: 'center', marginTop: 10 },
  createButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
