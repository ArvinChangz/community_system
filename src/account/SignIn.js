import React, { useEffect, useState } from 'react';
import { Button, TextInput, Text, View, Pressable, Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './SignUpStyles';
import axios from 'axios';
import { axios_config, url } from '../Config';
import { Container } from 'native-base';

export default function SignIn() {
    const navigation = useNavigation();
    const [UserData, setUserData] = useState([]);
    const [UserID, setID] = useState("");
    const [UserPassword, setPassword] = useState("");
    const [text, setText] = useState("");
    const finalUrl = url + 'Member';

   //只要到貼文詳細頁面就重新render頁面
   React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
        setText("");
    });
    //類似停止監聽
    return unsubscribe;
}, [navigation]);

    async function getData() {
        const result = await axios.get(finalUrl, axios_config);
        setUserData(result.data.records)
    }

    async function Login() {
        try {
            for (let index = 0; index < UserData.length; index++) {
                const ID = UserData[index].fields.ID;
                if (ID == UserID.toString()) {
                    if (UserData[index].fields.Password == UserPassword) {
                        //setText('登入成功');
                        setID('');
                        setPassword('');
                        PassUserIdToHome(UserData[index].id, UserData[index].fields);
                        break;
                    }
                }
                else {
                    setText('帳號密碼錯誤')
                }
            }
        }
        catch (error) {
            console.log(error)
        }
    }


    useEffect(() => { getData() }, [text])

    function PassUserIdToHome(id, MemberInfo, Name) {
        navigation.navigate('AfterLogIn', { userID: id, MID: MemberInfo, Name: Name });
    }


    return (
        <Container>
            <View style={styles.form}>
                <Pressable onPress={Keyboard.dismiss}>

                    <TextInput
                        style={styles.inputStyle}
                        placeholder="使用者帳號"
                        value={UserID}
                        onChangeText={text => setID(text)}
                    />

                    <TextInput
                        style={styles.inputStyle}
                        placeholder="密碼"
                        value={UserPassword}
                        onChangeText={text => setPassword(text)}
                        maxLength={15}
                        secureTextEntry={true}
                    />

                    <Button onPress={() => Login()} title="登入" />
                    <Button onPress={() => navigation.navigate('SignUp')} title='尚未註冊嗎？'></Button>
                    <Text>{text}</Text>
                </Pressable>
            </View>
        </Container>
    )

}
