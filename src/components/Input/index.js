import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const TextInputContainer = (props) => {
  return (
    <View style={[styles.textFieldContainer, props.containerStyle]}>
      <TextInput
        {...props}
        ref={props.reff}
        underlineColorAndroid="transparent"
        placeholderTextColor={'#77787A'}
        style={[styles.textInput, props.style]}
      />
    </View>
  );
};

export { TextInputContainer };

const styles = StyleSheet.create({
  textFieldContainer: {
    flex: 1,
    marginTop: 10,
    borderRadius: 6,
    flexDirection: 'row',
    overflow: 'hidden',
    backgroundColor: '#F3F2F2',
  },
  textInput: {
    color: 'grey',
    fontSize: 14,
    letterSpacing: 0.1,
    textAlign: 'left',
  },
});
