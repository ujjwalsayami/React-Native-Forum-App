import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  container: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  label: {
    fontSize: 18,
    lineHeight: 21,
    color: '#2A2A2A',
    textAlign: 'left',
  },
  boldText: {
    color: '#2C84FC',
    fontWeight: '600',
  },
  descText: {
    fontSize: 14,
    lineHeight: 19,
    color: '#2A2A2A',
    textAlign: 'left',
    fontWeight: '600',
  },
  headerDescView: {
    marginVertical: 12,
  },
  replyContainer: {
    marginTop: 12,
  },
  textInput: {
    height: 100,
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
  commentView: {
    marginVertical: 6,
    borderRadius: 9,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#F3F2F2',
  },
});
