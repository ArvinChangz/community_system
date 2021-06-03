import { StatusBar, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 0,
    marginTop: StatusBar.currentHeight || 0,
  },
  packagecontainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    justifyContent: 'center',
    margin: 0,
    marginTop: StatusBar.currentHeight || 0,
  },
  view: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    justifyContent: 'center',
    margin: 0,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    margin: 10,
  },
  item2: {
    flex: 1,
    justifyContent: "flex-end",
  },
  boardContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    margin: 0,
    padding: 10,
  },
  title: {
    fontSize: 32,
  },
  comment: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  rowFront: {
    backgroundColor: '#fff',
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#fff',
    flex: 1,
    flexDirection: 'row',

  },
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 65,
  },
  backRightBtnRight: {
    backgroundColor: '#7B7B7B',
    right: 0,
  },
  backImage: {
    width: 20,
    height: 20,
    margin: 10
  },
  textInput: {
    margin: 30,
    width: 310,
    height: 490,
  },
  textRight:{
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end'
    
  },
 



});

export default styles;
