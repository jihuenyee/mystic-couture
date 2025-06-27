import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StatusBar, StyleSheet, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
    inputContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent background for inputs
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
        marginBottom: 20
    }
});

const LoginScreen = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
    const hasLoggedIn = await AsyncStorage.getItem('hasLoggedInBefore');

    if (!hasLoggedIn) {
        // First login
        await AsyncStorage.setItem('hasLoggedInBefore', 'true');
        navigation.navigate('introscene');
    } else {
        // Not first time
        navigation.navigate('home');
    }
    };

    return (
        <ImageBackground
            source={{ uri:"https://i.pinimg.com/736x/f4/fe/0b/f4fe0b323b9e4d193be3d88f46994b37.jpg" }}
            style={styles.background}
        >
            <View style={styles.container}>
                <StatusBar />
                <Text style={styles.headerText}>Login</Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder='Username'
                        onChangeText={setUsername}
                        placeholderTextColor="#888"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder='Password'
                        secureTextEntry
                        onChangeText={setPassword}
                        placeholderTextColor="#888"
                    />
                    <TouchableOpacity style={styles.button} onPress={handleLogin}>
                        <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('signup')}>
                        <Text style={styles.signUpText}>Don't have an account? Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    );
};

export default LoginScreen;