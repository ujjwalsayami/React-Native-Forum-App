import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  textInput: {
    height: 40,
    fontSize: 14,
    width: '100%',
    paddingVertical: 0,
    padding: 0,
    lineHeight: 14,
    textAlign: 'left',
    borderRadius: 6,
    paddingLeft: 8,
    paddingRight: 50,
    color: '#2A2A2A',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
  },
  textInputDes: {
    height: 100,
  },
  label: {
    fontSize: 14,
    lineHeight: 14,
    color: '#2A2A2A',
    textAlign: 'left',
  },
  eachContainer: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  loginText: {
    fontSize: 16,
    lineHeight: 19,
    color: '#FFF',
    fontWeight: '700',
    textAlign: 'center',
  },
  signInView: {
    width: 120,
    height: 40,
    marginTop: 16,
    borderRadius: 10,
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: '#2C84FC',
    justifyContent: 'center',
  },
});
