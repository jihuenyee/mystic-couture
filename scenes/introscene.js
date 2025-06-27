import React from "react";
import { FlatList } from "react-native-gesture-handler";

const styles = StyleSheet.create({

});

const IntroScene = () => {
    const { switchTrack } = useContext(SoundContext);

    useEffect(() => {
        switchTrack('sceneIntro');
    }, []);

    return(
        <FlatList>
            <View>
                {/* character */}
            </View>
            <View>
                {/* text box */}
            </View>
        </FlatList>
    );
};

export default IntroScene;