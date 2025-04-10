import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, StyleSheet, ActivityIndicator } from 'react-native';
import { collection, query, where, onSnapshot, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import EventCard from '../components/EventCard';

export default function FavouritesScreen({ navigation }) {
  const [favouriteEvents, setFavouriteEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFavouriteEvents = () => {
    const q = query(
      collection(db, 'events'),
      where('userId', '==', auth.currentUser.uid),
      where('isFavourite', '==', true)
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let eventsArray = [];
      querySnapshot.forEach((docSnap) => {
        eventsArray.push({ id: docSnap.id, ...docSnap.data() });
      });
      setFavouriteEvents(eventsArray);
      setLoading(false);
    });
    return unsubscribe;
  };

  useEffect(() => {
    const unsubscribe = fetchFavouriteEvents();
    return () => unsubscribe();
  }, []);

  const handleDelete = (eventId) => {
    Alert.alert('Confirm Delete', 'Are you sure you want to remove this event from favourites?', [
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

  const toggleFavourite = async (item) => {
    try {
      await updateDoc(doc(db, 'events', item.id), { isFavourite: !item.isFavourite });
    } catch (error) {
      Alert.alert('Error', error.message);
    }
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
      <View style={styles.toolbar}>
        <Text style={styles.toolbarTitle}>Favourites</Text>
      </View>
      <FlatList
        data={favouriteEvents}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <EventCard
            event={item}
            onEdit={() => navigation.navigate('EditEvent', { event: item })}
            onDelete={() => handleDelete(item.id)}
            onFavouriteToggle={() => toggleFavourite(item)}
          />
        )}
        ListEmptyComponent={<Text style={styles.noEventText}>No favourite events. Mark some as favourite!</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#eef3fd', padding: 10 },
  toolbar: { paddingVertical: 10, backgroundColor: '#4287f5', borderRadius: 8, marginBottom: 10, paddingHorizontal: 10 },
  toolbarTitle: { fontSize: 22, color: '#fff', fontWeight: 'bold' },
  noEventText: { textAlign: 'center', marginVertical: 20, color: '#555' },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
