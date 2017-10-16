import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: '#dbdbdb'
  },
  title: {
    color: 'blue',
    fontSize: 26,
    fontWeight: '900',
    textAlign: 'center',
    fontFamily: 'Roboto',
    marginTop: 5,
    marginBottom: 5
  },
  divider: {
    width: '40%',
    alignSelf: 'center',
    borderBottomWidth: 1,
    borderColor: 'black',
    marginBottom: 5
  },
  sectionHeader: {
    marginLeft: 5,
    color: '#800080',
    fontWeight: '900',
    fontSize: 20,
    fontFamily: 'Roboto',
    textAlign: 'center'
  },
  listItem: {
    color: 'blue',
    flex: 1,
    fontSize: 18,
    textAlign: 'left',
    marginLeft: 10,
    marginTop: 5,
    marginBottom: 5,
    height: 30,
    fontFamily: 'Roboto'
  }
});

export default styles;