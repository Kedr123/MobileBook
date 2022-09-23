import React from "react";
import Bookshelf from "./components/Pages/Bookshelf";
import BookInfo from "./components/Pages/BookInfo";
import BookRead from "./components/Pages/BookRead";

import 'react-native-gesture-handler';

import {CardStyleInterpolators, createStackNavigator} from "@react-navigation/stack";
import {NavigationContainer} from "@react-navigation/native";

const Stack = createStackNavigator();

export default function Navigate(){
    return<NavigationContainer>
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                cardStyleInterpolator:CardStyleInterpolators.forHorizontalIOS,
            }}
        >
            <Stack.Screen
                name="Bookshelf"
                component={Bookshelf}
                options={{title: "Книжная полка"}}
            />
            <Stack.Screen
                name="BookInfo"
                component={BookInfo}
                options={{title: "О книге", cardStyleInterpolator:CardStyleInterpolators.forModalPresentationIOS,}}
            />
            <Stack.Screen
                name="BookRead"
                component={BookRead}
            />

        </Stack.Navigator>
    </NavigationContainer>;
}