import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function EventCard({ event, onEdit, onDelete, onFavouriteToggle }) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.eventTitle}>{event.title}</Text>
        <TouchableOpacity onPress={onFavouriteToggle}>
          <Text style={[styles.favouriteIcon, { color: event.isFavourite ? '#f5a623' : '#888' }]}>
            {event.isFavourite ? '❤️' : '🤍'}
          </Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.eventDate}>{event.date}</Text>
      <Text style={styles.eventDescription}>{event.description}</Text>
      <View style={styles.actionContainer}>
        <TouchableOpacity style={styles.actionButton} onPress={onEdit}>
          <Text style={styles.actionText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={onDelete}>
          <Text style={[styles.actionText, { color: '#d11a2a' }]}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { 
    backgroundColor: '#fff', 
    padding: 15, 
    marginVertical: 8, 
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2
  },
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center'
  },
  eventTitle: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    color: '#333' 
  },
  favouriteIcon: { 
    fontSize: 20 
  },
  eventDate: { 
    color: '#4287f5', 
    marginTop: 5, 
    fontWeight: '600' 
  },
  eventDescription: { 
    marginTop: 10, 
    fontSize: 14, 
    color: '#555'
  },
  actionContainer: { 
    flexDirection: 'row', 
    justifyContent: 'space-around', 
    marginTop: 15 
  },
  actionButton: { 
    paddingVertical: 6, 
    paddingHorizontal: 12, 
    borderRadius: 6, 
    backgroundColor: '#eef3fd' 
  },
  actionText: { 
    fontWeight: '600', 
    color: '#4287f5' 
  },
});
