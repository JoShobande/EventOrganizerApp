import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import DashboardTabs from './DashboardTabs';
import CreateEventScreen from '../screens/CreateEventScreen';
import EditEventScreen from '../screens/EditEventScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SignIn">
        <Stack.Screen name="SignIn" component={SignInScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }} />
        <Stack.Screen
          name="Dashboard"
          component={DashboardTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CreateEvent"
          component={CreateEventScreen}
          options={{
            title: 'Create New Event',
            headerStyle: { backgroundColor: '#4287f5' },
            headerTintColor: '#fff'
          }}
        />
        <Stack.Screen
          name="EditEvent"
          component={EditEventScreen}
          options={{
            title: 'Edit Event',
            headerStyle: { backgroundColor: '#4287f5' },
            headerTintColor: '#fff'
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
