import React from "react";
import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';

export default function ProgressRead({pages,bookmark}) {

    const progressReadStyleWidth = () => {
      return bookmark/pages*100
    }

    const progressReadStyleBookmark = () => {
        if(bookmark/pages*100<4)
            return 4
        return bookmark/pages*100
    }
    
    const offsetBookmarkText = () => {
        let len = progressReadStyleBookmark();
        let page = bookmark.toString().length;
        if(page%2!=0){
            len-=3.3*(page+1)/2;
            if(len>=85){
                return 101-3.3*page;
            }
        }
        else{
            len-=(3.3*(page)/2)+2;
            if(len>=85){
                return 101-3.3*page;
            }
        }
        return len;
    }

    return (
        <View style={styles.container}>
            <View style={{...styles.line, ...styles.mar}}/>
            <View style={{...styles.progress,width:progressReadStyleWidth()+'%', ...styles.mar}}/>
            <View style={{...styles.start, ...styles.mar}}/>
            <View style={{...styles.end, ...styles.mar}}/>
            <View style={{...styles.bookmark,left:progressReadStyleBookmark()-4+'%'}}/>
            <Text style={{...styles.startText,...styles.text}}>0</Text>
            <Text style={{...styles.endText,...styles.text}}>{pages}</Text>
            <Text style={{...styles.bookmarkText, left:offsetBookmarkText()+'%',...styles.text}}>{bookmark}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    mar:{
        top:15+'%',
    },
    container:{
        width:100+'%',
        position: "relative",
        height:100+'%',

    },
    line:{
        position:'absolute',
        width:100+'%',
        height:5+'%',
        borderRadius:5,
        backgroundColor:'#D9D9D9',
    },
    start:{
        position:'absolute',
        width:4+'%',
        height:5+'%',
        borderBottomLeftRadius:5,
        borderTopLeftRadius:5,
        backgroundColor:'#C3A4A4',
    },
    progress:{
        position:'absolute',
        height:5+'%',
        borderRadius:5,
        backgroundColor:'#B0B3AB',
    },
    end:{
        position:'absolute',
        left:96+'%',
        width:4+'%',
        height:5+'%',
        borderBottomRightRadius:5,
        borderTopRightRadius:5,
        backgroundColor:'#ACC3A4',
    },
    bookmark:{
        position:'absolute',
        height:11+'%',
        width:4+'%',
        borderRadius:5,
        backgroundColor:'#F4F9BD',
        top:12+'%',

    },
    startText:{
        position:"absolute",
    },
    endText:{
        position:"absolute",
        right:0
    },
    bookmarkText:{
        position:"absolute",
        // textAlign:'center',
        top:22+'%',

    },
    text:{
        fontFamily: 'RobotoSlab-Regular',
        fontSize: 12,
        color: '#C4C4C4',
    },
});