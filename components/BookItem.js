import React from "react";
import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import ProgressRead from "./ProgressRead";
import cover from './../assets/Icons/default_blak.png'

export default function BookItem({id, title, author, type, pages, bookmark, url}) {
    return (
        <View style={styles.container}>
            {url=='null'?
                <Image style={{width: 102, height: 145}} source={cover}/>
                :
                <Image style={{width: 102, height: 145}} source={{
                    uri: url,
                    // cache: 'only-if-cached'
                }}/>
            }
            <View style={styles.bookInform}>
                <Text numberOfLines={2} style={styles.title}>{title}</Text>
                <Text style={styles.author}>Автор: {author}</Text>
                <View style={{
                    backgroundColor: '#FFC690',
                    alignSelf: 'flex-start',
                    padding: 6,
                    borderRadius: 5,
                    marginTop: 3 + '%',
                }}>
                    <Text style={styles.type}>{type}</Text>
                </View>
                <View style={{marginTop: 2 + '%',}}>
                    <ProgressRead pages={pages} bookmark={bookmark}/>
                </View>

            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        // width:100+'%',
        padding: 10,
        flex: 1,
        // backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#FFFFF0',
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#B0B3AB',
        // shadowColor: 'rgba(0, 0, 0, 0.25)',
        borderRadius: 5,
        // shadowOpacity: 5
        // shadowOffset: {width: 0, height: 4},
        marginTop: 3 + '%',
        color: '#C4C4C4',

        // width:90+""
// boxShadow: 0px 3px 6px 1px ;
//         elevation: 3,
    },
    title: {
        fontFamily: 'RobotoSlab-Regular',
        fontSize: 16,
        color: '#C4C4C4',
        height: 30+'%',

        // overflow: 'ellipsis'
    },
    author: {
        fontFamily: 'RobotoSlab-Light',
        fontSize: 12,
        marginTop: 2 + '%',
        color: '#C4C4C4',
    },
    type: {
        fontFamily: 'RobotoSlab-SemiBold',
        fontSize: 10,
        color: '#fff',
        // marginTop:2+'%',

    },
    text: {},
    bookInform: {
        justifyContent: 'space-between',
        flexDirection: 'column',
        // flexWrap:"wrap",
        height: 100 + '%',
        width: 66 + '%',
        marginLeft: 2 + '%'


    },
});