import React from "react";
import {
    Image,
    Pressable,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text, TouchableHighlight, TouchableHighlightComponent,
    TouchableNativeFeedback,
    TouchableOpacity, TouchableWithoutFeedback,
    View
} from 'react-native';

export default function NavbarBookInfo({navigation}) {
    const back = () => {
        navigation.goBack();
    }

    const bookRead = () => {
        navigation.goBack();
        setTimeout(()=>navigation.push('BookRead'),400);

    }


    return (
        <View style={styles.container}>
            <View style={styles.navbar}>
                <TouchableOpacity onPress={back}>
                    <Image style={styles.icon} source={require('./../assets/Icons/back.png')}/>
                </TouchableOpacity>
                <Text style={styles.text}>О книге</Text>
                <TouchableOpacity onPress={bookRead}>
                    <Image style={styles.icon} source={require('./../assets/Icons/bookRead.png')}/>
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