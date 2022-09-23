import React from "react";
import {Image, StyleSheet, View} from "react-native";
import loader from './../assets/loader.gif'
// import loader from './../assets/Icons/Menu.png'

export default function Loader(){


    return(
        <View style={styles.container}>
            <Image style={styles.icon} source={loader}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
    },
    icon:{
        width:200,
        height:200
    }
});