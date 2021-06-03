import React, { useState, useEffect } from 'react';
import { View, Container } from 'native-base';
import { Button, Image, TextInput, Pressable, Keyboard, Alert } from 'react-native';
import styles from '../styles';
import axios from 'axios';
import { axios_config, url } from '../Config';

export default function EditPost({ route, navigation }) {
    console.log(route)
    const [originalPost, setOriginalPost] = useState(route.params.postContent);
    const finalUrl = url + 'Forum';

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerBackTitleVisible: false,
            headerBackImage: () => <Image style={styles.backImage} source={require('../image/cross.png')} />,
        });
    }, [navigation]);

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Button onPress={() => DoModify(originalPost)} title="儲存" />
            ),
        });
    }, [originalPost])

    async function DoModify(content) {
        const editPost = {
            records: [{
                fields: {
                    PostContent: content
                },
                id: route.params.itemId
            }]
        }

        if (content == '') {
            Alert.alert("", "貼文內容不得為空！");
            return;
        }

        try {
            await axios.patch(finalUrl, editPost, axios_config);
            navigation.goBack();
        }
        catch (e) {
            console.log(e);
        }
    }

    return (
        <Container>
            <View>
                <Pressable onPress={Keyboard.dismiss}>
                    <TextInput style={styles.textInput}
                        multiline={true}
                        onChangeText={text => setOriginalPost(text)}
                        value={originalPost}
                    />
                </Pressable>
            </View>
        </Container>
    )
}