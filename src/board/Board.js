import React, { useState, useEffect } from 'react';
import { FlatList, View, Button, Modal } from 'react-native';
import { Container, Content, Card, Header, CardItem, Right, Text, Body, Icon, Fab } from 'native-base';
import axios from 'axios';
import { axios_config, url } from '../Config';
import styles from '../styles';


export default function Board() {
  const posturl = url + 'Boardpost?maxRecords=30&view=Grid%20view';
  //呼叫get
  //設定state，預設為空陣列
  const [bposts, setBPosts] = useState([]);
  //這邊使用到javascript的語法async await
  //因為資料會包在data的records裡，所以，取得資料時，要用data.records，取得的資料就放到Posts裡
  async function fetchData () {
      const result = await axios.get(posturl,axios_config);
      //console.log(result);
      setBPosts(result.data.records);
  }
  useEffect(() => {
    fetchData();
  },[]);

  const renderItem = ({ item }) => (
    <Card>
      <CardItem header>
        <Text>{item.fields.Title}</Text>
      </CardItem>
      <CardItem>
        <Body>
          <Text>{item.fields.Information}</Text>
            <Text>發布時間:{(item.fields.Date)}</Text>
        </Body>
      </CardItem>
    </Card>
  );

  return (
    <Container style={styles.boardContainer}>
        <FlatList 
          data={bposts}
          renderItem = {renderItem}
          keyExtractor={item => item.fields.BoardpostID.toString()}>
        </FlatList>
    </Container>
  );
}
