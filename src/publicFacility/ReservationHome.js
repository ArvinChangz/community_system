
import React, { useState, Component, useEffect } from 'react';
import { FlatList , View , Text, Modal } from 'react-native';
import { Container , Header , Left , Body , Segment , Button , Title , Content , Icon} from 'native-base';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from "@react-navigation/stack";
import styles from '../styles';
// import AddPost from '../AddPost';
import axios from 'axios';
import Moment from 'moment';
import {axios_config, url} from '../Config';
import Reservation from './Reservation';
import ReservationRecord from './ReservationRecord';

const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

function ReservationScreen() {
    return (
      <Stack.Navigator>
          <Stack.Screen name="Reservation" component={Reservation} options={{headerMode: 'none', headerShown : false}} />
      </Stack.Navigator>
    );
  }
  
  function ReservationRecordScreen({route}) {
    console.log(route)
    return (
    <Stack.Navigator>
        <Stack.Screen name="ReservationRecord" component={ReservationRecord} options={{headerMode: 'none', headerShown : false}} initialParams={{ LoginID: route.params.UserID }} />
    </Stack.Navigator>
    );
  }

export default function ReservationHome({route}) {
    return (
        <Tab.Navigator
        screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
  
              // if (route.name === 'PackageNotReceived') {
              //   iconName = focused
              //     ? 'ios-information-circle'
              //     : 'ios-information-circle-outline';
              // } else if (route.name === 'PackageReceived') {
              //   iconName = focused ? 'ios-list-box' : 'ios-list';
              // }
  
              // You can return any component that you like here!
              return <Ionicons name={iconName} size={size} color={color} />;
            },
          })}
          tabBarOptions={{
            activeTintColor: 'blue',
            inactiveTintColor: 'gray',
          }}
        >
      
        <Tab.Screen name="Reservation" component={ReservationScreen} options={{ tabBarLabel: '預約' }} />
        <Tab.Screen name="ReservationRecord" component={ReservationRecordScreen} options={{ tabBarLabel: '預約紀錄' }} initialParams={{ UserID: route.params.MemberID }} />
      </Tab.Navigator>
    );
}