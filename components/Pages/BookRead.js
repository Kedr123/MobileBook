import React, {useEffect, useRef, useState} from "react";
import {
    Animated,
    Dimensions,
    FlatList,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import PagerView from "react-native-pager-view";
import {Touchable} from "react-native-web";
import BookHeader from "../BookHeader";
import ProgressRead from "../ProgressRead";
import Window from "@react-navigation/native/src/__mocks__/window";
import BookFooter from "../BookFooter";




export default function BookRead({route, navigation}) {

    const [isHeader, setIsHeader]= useState(true)

    const [isConfig, setIsConfig] = useState(false);
    const configPosition = useRef(new Animated.Value(0)).current
    // const book = () => {
    //     return <Epub
    //                 />
    // }
    useEffect(() => {

        Animated.timing(
            configPosition,
            {
                toValue: isConfig ? 0 : 200,
                duration: 250,
                useNativeDriver: true
            }
        ).start();

    }, [isConfig]);

    let con = "First page1 sdfssd khjkhk jkhkjhkjhkjh jkhkjhjkh hjkhkj hjkjj dasda dasdas das dasadssda sdfssdfdsfds fsdfdsf sfdsfdssf sdfsdfs fdsdfsfds fdsfsd fsdfsd fsdfs fsdfsf sdfsfsdfs dfsadf asfsad fassasda asdasda dasda dasdas das dasadssda sdfssdfdsfds fsdfdsf sfdsfdssf sdfsdfs fdsdfsfds fdsfsd fsdfsd fsdfs fsdfsf sdfsfsdfs dfsadf asfsad fassasda asdasda dasda dasdas das dasadssda sdfssdfdsfds fsdfdsf sfdsfdssf sdfsdfs fdsdfsfds fdsfsd fsdfsd fsdfs fsdfsf sdfsfsdfs dfsadf asfsad fassasda asdasda dasda dasdas das dasadssda sdfssdfdsfds fsdfdsf sfdsfdssf sdfsdfs fdsdfsfds fdsfsd fsdfsd fsdfs fsdfsf sdfsfsdfs dfsadf asfsad fassasda asdasda dasda dasdas das dasadssda sdfssdfdsfds fsdfdsf sfdsfdssf sdfsdfs fdsdfsfds fdsfsd fsdfsd fsdfs fsdfsf sdfsfsdfs dfsadf asfsad fassasda asdasda dasda dasdas das dasadssda sdfssdfdsfds fsdfdsf sfdsfdssf sdfsdfs fdsdfsfds fdsfsd fsdfsd fsdfs fsdfsf sdfsfsdfs dfsadf asfsad fassasda asdasda dasda dasdas das dasadssda sdfssdfdsfds fsdfdsf sfdsfdssf sdfsdfs fdsdfsfds fdsfsd fsdfsd fsdfs fsdfsf sdfsfsdfs dfsadf asfsad fassasda asdasda dasda dasdas das dasadssda sdfs"
    con = con.length

    function find_dimesions(layout){
        const {x, y, width, height} = layout;
        console.log(x);
        console.log(y);
        console.log(width);
        console.log(height);
    }

    function isMenu () {
        setIsConfig(false)
        setIsHeader(!isHeader)

        console.log(isHeader)
    }

    return (

        <View style={{...styles.container}} >



            <PagerView style={styles.pagerView} onLayout={(event) => { find_dimesions(event.nativeEvent.layout) }} initialPage={3}>
                <TouchableOpacity onPress={isMenu}>
                <View  style={styles.vue}  key="1">
                    <Text  style={styles.text}>1234567890123456789012345678901234</Text>
                    <ProgressRead pages={13} bookmark={25}/>
                </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={isMenu}>
                    <View  style={styles.vue}  key="2">
                        <Text  style={styles.text}>jijkljlkjlk jkljlkj</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={isMenu}>
                    <View  style={styles.vue}  key="3">
                        <Text  style={styles.text}>Привет мир!</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={isMenu}>
                    <View  style={styles.vue}  key="4">
                        <Text  style={styles.text}>1234567890123456789012345678901234</Text>
                    </View>
                </TouchableOpacity>

            </PagerView>

            <View  style={isHeader?styles.header:styles.headerNon}><BookHeader setConfig={setIsConfig} config={isConfig} navigation={navigation} nameBook="Название"/></View>
            <View  style={isHeader?styles.footer:styles.footerNon}><BookFooter  bookmark={5450} countPage={16000}/></View>

            <Animated.View
                onTouchStart={e => this.touchStart = e.nativeEvent.pageX}
                onTouchEnd={e => {
                    if (this.touchStart - e.nativeEvent.pageX < -20)
                        setIsConfig(false);
                }}
                style={{...styles.config, transform: ([{translateX: configPosition}])}}>
                <TouchableOpacity>
                    <Text style={styles.configText}>Добавить книгу</Text>
                </TouchableOpacity>
            </Animated.View>

        </View>

    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,

    },
    pagerView: {
        flex: 1,
        flexGrow:1,
        backgroundColor: '#fffff0',
        justifyContent:'center',
        alignItems:'center',

    },
    vue:{
        // justifyContent:'center',
        // alignItems:'center',
        paddingTop: StatusBar.currentHeight,
    },
    text:{
        // marginTop: 15,
        marginBottom: 10,
        marginLeft: 10,
        marginRight: 15,
        fontFamily:'RobotoSlab-Regular',
        fontSize:20,
        textAlign:"justify",
    },
    header:{
        position:"absolute",
        backgroundColor:'#E9EEE0',
        width:100+"%",
        opacity:1,
        paddingTop: StatusBar.currentHeight,
    },
    headerNon:{
        position:"absolute",
        backgroundColor:'#E9EEE0',
        width:100+"%",
        opacity:0,
        paddingTop: StatusBar.currentHeight,
    },
    footer:{
        paddingHorizontal:2+"%",
        position:"absolute",
        backgroundColor:'#E9EEE0',
        width:100+"%",
        opacity:1,
        // paddingTop: StatusBar.currentHeight,
        bottom:-70
    },
    footerNon:{
        paddingHorizontal:2+"%",
        position:"absolute",
        backgroundColor:'#E9EEE0',
        width:100+"%",
        opacity:0,
        // paddingTop: StatusBar.currentHeight,
        // bottom:0
    },
    config: {

        paddingVertical: 5 + '%',
        alignItems: 'center',


        position: 'absolute',
        right: 2 + '%',
        top: 12 + '%',
        width: 50 + '%',
        height: 200,
        borderRadius: 7,
        backgroundColor: '#E9EEE0'
    },
    configText: {
        fontFamily: 'RobotoSlab-Light',
        fontSize: 14,
        color: '#B0B3AB',
    }
});