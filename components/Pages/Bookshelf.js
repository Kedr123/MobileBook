import React, {useEffect, useRef, useState} from "react";
import {Animated, Dimensions, FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import BookItem from "./../BookItem";
import Navbar from "./../Navbar";
import {StatusBar} from "expo-status-bar";
import BDBookServes from "../../BDServes/BDBookServes";
import * as SQLite from "expo-sqlite";
import FileServes from "../../Serves/FileServes";
import FilePickerManager from "react-native-file-picker";

const db = SQLite.openDatabase('MobileBook1.db', '', '', '', (tx) => {
    console.log("db connect true")
});


export default function Bookshelf({navigation}) {

    const [books, setBooks] = useState([]);

    const [isMenu, setIsMenu] = useState(true);
    const [isConfig, setIsConfig] = useState(false);
    const window = Dimensions.get('window').width;
    const fadeAnim = useRef(new Animated.Value(0)).current
    const configPosition = useRef(new Animated.Value(0)).current
    const toBookInfo = (book) => {
        console.log(book)
        navigation.push('BookInfo',book);
    }

    useEffect(() => {
        BDBookServes.createTable(db);
        BDBookServes.getBooks(db, setBooks);
    }, [])

    useEffect(() => {

        Animated.timing(
            fadeAnim,
            {
                toValue: isMenu ? 0 : window * 0.7,
                duration: 250,
                useNativeDriver: true
            }
        ).start();

    }, [isMenu]);

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

    let getMenuFiles = () => {
        FileServes.getMenuFile(setBooks)
    }

    return (
        <View style={{...styles.conteiner1}}>

            <Animated.View
                onTouchStart={e => this.touchStart = e.nativeEvent.pageX}
                onTouchEnd={e => {
                    if (this.touchStart - e.nativeEvent.pageX > 20)
                        setIsMenu(true);
                }}
                style={{...styles.container, transform: ([{translateX: fadeAnim}])}}>
                <View style={styles.content}>

                    <Navbar setMenu={setIsMenu} menu={isMenu} setConfig={setIsConfig} config={isConfig}/>

                    <View style={styles.page}>
                        <View style={styles.bookshelf}>
                            <FlatList style={styles.items} keyExtractor={book => book.id} data={books}
                                      renderItem={({item}) => (
                                          <TouchableOpacity onPress={()=>toBookInfo(item)}>
                                              <BookItem title={item.title} author={item.author} type={item.type}
                                                        pages={item.pages} bookmark={item.bookmark} url={item.url}/>
                                          </TouchableOpacity>
                                      )}/>
                        </View>
                    </View>

                    <Animated.View
                        onTouchStart={e => this.touchStart = e.nativeEvent.pageX}
                        onTouchEnd={e => {
                            if (this.touchStart - e.nativeEvent.pageX < -20)
                                setIsConfig(false);
                        }}
                        style={{...styles.config, transform: ([{translateX: configPosition}])}}>
                        <TouchableOpacity onPress={getMenuFiles}>
                            <Text style={styles.configText}>Добавить книгу</Text>
                        </TouchableOpacity>
                    </Animated.View>

                    <StatusBar style="auto"/>
                </View>

                <View style={{...styles.menu, width: window * 0.7}}>

                </View>


            </Animated.View>
        </View>

    );
}

const styles = StyleSheet.create({
    bookshelf: {
        // flex: 1,
        // backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',

    },
    items: {
        flexGrow: 1,
        paddingHorizontal: 2 + '%',
        // paddingVertical: 1+'%',
        // paddingBottom:200
    },
    conteiner1: {
        flexGrow: 1,
        backgroundColor: '#fffff0',
    },
    container: {
        flexGrow: 2,
        backgroundColor: '#fffff0',
        flexDirection: 'row-reverse'

    },
    content: {
        width: 100 + '%',
    },
    statusBar: {
        color: '#000'
    },
    page: {
        flex: 2
    }
    ,
    menu: {
        height: 100 + '%',
        // width: 80 + '%',
        backgroundColor: '#E9EEE0',

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