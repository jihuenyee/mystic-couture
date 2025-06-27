import React, { createContext, useEffect, useRef, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Audio } from 'expo-av';

export const SoundContext = createContext();

export const SoundProvider = ({ children }) => {
  const [isMuted, setIsMuted] = useState(false);
  const soundRef = useRef(new Audio.Sound());

  const trackList = {
    default: require('../assets/bgm.mp3'),
    sceneIntro: require('../assets/music/scene-intro.mp3'),
    chapter1: require('../assets/music/chapter1.mp3'),
    chapter2: require('../assets/music/chapter2.mp3'),
    chapter3: require('../assets/music/chapter3.mp3'),
  };

  // Load default music on app start
  useEffect(() => {
    const loadInitialSound = async () => {
      try {
        const storedMute = await AsyncStorage.getItem('mute');
        const muted = storedMute === 'true';

        setIsMuted(muted);

        await soundRef.current.loadAsync(trackList.default);
        await soundRef.current.setIsLoopingAsync(true);
        await soundRef.current.setIsMutedAsync(muted);
        await soundRef.current.playAsync();
      } catch (error) {
        console.error('Error loading initial sound:', error);
      }
    };

    loadInitialSound();

    return () => {
      soundRef.current.unloadAsync();
    };
  }, []);

  // Mute / unmute the BGM
  const toggleMute = async () => {
    try {
      const newMute = !isMuted;
      setIsMuted(newMute);
      await soundRef.current.setIsMutedAsync(newMute);
      await AsyncStorage.setItem('mute', newMute.toString());
    } catch (error) {
      console.error('Error toggling mute:', error);
    }
  };

  // Switch background track based on scene/chapter
  const switchTrack = async (trackName = 'default') => {
    try {
      if (!trackList[trackName]) {
        console.warn(`Track "${trackName}" not found.`);
        return;
      }

      await soundRef.current.stopAsync();
      await soundRef.current.unloadAsync();

      await soundRef.current.loadAsync(trackList[trackName]);
      await soundRef.current.setIsLoopingAsync(true);
      await soundRef.current.setIsMutedAsync(isMuted);
      await soundRef.current.playAsync();
    } catch (error) {
      console.error('Error switching track:', error);
    }
  };

  return (
    <SoundContext.Provider value={{ isMuted, toggleMute, switchTrack }}>
      {children}
    </SoundContext.Provider>
  );
};
