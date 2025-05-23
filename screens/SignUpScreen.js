import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, ImageBackground,  ActivityIndicator  } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { Ionicons } from '@expo/vector-icons';

export default function SignUpScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignUp = () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    setLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => navigation.replace('Dashboard'))
      .catch((error) => Alert.alert('Sign Up Error', error.message));
  };

  return (
    <ImageBackground source={require('./../assets/background.jpg')} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>Join Us!</Text>
        <TextInput
          placeholder="Email"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          placeholderTextColor="#888"
        />
         <View style={styles.passwordContainer}>
          <TextInput
            placeholder="Password (min 6 characters)"
            style={[styles.input, { flex: 1 }]}
            value={password}
            secureTextEntry={!passwordVisible}
            onChangeText={setPassword}
            placeholderTextColor="#888"
          />
          <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
            <Ionicons
              name={passwordVisible ? 'eye-off' : 'eye'}
              size={24}
              color="#4287f5"
              style={styles.eyeIcon}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleSignUp} disabled={loading}>
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Sign Up</Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
          <Text style={styles.link}>Already have an account? Sign In</Text>
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
  passwordContainer: { flexDirection: 'row', alignItems: 'center', marginVertical: 10 },
  eyeIcon: { marginLeft: 10 },
});
