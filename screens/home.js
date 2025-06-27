import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Video } from 'expo-av';
import { ScrollView } from "react-native-gesture-handler";
import { SoundContext } from '../context/SoundProvider';
import MuteButton from "../components/MuteButton";

const styles = StyleSheet.create({
    container: { 
        flex: 1,
    },
});

const HomeScreen = () => {
    const { switchTrack } = useContext(SoundContext);

    useEffect(() => {
        switchTrack('bgm');
    }, []);
    
    return(
        <ScrollView style={styles.container}>
            <Video 
                source={require("")} // background video in asset folder
                style={StyleSheet.absoluteFill}
                resizeMode="cover"
                isLooping
                shouldPlay
            />
            <MuteButton />
            {/* put the chapters */}
            <TouchableOpacity>
                <Image source={
                    require('../assets/chapter1.png')
                }/>
            </TouchableOpacity>
            <TouchableOpacity>
                <Image source={
                    require('../assets/chapter2.png')
                }/>
            </TouchableOpacity>
            <TouchableOpacity>
                <Image source={
                    require('../assets/chapter3.png')
                }/>
            </TouchableOpacity>
        </ScrollView>
    )
};

export default HomeScreen;