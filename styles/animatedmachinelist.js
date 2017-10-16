import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  listItemContainer: {
    flex: 1
  },
  sectionHeaderWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch'
  },
  sectionHeader: {
    alignSelf: 'flex-start',
    flex: 2,
    marginLeft: 10,
    color: 'blue',
    fontSize: 18,
    fontFamily: 'Roboto'
  },
  arrowWrapper: {
    alignSelf: 'flex-end',
    flex: 1,
  },
  arrowImg: {
    width: 30,
    height: 30
  },
  listItem: {
    flex: 1,
    fontSize: 18,
    textAlign: 'left',
    marginLeft: 10,
    marginTop: 5,
    marginBottom: 5,
    height: 30,
    fontFamily: 'Roboto'
  },
  italic: {
    fontStyle: 'italic'
  }
});

export default styles;
