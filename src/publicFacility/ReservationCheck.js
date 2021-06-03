import Icon from 'react-native-vector-icons/Ionicons';  
import React, { useState, Component, useEffect } from 'react';
import { FlatList, View, Text , Image , Button, Alert } from 'react-native';
import { Container, Content, Card, CardItem , Left , Right, Body , Thumbnail , Fab , Picker } from 'native-base';
import DateTimePicker from '@react-native-community/datetimepicker';
import styles from '../styles';
import axios from 'axios';
import moment from "moment";
import {axios_config, url} from '../Config';


export default function ReservationCheck({ route , navigation }) {
    const finalUrl = url + 'facility?filterByFormula=FacilityID+%3D+' + route.params.FacilityID;
    const postUrl = url + 'ReservationRecord';
    
    const [posts, setPost] = useState([]);
    const [date, setDate] = useState(new Date());

    const [Numselected, setNumSelected] = useState('1')
    const [Timeselected, setTimeSelected] = useState('09:00~10:00')

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        // setShow(Platform.OS === 'ios');
        setDate(currentDate);
    };

    const renderItem = ({ item }) => (
        <Card>
            <CardItem bordered style={{backgroundColor: "#ACD6FF"}}>
                <Body>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                            <Image 
                                source={{
                                    uri : item.fields.Picture[0].url
                                }}
                                style={{
                                    width: 350,
                                    height: 250,
                                }}
                            />
                    </View>
                </Body>
             </CardItem>
             <CardItem>
                <Body>
                    <Text>設施名稱：{item.fields.FacilityName}</Text>
                    <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 12}}>
                        <Text>預計使用人數：</Text>
                        <Picker
                            note
                            mode="dropdown"
                            style={{ width: 55, borderWidth: 1, borderColor: '#ccc' }}
                            textStyle={{color: '#000'}}
                            selectedValue={Numselected}
                            onValueChange={(val)=>setNumSelected(val)}
                            >
                            <Picker.Item label="1" value="1" />
                            <Picker.Item label="2" value="2" />
                            <Picker.Item label="3" value="3" />
                            <Picker.Item label="4" value="4" />
                            <Picker.Item label="5" value="5" />
                            <Picker.Item label="6" value="6" />
                            <Picker.Item label="7" value="7" />
                            <Picker.Item label="8" value="8" />
                            <Picker.Item label="9" value="9" />
                            <Picker.Item label="10" value="10" />
                            <Picker.Item label="11" value="11" />
                            <Picker.Item label="12" value="12" />
                        </Picker>
                        <Text> 人</Text>
                    </View>
                </Body>
            </CardItem>
            <CardItem>
                    <Text>
                        預約日期：
                    </Text>
                <View>
                    <DateTimePicker
                        style={{width: 200}}
                        testID="dateTimePicker"
                        value={date}
                        mode={'date'}
                        is24Hour={true}
                        display="default"
                        onChange={onChange}
                    />
                </View> 
            </CardItem>
            <CardItem>
                <Text>預約時段：</Text>
                    <Picker
                        note
                        mode="dropdown"
                        style={{ width: 135, borderWidth: 1, borderColor: '#ccc' }}
                        textStyle={{color: '#000'}}
                        selectedValue={Timeselected}
                        onValueChange={(val2)=>setTimeSelected(val2)}
                    >
                        <Picker.Item label="09:00~10:00" value="09:00~10:00" />
                        <Picker.Item label="10:00~11:00" value="10:00~11:00" />
                        <Picker.Item label="11:00~12:00" value="11:00~12:00" />
                        <Picker.Item label="12:00~13:00" value="12:00~13:00" />
                        <Picker.Item label="13:00~14:00" value="13:00~14:00" />
                        <Picker.Item label="14:00~15:00" value="14:00~15:00" />
                        <Picker.Item label="15:00~16:00" value="15:00~16:00" />
                        <Picker.Item label="16:00~17:00" value="16:00~17:00" />
                        <Picker.Item label="17:00~18:00" value="17:00~18:00" />
                        <Picker.Item label="18:00~19:00" value="18:00~19:00" />
                        <Picker.Item label="19:00~20:00" value="19:00~20:00" />
                        <Picker.Item label="20:00~21:00" value="20:00~21:00" />
                        <Picker.Item label="21:00~22:00" value="21:00~22:00" />
                    </Picker>
            </CardItem>
            <CardItem>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                    <Button
                        onPress={AddRecords}
                        style={{
                            flex: 1 ,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                        title="確定預約"
                    />
                </View>
            </CardItem>
        </Card>
    )

    async function fetchData () {
        const result = await axios.get(finalUrl , axios_config);
        setPost(result.data.records);
        console.log(result.data);
    }

    useEffect(() => {
        fetchData();
    }, []);

    const send_date = moment(date).format("YYYY-MM-DD");

    async function AddRecords() {
        const newReservation = {
            fields: {
                Member : [route.params.userID] ,
                Facility : [route.params.Id] ,
                ReservationCount : Numselected,
                ReservationDate : send_date ,
                ReservationTime : Timeselected ,
            }
        }
        await axios.post(postUrl, newReservation, axios_config)
        .then(res => {
            // console.log("reservation :" , newReservation)
    
            Alert.alert("","預約成功");
            navigation.goBack('Home');
        })    
        .catch (function(error)
        {
            console.log("reservation :" , newReservation)
            console.log('error', error)
            console.log(error.response.status);
        })
    }

    return (
        <Container style={styles.container}>
            <FlatList
                style={styles.item}
                data={posts}
                renderItem={renderItem}
                keyExtractor={item => item.fields.FacilityID}
            /> 
        </Container>
    );
}
