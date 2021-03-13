import {Dimensions, StyleSheet} from 'react-native';

const width = Dimensions.get('window').width;

export const styles = StyleSheet.create({
  fill: {
    flex: 1,
  },
  emptyDate: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 10,
  },
  emptyDateText: {
    fontSize: 18,
  },
  agendaView: {
    flex: 1,
    justifyContent: 'center',
  },
  agendaText: {
    fontSize: 18,
  },
  createTaskBtn: {
    backgroundColor: 'black',
    padding: 12,
    marginTop: 10,
    borderRadius: 10,
  },
  createTaskBtnText: {
    color: 'white',
  },
  textInput: {
    borderWidth: 1,
    marginTop: 10,
    width: width / 1.5,
    padding: 10,
  },
});
