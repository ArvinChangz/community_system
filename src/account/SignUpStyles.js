import { StatusBar, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    marginTop: StatusBar.currentHeight || 0,
  },

  loading: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  item: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#00ffff',
    padding: 8,
    marginVertical: 8,
    marginHorizontal: 16,
  },

  title: {
    fontSize: 24,
  },

  form: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 35,
    marginTop: StatusBar.currentHeight || 0,
  },

  inputStyle: {
    width: '100%',
    marginBottom: 15,
    paddingBottom: 10,
    alignSelf: "center",
    borderColor: "#ccc",
    borderBottomWidth: 1,
  },

  titlestyle: {
    marginBottom: 5,
    paddingBottom: 3,
    color:"gray",
  },

  logo: {
    width: 305,
    height: 159,
    marginBottom: 20,
  },

});
export default styles;