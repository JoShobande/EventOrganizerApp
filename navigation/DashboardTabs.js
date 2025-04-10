import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AllEventsScreen from '../screens/AllEventsScreen';
import FavouritesScreen from '../screens/FavouritesScreen';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function DashboardTabs() {
  return (
    <Tab.Navigator 
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Events') {
            iconName = focused ? 'calendar' : 'calendar-outline';
          } else if (route.name === 'Favourites') {
            iconName = focused ? 'heart' : 'heart-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        headerStyle: { backgroundColor: '#4287f5' },
        headerTintColor: '#fff',
      })}
    >
      <Tab.Screen name="Events" component={AllEventsScreen} options={{ title: 'All Events' }} />
      <Tab.Screen name="Favourites" component={FavouritesScreen} options={{ title: 'Favourites' }} />
    </Tab.Navigator>
  );
}
