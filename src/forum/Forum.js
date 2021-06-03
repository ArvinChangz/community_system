
import React, { useState, Component, useEffect } from 'react';
import { FlatList, View, Text, Button, Modal } from 'react-native';
import { Container, Content, Card, CardItem, Left, Right, Body, Icon, Thumbnail, Fab } from 'native-base';
import styles from '../styles';
import axios from 'axios';
import Moment from 'moment';
import { axios_config, url } from '../Config';

export default function Index({ navigation }) {
    const finalUrl = url + 'Forum?maxRecords=30&view=Grid%20view';
    const [posts, setPost] = useState([]);

    //只要到佈告欄頁面就重新render頁面
    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            fetchData();
        });
        //類似停止監聽
        return unsubscribe;
    }, [navigation]);

    const renderItem = ({ item }) => (
        <Card>
            <CardItem bordered>
                <Left>
                    <Thumbnail small source={item.fields.ProfilePic} />
                    <Body>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <Text>{item.fields.Name}</Text>
                            <Right>
                                <Text>{Moment(item.fields.PostTime).format('YYYY-MM-DD HH:mm')}</Text>
                            </Right>
                        </View>
                    </Body>
                </Left>
            </CardItem>
            <CardItem header bordered>
                <Body>
                    <Text>{item.fields.PostContent}</Text>
                </Body>
            </CardItem>
            <CardItem button onPress={() => GoToPostDetail(item.id)}>
                <Right style={styles.comment}>
                    <Icon active name="chatbubbles" style={{ marginRight: 5 }} />
                </Right>
                <Text>留言 {item.fields.CommentCount}</Text>
            </CardItem>
        </Card>
    )

    async function fetchData() {
        try {
            const result = await axios.get(finalUrl, axios_config);
            setPost(result.data.records);
        }
        catch (e) {
            console.log(e);
        }
    }

    function GoToPostDetail(id) {
        navigation.navigate('PostDetail', { itemId: id });
    }

    return (
        <Container style={styles.container}>
            <FlatList
                style={styles.item}
                data={posts}
                renderItem={renderItem}
                keyExtractor={item => item.fields.PostID.toString()} />

            <Fab
                active="true"
                direction="up"
                containerStyle={{}}
                style={{ backgroundColor: '#0080FF' }}
                position="bottomRight"
                onPress={() => navigation.navigate('AddPost')}>
                {/* Icon位置好像隨著手機不同會位移 */}
                <Icon active name="add" style={{ fontSize: 35, marginTop: 10 }} />
            </Fab>
        </Container>
    );
}