import Icon from 'react-native-vector-icons/Ionicons';  
import React, { useState, Component, useEffect } from 'react';
import { FlatList , View , Text , Button , Image} from 'react-native';
import { Container, Content, Card, CardItem, Left, Right, Body, Thumbnail, Fab, Textarea } from 'native-base';
import styles from '../styles';
import axios from 'axios';
import {axios_config, url} from '../Config';

export default function ReservationInfo({ route, navigation }) {
    const getInfoUrl = url + 'facility?filterByFormula=FacilityID+%3D+' + route.params.FacilityID;

    const [info, setInfo] = useState([]);

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
                                width: 350 ,
                                height: 250 ,
                            }}
                        />
                        
                    </View>
                </Body>
            </CardItem>
            <CardItem header>
                <Body>
                    <Text>設施名稱：{item.fields.FacilityName}</Text>
                    <Text></Text>
                    <Text>設施資訊：</Text>
                    <Text>{item.fields.FacilityInfo}</Text>
                    <Text>開放時間：</Text>
                    <Text>{item.fields.OpeningTime} - {item.fields.EndTime}</Text>
                    <Text></Text>
                    <Text>租借說明：</Text>
                    <Text>
                        租用1次以1小時為限，為保障社區住戶之權益，若要繼續使用，請再次預約租借，造成不便，敬請見諒。
                    </Text>
                    <Text></Text>
                </Body>
            </CardItem>
            <CardItem>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                    <Button 
                        style={{
                            flex: 1 ,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                        title="我要預約"
                        onPress={() => GoToReservationCheck(item.fields.FacilityID , item.id)}
                    />
                </View>
            </CardItem>
        </Card>
    )

    async function fetchInfo() {
        try {
            const resultOfInfo = await axios.get(getInfoUrl, axios_config);
            setInfo(resultOfInfo.data.records);
        }
        catch (e) {
            console.log('error:' + e)
        }
    }

    useEffect(() => {
        fetchInfo();
    }, []);

    function GoToReservationCheck(id , longId) {
        navigation.navigate('ReservationCheck', { FacilityID : id , Id: longId});
    }

    return (
      
        <Container style={styles.container}>
            <FlatList
                style={styles.item}
                data={info}
                renderItem={renderItem}
                keyExtractor={item => item.fields.FacilityID}
            /> 
        </Container>
    );
}
