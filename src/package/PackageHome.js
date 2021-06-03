import React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from "@react-navigation/stack";
import Icon from "react-native-vector-icons/Ionicons";
import axios from 'axios';
import { axios_config, url } from '../Config';
import PackageNotReceived from './PackageNotReceived';
import PackageReceived from './PackageReceived';





    const Stack = createStackNavigator();
    const Tab = createMaterialTopTabNavigator();

    function PackageNotReceivedScreen({route}) {

        return (
            <Stack.Navigator>
                <Stack.Screen name="PackageNotReceived" component={PackageNotReceived} options={{ headerMode: 'none', headerShown: false }} initialParams={{ Package3ID: route.params.PackageID }}/>
            </Stack.Navigator>
        );
    }

    function PackageReceivedScreen({route}) {
        return (
            <Stack.Navigator>
                <Stack.Screen name="PackageReceived" component={PackageReceived} options={{ headerMode: 'none', headerShown: false }} initialParams={{ Package4ID: route.params.Package2ID }}/>
            </Stack.Navigator>
        );
    }

    export default function PackageHome({ route }) {
    return (

        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'PackageNotReceived') {
                        iconName = focused
                            ? 'ios-information-circle'
                            : 'ios-information-circle-outline';
                    } else if (route.name === 'PackageReceived') {
                        iconName = focused ? 'ios-list-box' : 'ios-list';
                    }

                    // You can return any component that you like here!
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
            })}
            tabBarOptions={{
                activeTintColor: 'skyblue',
                inactiveTintColor: 'gray',
                indicatorStyle: { backgroundColor: 'skyblue' },
                labelStyle: { fontWeight: 'bold' }
            }}
        >

            <Tab.Screen name="PackageNotReceived" component={PackageNotReceivedScreen} options={{ tabBarLabel: '待領取包裹' }}  initialParams={{ PackageID: route.params.MemberID }}/>
            <Tab.Screen name="PackageReceived" component={PackageReceivedScreen} options={{ tabBarLabel: '已領取包裹' }}  initialParams={{ Package2ID: route.params.MemberID }}/>
        </Tab.Navigator>

    );

}