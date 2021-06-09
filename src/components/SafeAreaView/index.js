import React from 'react';
import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const SafeAreaView = (props) => {
  const insets = useSafeAreaInsets();

  const styles = {
    container: {
      flex: 1,
      paddingTop: insets.top,
      paddingBottom: insets.bottom,
      backgroundColor: '#FFF',
    },
  };
  return (
    <View style={[styles.container, props.style]}>
      <StatusBar style="dark" />
      {props.children}
    </View>
  );
};

export { SafeAreaView };
