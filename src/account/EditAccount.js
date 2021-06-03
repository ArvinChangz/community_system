import React, { useEffect, useState } from 'react';
import { Alert, Button, TextInput, Text, View, Pressable, Keyboard, Image } from 'react-native';
import styles from './SignUpStyles';
import styless from '../styles'
import axios from 'axios';
import { axios_config, url } from '../Config';
import { Container } from 'native-base';



export default function EditAccount({ route, navigation }) {

    const UserID = route.params;
    const [ID, setID] = useState(route.params.UserInfo.ID);
    const [name, setName] = useState(route.params.UserInfo.Name);
    const [email, setEmail] = useState(route.params.UserInfo.Email);
    const [phone, setPhone] = useState(route.params.UserInfo.Phone);
    const [password, setPassword] = useState(route.params.UserInfo.Password);
    const finalUrl = url + 'Member';

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerBackTitleVisible: false,
            headerBackImage: () => <Image style={styless.backImage} source={require('../image/cross.png')} />,
        });
    }, [navigation]);


    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Button onPress={DoModify} title="儲存" />
            ),
        });
    }, [phone, ID, name, email, password])

    //console.log(route.params.UserInfo)
    console.log(route.params.id)

    async function DoModify() {
        const editInfo = {
            records: [{
                fields: {
                    ID: ID,
                    Name: name,
                    Phone: phone,
                    Email: email,
                    Password: password
                },
                id: route.params.id
                
            }]
        }

        if (name == '' || phone == '' || email == '' || password == '') {
            Alert.alert("", "內容不得為空！");
            return;
        }

        try {
            await axios.patch(finalUrl, editInfo, axios_config);
            navigation.goBack();
        }
        catch (e) {
            console.log(e);
        }
    }

    
    return (
        <Container>
            <View style={styles.form}>
                <Pressable style={{ height: 500 }} onPress={Keyboard.dismiss}>

                    <View style={styles.inputStyle}>
                        <Text style={styles.titlestyle}>使用者帳號：(不得更改)</Text>
                        <Text style={{marginBottom: 4,}}>{ID}</Text>
                    </View>

                    <Text style={styles.titlestyle}>姓名：</Text>
                    <TextInput style={styles.inputStyle}
                        onChangeText={text => setName(text)}
                        value={name}
                    />

                    <Text style={styles.titlestyle}>電子信箱：</Text>
                    <TextInput style={styles.inputStyle}
                        onChangeText={text => setEmail(text)}
                        value={email}
                    />

                    <Text style={styles.titlestyle}>手機號碼：</Text>
                    <TextInput style={styles.inputStyle}
                        onChangeText={text => setPhone(text)}
                        value={phone}
                    />

                    <Text style={styles.titlestyle}>密碼：</Text>
                    <TextInput style={styles.inputStyle}
                        onChangeText={text => setPassword(text)}
                        value={password}
                        
                    />
                </Pressable>
            </View>
        </Container>
    )

}