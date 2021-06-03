import React from 'react';
import { Text, Image, StyleSheet, View, Button , Dimensions } from "react-native";
//import Slideshow from 'react-native-image-slider-show';
//import { SliderBox } from "react-native-image-slider-box";
import Swiper from "react-native-swiper";
//import logo from '../assets/community.png';

//主頁面home
export default function Home({ navigation }) {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitleVisible: false,
      headerBackImage: () => <Image source={require('./image/empty.png')} />,
    });
  }, [navigation]);

  //const [image, setimage] = useState([require('../assets/community.jpg'),require('../assets/community2.jpg'),require('../assets/community3.jpg')]);
  //require('../assets/community.png'),


  return (
    <View style={styles.container}>
      <View style={{flex:3}}>
      <Swiper
        style={styles.swiper}
        height={200}
        loop={true}
        autoplay={true}
        horizontal={true}
        paginationStyle={{bottom: 10}}
        showsButtons={false}>
        <Image source={require('../assets/community.jpg')} style={styles.img}/>
        <Image source={require('../assets/community2.jpg')} style={styles.img}/>
        <Image source={require('../assets/community3.jpg')} style={styles.img}/>
      </Swiper>
      
      </View>
      <View style={{flex:1}}>
      </View>
      <View style={styles.forbuttonsone}>
        <Button onPress={() => navigation.navigate("ReservationHome")} title="公設預約" />
        <Text>     </Text>
        <Button onPress={() => navigation.navigate("Forum")} title="住戶討論區" />
      </View>
      <View style={styles.forbuttonstwo}>
        <Button onPress={() => navigation.navigate("Board")} title="社區佈告欄" />
        <Text>     </Text>
        <Button onPress={() => navigation.navigate("PackageHome")} title="包裹領取" />
        <Text>    </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 3,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  logo: {
    width: 380,
    height: 300,
    marginTop: 50,
    marginBottom: 10,
  },
  instructions: {
    color: '#888',
    fontSize: 18,
    marginHorizontal: 15,
  },
  forbuttonsone: {
    flex: 1,
    flexDirection: 'row',

  },
  forbuttonstwo: {
    flex: 2,
    flexDirection: 'row',
  },
  img: {
    width: Dimensions.width,
    height: 400,
  },
});

//<SliderBox 
//images={image} 
//autoplay
//circleLoop
//sliderBoxHeight={400}
//dotColor={'lightblue'}
//inactiveDotColor={'skyblue'}/>