import React, { useState, useEffect } from 'react';
import { Button, TextInput, Modal, Text, Image, View, Pressable, Keyboard, Alert } from 'react-native';
import { Container } from 'native-base';
import styles from '../styles';
import axios from 'axios';
import { axios_config, url } from '../Config';

export default function AddPost({ navigation, route }) {
    const finalUrl = url + 'Forum?maxRecords=30&view=Grid%20view';
    const [content, setContent] = useState("");

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerBackTitleVisible: false,
            headerBackImage: () => <Image style={styles.backImage} source={require('../image/cross.png')} />,
            headerRight: () => (
                <Button onPress={DoInsert} title="儲存" />
            ),
        });
    });

    async function DoInsert() {
        const newPost = {
            fields: {
                PostContent: content,
                PostTime: new Date(),
                Member: [route.params.userID]
            }
        }

        if (content == '') {
            Alert.alert("","貼文內容不得為空！");
            return;
        }

        try {
            await axios.post(finalUrl, newPost, axios_config);
            navigation.goBack();
            console.log(newPost);
        }
        catch (e) {
            console.log("error:" + e);
        }
    }

    return (
        <Container>
            <View>
                <Pressable onPress={Keyboard.dismiss}>
                    <TextInput style={styles.textInput}
                        multiline={true}
                        placeholder="想說點什麼呢？"
                        onChangeText={text => setContent(text)}
                        value={content} />
                </Pressable>
            </View>
        </Container>
    );

}