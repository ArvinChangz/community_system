import React from "react";
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import SignUp from './src/account/SignUp';
import SignIn from './src/account/SignIn';
import MemberSignIn from './src/account/AfterSignIn';
import EditAccount from './src/account/EditAccount';
import Home from './src/Home';
import Forum from './src/forum/Forum';
import Board from './src/board/Board';
import PostDetail from './src/forum/PostDetail';
import EditPost from './src/forum/EditPost';
import AddPost from './src/forum/AddPost';
import ReservationHome from './src/publicFacility/ReservationHome';
import Reservation from './src/publicFacility/Reservation';
import ReservationInfo from './src/publicFacility/ReservationInfo';
import ReservationCheck from './src/publicFacility/ReservationCheck';
import ReservationRecord from './src/publicFacility/ReservationRecord';
import PackageHome from './src/package/PackageHome';
import PackageNotReceived from './src/package/PackageNotReceived';
import PackageReceived from './src/package/PackageReceived';

export default function App() {
  const Stack = createStackNavigator();
  const Account = createStackNavigator();
  const defaultScreen = createStackNavigator();
  const Tab = createBottomTabNavigator();

  function HomeScreen({ navigation, route }) {
    
    // React.useLayoutEffect(() => {
    //   const routeName = getFocusedRouteNameFromRoute(route);
    //   if (routeName === "PackageHome") {
    //     navigation.setOptions({ tabBarVisible: false });
    //   } else {
    //     navigation.setOptions({ tabBarVisible: true });
    //   }
    // }, [navigation, route]);
  return (
    <Stack.Navigator>
      <Stack.Screen name="社區服務" component={Home} options={{ tabBarLabel: '社區服務' }}/>
      <Stack.Screen name="Forum" options={{ title: '住戶討論區' }} component={Forum} />
      <Stack.Screen name="PostDetail" options={{ title: '詳細內容' }} component={PostDetail} initialParams={{ userID: route.params.id }}/>
      <Stack.Screen name="EditPost" options={{ title: '編輯貼文' }} component={EditPost} />
      <Stack.Screen name="AddPost" options={{ title: '新增貼文' }} component={AddPost} initialParams={{ userID: route.params.id }}/>
      <Stack.Screen name="Board" options={{ title: '社區佈告欄' }} component={Board} />
      <Stack.Screen name="ReservationHome" options={{ title: '公設預約' }} component={ReservationHome} initialParams={{ MemberID: route.params.nameID }}/>
      <Stack.Screen name="Reservation" options={{ title: '公設預約' }} component={Reservation} />
      <Stack.Screen name="ReservationInfo" options={{ title: '公設資訊' }} component={ReservationInfo} />
      <Stack.Screen name="ReservationCheck" options={{ title: '公設預約' }} component={ReservationCheck} initialParams={{ userID: route.params.id , FacilityID: route.params.id}} />
      <Stack.Screen name="ReservationRecord" options={{ title: '預約紀錄' }} component={ReservationRecord} initialParams={{ MemberID: route.params.nameID }}/>
      <Stack.Screen name="PackageHome" options={{ title: '包裹領取' }} component={PackageHome} initialParams={{ MemberID: route.params.nameID }}/>
      <Stack.Screen name="PackageNotReceived" options={{ title: '待領取包裹' }} component={PackageNotReceived} initialParams={{ MemberID: route.params.nameID }}/>
      <Stack.Screen name="PackageReceived" options={{ title: '已包裹領取' }} component={PackageReceived} initialParams={{  MemberID: route.params.nameID }}/>
    </Stack.Navigator>
  );
}

  function AccountScreen({route}) {
    const { id, mid } = route.params;
    //console.log(route)
    //console.log(id)
    //console.log(mid)
    return (
      <Account.Navigator>
        <Account.Screen name="AfterSignIn" component={MemberSignIn} options={{ title: '會員中心' }} initialParams={{ id: id, mid: mid }} />
        <Account.Screen name="EditAccount" component={EditAccount} options={ { title:'編輯資料' }} />
      </Account.Navigator>
    );
  }




  function AfterLogIn(props) {
    const { userID, MID } = props.route.params
    //console.log(props.route.params)
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === '首頁') {
              iconName = focused ? 'ios-home' : 'ios-home';
            } else if (route.name === '會員中心') {
              iconName = focused ? 'ios-contact' : 'ios-contact';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'skyblue',
          inactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen name="首頁" component={HomeScreen} initialParams={{ id: userID ,nameID: MID.MemberID}} />
        <Tab.Screen name="會員中心" component={AccountScreen} initialParams={{ id: userID, mid: MID }} />
      </Tab.Navigator>
    )
  }

  return (
    <NavigationContainer>
      <defaultScreen.Navigator>
        <defaultScreen.Screen name="SignIn" component={SignIn} options={{ title: '登入' }} />
        <defaultScreen.Screen name="SignUp" component={SignUp} options={{ title: '註冊' }} />
        <defaultScreen.Screen name="AfterLogIn" component={AfterLogIn} options={{ headerMode: 'none', headerShown: false }} />
      </defaultScreen.Navigator>
    </NavigationContainer>
  );
}
