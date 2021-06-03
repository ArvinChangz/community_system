import Icon from 'react-native-vector-icons/Ionicons';
import React, { useState, Component, useEffect } from 'react';
import { FlatList, View, Text, Button } from 'react-native';
import { Container, Content, Card, CardItem, Left, Right, Body, Thumbnail, Fab } from 'native-base';
import styles from '../styles';
import Modal, {
    ModalTitle,
    ModalContent,
    ModalFooter,
    ModalButton,
    SlideAnimation,
    ScaleAnimation,
    BottomModal,
    ModalPortal,
} from 'react-native-modals';
import axios from 'axios';
import Moment from 'moment';
import { axios_config, url } from '../Config';
import { BaseRouter } from '@react-navigation/native';


export default function PackageNotReceived({ route }) {
    const loginID = route.params.Package3ID;

    //辨別登入者身份

    const finalUrl = url + 'tbl1OVTLhLIvUk3iZ?filterByFormula=AND(PackageStatus%3D0%2CMemberID%3D' + loginID + ')&maxRecords=30&sort%5B0%5D%5Bfield%5D=PackageStatus&sort%5B0%5D%5Bdirection%5D=desc';

    const [packageData, setPackageData] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);

    const renderItem = ({ item }) => (
        <Card>
            <CardItem bordered>

                <Body>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <Left style={{ maxWidth: '20%' }}>
                            <Text style={{ fontWeight: "bold" }}>{item.fields.PackageType}</Text>
                        </Left>
                        <Right>
                            <View backgroundColor={changeStatusColor(item.fields.PackageStatus)} style={{ flex: 1, borderRadius: 5 }}>
                                <Button title={checkStatusButton(item.fields.PackageStatus)} color='white'></Button>
                            </View>
                        </Right>
                    </View>
                </Body>

            </CardItem>

            <CardItem header bordered >
                <Body>
                    <Text>收件人: {item.fields.ReceiveName} </Text>
                    <Text></Text>
                    <Text>快遞編號: {item.fields.PackageNumber}</Text>
                    <Text></Text>
                    <Text>送達時間: {Moment(item.fields.ReceiveTime).format('YYYY-MM-DD HH:mm')}</Text>
                    <Text></Text>
                    <Text>最後取件時間: {Moment(item.fields.ReturnDate).format('YYYY-MM-DD')}</Text>
                </Body>
            </CardItem>

            <CardItem>
                <Right style={styles.textRight}>
                    <Text>寄件人: {item.fields.SendName} </Text>
                    <Text></Text>
                    <Text>寄件地址: {item.fields.SendAddress}</Text>
                </Right>
            </CardItem>
        </Card>
    )

    async function fetchData() {
        const result = await axios.get(finalUrl, axios_config);
        console.log(result);
        setPackageData(result.data.records);
    }

    useEffect(() => {
        fetchData();
    }, []);


    function checkStatusButton(num) {
        if (num == 0) {
            return "未領取";
        } else if (num == 1) {
            return "已領取";
        }
    }

    function changeStatusColor(status) {
        let color;
        if (status == 0) {
            color = "orange";
        } else if (status == 1) {
            color = "#00bfff";
        } else {
            color = "#ff4500";
        }
        return color;

    }


    return (

        <Container style={styles.packagecontainer}>

            <FlatList style={styles.item}
                data={packageData}
                renderItem={renderItem}
            />


        </Container>
    );
}

