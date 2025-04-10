import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, ImageBackground } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

export default function SignInScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    signInWithEmailAndPassword(auth, email, password)
      .then(() => navigation.replace('Dashboard'))
      .catch((error) => Alert.alert('Sign In Error', error.message));
  };

  return (
    <ImageBackground source={require('./../assets/background.jpg')} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>Welcome Back!</Text>
        <TextInput
          placeholder="Email"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          placeholderTextColor="#888"
        />
        <TextInput
          placeholder="Password"
          style={styles.input}
          value={password}
          secureTextEntry
          onChangeText={setPassword}
          placeholderTextColor="#888"
        />
        <TouchableOpacity style={styles.button} onPress={handleSignIn}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.link}>Don't have an account? Sign Up</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1, resizeMode: 'cover', justifyContent: 'center' },
  container: { padding: 20, backgroundColor: 'rgba(255,255,255,0.9)', borderRadius: 12, marginHorizontal: 20 },
  title: { fontSize: 30, fontWeight: '700', textAlign: 'center', marginBottom: 20, color: '#333' },
  input: { backgroundColor: '#eef3fd', padding: 15, marginVertical: 10, borderRadius: 10, borderWidth: 1, borderColor: '#4287f5', color: '#333' },
  button: { backgroundColor: '#4287f5', padding: 15, borderRadius: 10, marginTop: 10 },
  buttonText: { color: '#fff', textAlign: 'center', fontWeight: '600', fontSize: 16 },
  link: { color: '#4287f5', marginTop: 15, textAlign: 'center', fontSize: 16 },
});
