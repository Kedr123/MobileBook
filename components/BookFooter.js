import React, {useEffect, useRef} from "react"
import {Image, StatusBar, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import ProgressRead from "./ProgressRead";

export default function BookFooter({bookmark, countPage}) {

    return (
        <View style={styles.container}>
            <View style={styles.prog}>
                <ProgressRead pages={countPage} bookmark={bookmark}/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        // flex:1,
        // position:"relative",

        width: 100 + '%',
        height: 150,
        backgroundColor: '#E9EEE0',
        // alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal:3+'%',
        paddingBottom: -200,
        // top:45
        // paddingTop:5+'%'
    },
    prog:{
        flex:1,
        paddingTop:5+'%'
        // width:100+'%',

    }
});