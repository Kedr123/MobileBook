import React, {useState} from "react";
import {FlatList, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import BookItem from "../BookItem";
import NavbarBookInfo from "../NavbarBookInfo";
import BDBookServes from "../../BDServes/BDBookServes";
import cover from './../../assets/Icons/default_blak.png'

export default function BookInfo({route, navigation}) {
    // const [bookInfo, setBookInfo] = useState(route.params.book)
    console.log(route.params)
    const bookInfo = route.params
    return (
        <View style={styles.container}>
            <NavbarBookInfo navigation={navigation}/>
            <ScrollView style={styles.page}>

                <Text style={styles.title}>
                    {bookInfo.title}
                </Text>

                {/*<Image*/}
                {/*    style={styles.img}*/}
                {/*    source={{*/}
                {/*        uri: bookInfo.url,*/}
                {/*    }}/>*/}

                {bookInfo.url=='null'?
                    <Image style={styles.img} source={cover}/>
                    :
                    <Image style={styles.img} source={{
                        uri: bookInfo.url,
                        // cache: 'only-if-cached'
                    }}/>
                }

                <View>
                    <View style={styles.infoBlock}>
                        <Text style={styles.titleInfo}>Автор: </Text>
                        <Text style={styles.infoText}>{bookInfo.author}</Text>
                    </View>

                    <View style={styles.infoBlock}>
                        <Text style={styles.titleInfo}>Закладка: </Text>
                        <Text style={styles.infoText}>{bookInfo.bookmark}</Text>
                    </View>

                    <View style={styles.infoBlock}>
                        <Text style={styles.titleInfo}>Файл: </Text>
                        <Text style={styles.infoText}>{bookInfo.fileName}</Text>
                    </View>

                    <View style={styles.endBlock}>
                        <Text style={styles.titleInfo}>Путь к файлу: </Text>
                        <Text style={styles.infoText}>{bookInfo.filePath}</Text>
                    </View>

                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fffff0',
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection:'column',

    },
    page: {
        flex: 1,
        paddingHorizontal: 7 + '%',
        // paddingVertical: 1+'%',
        // paddingBottom:200
    },
    title: {
        marginTop:5+'%',
        fontFamily: 'RobotoSlab-Regular',
        fontSize: 32,
        color: '#C4C4C4',
        fontStyle: 'normal',
        fontWeight: "400",
        textAlign: "justify",
    },
    bookInfo: {},
    img:{
        flex: 1,
        width: 'auto',
        height: 500,
        resizeMode: 'contain'
    },
    titleInfo:{
        fontFamily: 'RobotoSlab-Regular',
        color: '#C4C4C4',
        fontSize: 20,
    },
    infoBlock:{
        marginBottom:15,
        flexDirection:'row',
        alignItems:'center'
    },
    infoText:{
        borderRadius:5,
        paddingHorizontal:5,
        fontFamily: 'RobotoSlab-Regular',
        color: '#FFFFFF',
        backgroundColor:'#C4C4C4',
        fontSize: 20,
    },
    endBlock:{
        marginBottom:30
    }




});