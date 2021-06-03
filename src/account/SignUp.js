import React, { useState } from 'react';
import { Button, View, Text, TextInput, Modal, StyleSheet, Pressable, Keyboard } from 'react-native';
import styles from './SignUpStyles';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios'
import { axios_config, url } from '../Config';
import { Container } from 'native-base';

export default function SignUp() {

  const navigation = useNavigation();

  // React.useLayoutEffect(() => {
  //   navigation.setOptions({
  //     headerBackTitleVisible: false,
  //     headerBackImage: () => <Image source={require('../image/empty.png')} />,
  //   });
  // }, [navigation]);

  const [ID, setID] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [confrim, setConfrim] = useState(false);
  const finalUrl = url + 'Member';

  const addMember = async () => {
    try {
      const newPerson = {
        fields: {
          ID: ID,
          Name: displayName,
          Phone: phone,
          Email: email,
          Password: password
        }
      }

      if (ID == '' || displayName == '' || phone == '' || email == '' || password == '') {
        Alert.alert("", "內容不得為空！");
        return;
    }

      console.log('newPerson', newPerson)
      const result = await axios.post(finalUrl, newPerson, axios_config);

      console.log('result', result);
      setMessage('註冊成功，請前往登入');
      setConfrim(true);
    }
    catch (e) {
      console.log("error:" + e);
    }
  }

  function Close() {
    setConfrim(false);
    navigation.navigate('SignIn')
  }



  return (
   
    <Container>
      <View style={styles.form}>
        <Pressable onPress={Keyboard.dismiss} style={{ flex: 1, justifyContent: 'center' }}>
          <TextInput
            style={styles.inputStyle}
            placeholder="使用者帳號"
            value={ID}
            onChangeText={text => setID(text)}
          />

          <TextInput
            style={styles.inputStyle}
            placeholder="姓名"
            value={displayName}
            onChangeText={text => setDisplayName(text)}
          />

          <TextInput
            style={styles.inputStyle}
            placeholder="電子信箱"
            value={email}
            onChangeText={text => setEmail(text)}
          />

          <TextInput
            style={styles.inputStyle}
            placeholder="手機號碼"
            value={phone}
            onChangeText={text => setPhone(text)}
          />

          <TextInput
            style={styles.inputStyle}
            placeholder="密碼"
            value={password}
            onChangeText={text => setPassword(text)}
            maxLength={15}
            secureTextEntry={true}
          /> 

          <Button
            onPress={addMember}
            title="註冊"
          />


          <Modal transparent={true} visible={confrim}>
            <View style={style.modalView}>
              <Text>{message}</Text>
              <Button title='前往登入' onPress={() => Close()}>
              </Button>
            </View>
          </Modal>
          <Button onPress={() => navigation.goBack()} title='已經註冊，我要登入'></Button>
        </Pressable>
      </View>
    </Container>
  )
}

const style = StyleSheet.create({
  modalView: {
    margin: 60,
    marginTop: "100%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  }
})