import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StatusBar, StyleSheet, ImageBackground } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
    inputContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.8)', 
        borderRadius: 10,
        padding: 20,
        width: '80%',
        alignItems: 'center'
    },
    input: {
        borderWidth: 1,
        marginVertical: 10,
        padding: 10,
        width: '100%',
        borderRadius: 5,
        backgroundColor: '#fff'
    },
    button: {
        backgroundColor: '#FF0080',
        padding: 15,
        borderRadius: 5,
        width: '100%',
        alignItems: 'center'
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold'
    },
    signUpText: {
        marginTop: 10,
        color: '#FF0080',
        fontWeight: 'bold'
    },
    background: {
        flex: 1,
        width: '100%',
        height: '100%'
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FF0080',
        marginBottom: 20,
        textAlign: 'center' 
    }
});

const SignUp = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const handleSignup = () => {
        // New user data
        const newUser = { username, email, phone };

        // Fetch current users from API
        fetch('https://2ff0bc7fceb045899bd8916bdb04d9e6.api.mockbin.io/')
            .then(response => response.json())
            .then(data => {
                const updatedUsers = [...data.users, newUser]; // Append new user

                // Send updated users list back to API
                return fetch('https://2ff0bc7fceb045899bd8916bdb04d9e6.api.mockbin.io/', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ users: updatedUsers })
                });
            })
            .then(() => {
                Alert.alert('Success', 'Account created successfully!');
                navigation.navigate('LoginScreen');
            })
            .catch(error => console.error('Error:', error));
    };

    return (
        <ImageBackground
            source={{ uri: 'https://i.pinimg.com/736x/15/04/9a/15049a7345de21baeee47ef82f23cbb6.jpg' }}  // Path to your image file
            style={styles.background}
        >
            <View style={styles.container}>
                <StatusBar />
                <Text style={styles.headerText}>Registration</Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder='Username'
                        onChangeText={setUsername}
                        placeholderTextColor="#888"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder='Email'
                        onChangeText={setEmail}
                        keyboardType='email-address'
                        placeholderTextColor="#888"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder='Phone Number'
                        onChangeText={setPhone}
                        keyboardType='phone-pad'
                        placeholderTextColor="#888"
                    />
                    <TouchableOpacity style={styles.button} onPress={()=> {handleSignup(); navigation.navigate('login');}}>
                        <Text style={styles.buttonText}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    );
};

export default SignUp;