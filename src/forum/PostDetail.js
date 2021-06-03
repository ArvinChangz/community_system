import React, { useState, useEffect } from 'react';
import { Text, TouchableOpacity, View, Image, TextInput, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { Container, Content, Card, CardItem, Left, Right, Body, Icon, Thumbnail, List, ListItem, Item, Input, Button } from 'native-base';
import styles from '../styles';
import { SwipeListView } from 'react-native-swipe-list-view';
import OptionsMenu from 'react-native-option-menu';
import { axios_config, url } from '../Config';
import axios from 'axios';
import Moment from 'moment';
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default function PostDetail({ route, navigation }) {
    const MoreIcon = require('../image/more-menu.jpg');
    const finalUrl = url + 'Comment?maxRecords=30&view=Grid%20view';
    const [posts, setPosts] = useState(null);
    const [comments, setCommemts] = useState([]);
    const [addContent, setAddContent] = useState("");
    var getPostUrl = url + 'Forum/' + route.params.itemId;
    var getCommentUrl;
    var commentArray = [];

    //只要到貼文詳細頁面就重新render頁面
    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            fetchPost();
        });
        //類似停止監聽
        return unsubscribe;
    }, [navigation]);

    //確保posts有值後再去接url
    useEffect(() => {
        if (posts != null) {
            getCommentUrl = url + 'Comment?filterByFormula=PostID+%3D+' + posts.fields.PostID.toString() + '&sort%5B0%5D%5Bfield%5D=CommentTime&sort%5B0%5D%5Bdirection%5D=asc'
            fetchComment();
        }
    }, [posts])

    const renderItem = (data, rowMap) => (
        <View style={styles.rowFront} >
            <ListItem avatar onPress={() => rowMap[data.item.fields.CommentID].closeRow()}>
                <Left>
                    <Thumbnail small source={data.item.fields.ProfilePic} />
                </Left>
                <Body>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <Text>{data.item.fields.Name}</Text>
                        <Right>
                            <Text>{Moment(data.item.fields.CommentTime).format('YYYY-MM-DD HH:mm')}</Text>
                        </Right>
                    </View>
                    <Text note>{data.item.fields.Content}</Text>
                </Body>
            </ListItem>
        </View>
    );

    const renderHiddenItem = (data, rowMap) => (
        <View style={styles.rowBack}>
            <TouchableOpacity
                style={[styles.backRightBtn, styles.backRightBtnRight]}
                onPress={() => DeleteComment(data.item, rowMap)}
            >
                <Icon name="trash" style={{ color: '#fff', fontSize: 25 }} />
            </TouchableOpacity>
        </View>
    );

    async function fetchPost() {
        try {
            const resultOfPost = await axios.get(getPostUrl, axios_config);
            setPosts(resultOfPost.data);
        }
        catch (e) {
            console.log('error:' + e)
        }
    }

    async function fetchComment() {
        try {
            const resultOfComment = await axios.get(getCommentUrl, axios_config);
            setCommemts(resultOfComment.data.records);
        }
        catch (e) {
            console.log('error:' + e)
        }
    }

    function EditPost() {
        navigation.navigate('EditPost', {
            itemId: posts.id,
            postContent: posts.fields.PostContent
        });
    }

    const confirmDeleteMessage = () => {
        Alert.alert("", "確定要刪除嗎？\n(留言也將一併刪除)",
            [
                {
                    text: "取消",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                {
                    text: "刪除",
                    onPress: DeletePost
                }
            ]
        );
    }
        
    async function DeletePost() {
        //先刪貼文
        await axios.delete(getPostUrl, axios_config)
            .then(
                navigation.navigate('Forum')
            )
            .catch(error => console.log(error))

        //再刪該貼文之留言，這裡要一次刪多筆 records[]=id ，上限10筆。格式 EX：Comment?records[]=recyLhlkQ5wtoBJS7&records[]=recp2fMmuX4QAvBbp
        for (let i = 0; i < comments.length; i++) {
            commentArray.push(comments[i].id);
        }

        var arrayUrl = commentArray.map(function(value){
            return 'records[]=' + value; 
        }).join('&');
        const deleteCommentUrl = url + 'Comment?' + arrayUrl;

        try {
            await axios.delete(deleteCommentUrl, axios_config);
        }
        catch (e) {
            console.log(e);
        }
    }

    async function DeleteComment(item, rowMap) {
        const deleteCommentUrl = url + 'Comment/' + item.id;
        rowMap[item.fields.CommentID].closeRow();

        try {
            await axios.delete(deleteCommentUrl, axios_config);
            getCommentUrl = url + 'Comment?filterByFormula=PostID+%3D+' + posts.fields.PostID.toString() + '&sort%5B0%5D%5Bfield%5D=CommentTime&sort%5B0%5D%5Bdirection%5D=asc'
            fetchComment();
        }
        catch (e) {
            console.log(e);
        }
    }

    async function InsertComment() {
        const newComment = {
            fields: {
                Content: addContent,
                CommentTime: new Date(),
                Forum: [posts.id],
                Member: [route.params.userID]
            }
        }

        if (addContent == ''){
            Alert.alert("","留言內容不得為空！");
            return;
        }

        try {
            await axios.post(finalUrl, newComment, axios_config);
            setAddContent('');
            getCommentUrl = url + 'Comment?filterByFormula=PostID+%3D+' + posts.fields.PostID.toString() + '&sort%5B0%5D%5Bfield%5D=CommentTime&sort%5B0%5D%5Bdirection%5D=asc'
            fetchComment();
        }
        catch (e) {
            console.log("error:" + e);
        }
    }


    // TODO: KeyboardAvoidingView

    // <KeyboardAvoidingView
    //     keyboardVerticalOffset={1300}
    //     enabled={true}
    //     style={{ flex: 1 }}
    //     behavior="padding" >
    // </KeyboardAvoidingView>
    return (
        <Container>
            {/* <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior="padding"> */}

            {/* <KeyboardAwareScrollView> */}
                <SwipeListView style={styles.item}
                    ListHeaderComponent={
                        <Card>
                            <CardItem bordered>
                                <Left>
                                    <Thumbnail small source={posts && posts.fields.ProfilePic} />
                                    <Body>
                                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                            <Text>{posts && posts.fields.Name}</Text>
                                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                                                <OptionsMenu
                                                    button={MoreIcon}
                                                    buttonStyle={{ width: 16, height: 16, resizeMode: "contain" }}
                                                    destructiveIndex={1}
                                                    options={["編輯貼文", "刪除", "取消"]}
                                                    actions={[EditPost, confirmDeleteMessage]}
                                                />
                                            </View>
                                        </View>
                                    </Body>
                                </Left>
                            </CardItem>
                            <CardItem header bordered>
                                <Body>
                                    <Text>{posts && posts.fields.PostContent}</Text>
                                </Body>
                            </CardItem>
                        </Card>
                    }
                    data={comments}
                    renderItem={renderItem}
                    renderHiddenItem={renderHiddenItem}
                    keyExtractor={item => item.fields.CommentID.toString()}
                    rightOpenValue={-75}
                    previewOpenValue={-40}
                    previewOpenDelay={3000}
                    closeOnRowPress={true}
                    disableRightSwipe={true}
                    ListFooterComponent={
                        <ListItem avatar>
                            <Body >
                                <View style={{ flex: 1, flexDirection: 'row' }}>
                                    <View style={{ flex: 1, flexDirection: 'row' }}>
                                        <TextInput
                                            style={{ fontSize: 15, width: 270 }}
                                            placeholder="請寫下你的留言…"
                                            multiline={true}
                                            onChangeText={text => setAddContent(text)}
                                            value={addContent}
                                        />
                                    </View>
                                    <View>
                                        {/* Button送出->要固定在下方 */}
                                        <Button style={{ backgroundColor: '#0080FF', height: 30, width: 50, justifyContent: 'center', alignItems: 'center' }}
                                            onPress={InsertComment}>
                                            <Text style={{ color: '#ffffff' }}>送出</Text>
                                        </Button>
                                    </View>
                                </View>
                            </Body>
                        </ListItem>
                    }
                />
            {/* </KeyboardAwareScrollView> */}
            
            {/* </KeyboardAvoidingView> */}
        </Container>
    )
}