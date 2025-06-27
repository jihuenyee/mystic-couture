import React, { useContext } from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';
import { SoundContext } from '../context/SoundProvider';

export default function MuteButton() {
  const { isMuted, toggleMute } = useContext(SoundContext);

  return (
    <TouchableOpacity onPress={toggleMute} style={styles.button}>
      <Image
        source={
          isMuted
            ? require('../assets/sound-off.png')
            : require('../assets/sound-on.png')
        }
        style={styles.icon}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 100,
  },
  icon: {
    width: 32,
    height: 32,
  },
});
