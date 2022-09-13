import React, {useEffect, useRef} from "react";
import {
    Image,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import {Animated} from "react-native";

export default function Navbar({setMenu, menu, setConfig, config}) {

    const setings = () => {
        setMenu(!menu);
    }

    const isConfig = () => {
        setConfig(!config);
    }



    return (
        <View style={styles.container}>
            <View style={styles.navbar}>
                <TouchableOpacity onPress={setings}>
                    <Image style={styles.icon} source={require('./../assets/Icons/Menu.png')}/>
                </TouchableOpacity>
                <Text style={styles.text}>Книжная полка</Text>
                <TouchableOpacity onPress={isConfig}>
                    <Animated.Image style={{...styles.icon}} source={require('./../assets/Icons/configuration.png')}/>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {

        // flex: 1,
        // height: 10 + '%',
        paddingTop: StatusBar.currentHeight,
        width: 100 + '%',
        backgroundColor: '#E9EEE0',
        alignItems: 'center',
        justifyContent: 'center',
        elevation:10
    },
    text: {
        fontFamily: 'RobotoSlab-Regular',
        fontSize: 24,
        color: '#C4C4C4',
        fontStyle: 'normal',
        fontWeight: "400",
        textAlign: "center",

    },
    navbar: {
        width: 100 + '%',
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection: 'row',
        marginVertical: 13
    },
    icon: {
        width: 30,
        height: 30
    }
});