import React, {useEffect, useRef} from "react"
import {Image, StatusBar, StyleSheet, Text, TouchableOpacity, View} from "react-native";

export default function BookHeader({navigation, nameBook, setConfig, config}) {
    const back = () => {
        navigation.goBack();
    }

    const isConfig = () => {
        setConfig(!config);
    }

    return (
        <View style={styles.container}>
            <View style={styles.navbar}>
                <TouchableOpacity onPress={back}>
                    <Image style={styles.icon} source={require('./../assets/Icons/back.png')}/>
                </TouchableOpacity>
                <Text style={styles.text}>{nameBook}</Text>
                <TouchableOpacity onPress={isConfig}>
                    <Image style={styles.icon} source={require('./../assets/Icons/configuration.png')}/>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {

        // flex: 1,
        // height: 10 + '%',
        // paddingTop: StatusBar.currentHeight,
        width: 100 + '%',
        backgroundColor: '#E9EEE0',
        alignItems: 'center',
        justifyContent: 'center',
        // elevation:10,
        // paddingTop: StatusBar.currentHeight,
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