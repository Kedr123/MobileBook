import {Animated, Dimensions, SafeAreaView, StyleSheet, Text, View} from 'react-native';

import * as Font from 'expo-font';
import {useEffect, useMemo, useRef, useState} from "react";




import Navigate from "./navigate";

// db.exec([{sql: 'PRAGMA foreign_keys = ON;', args: []}], false, () =>
//     console.log('Foreign keys turned on')
// );

async function loadApplication() {
    await Font.loadAsync({
        'RobotoSlab-Regular': require('./assets/Fonts/RobotoSlab-Regular.ttf'),
        'RobotoSlab-Light': require('./assets/Fonts/RobotoSlab-Light.ttf'),
        'RobotoSlab-SemiBold': require('./assets/Fonts/RobotoSlab-SemiBold.ttf'),

    });
    return true;
}

export default function App() {
    const [fonts, setFonts] = useState(false);


    useEffect(() => {



        const isFonts = async () => {
            const result = await loadApplication();
            setFonts(result);
        }
        isFonts();

    }, []);


    return (
        fonts ?
            <Navigate/>
            :
            <View>
                <Text>Загрузка</Text>
            </View>

    );
}

const styles = StyleSheet.create({});