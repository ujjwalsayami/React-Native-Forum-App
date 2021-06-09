import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  container: {
    paddingHorizontal: 16,
  },
  eachContainer: {
    paddingVertical: 12,
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
  loginText: {
    fontSize: 16,
    lineHeight: 19,
    color: '#FFF',
    fontWeight: '700',
    textAlign: 'center',
  },
  signupText: {
    fontSize: 18,
    lineHeight: 24,
    marginTop: 16,
    textAlign: 'center',
    color: '#2C84FC',
  },
  boldText: {
    fontWeight: '700',
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
});
