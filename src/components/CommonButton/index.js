import React from 'react';
import { Text, ActivityIndicator, StyleSheet, Pressable } from 'react-native';

const CommonButton = ({ isLoading, onPress, label, style }) => (
  <Pressable onPress={onPress} style={[styles.container, style]}>
    {isLoading ? (
      <ActivityIndicator size="small" color="#fff" />
    ) : (
      <Text style={styles.label}>{label}</Text>
    )}
  </Pressable>
);

const styles = StyleSheet.create({
  container: {
    width: 120,
    height: 40,
    marginTop: 16,
    borderRadius: 10,
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: '#2C84FC',
    justifyContent: 'center',
  },
  label: {
    fontSize: 16,
    lineHeight: 19,
    color: '#FFF',
    fontWeight: '700',
    textAlign: 'center',
  },
});
export { CommonButton };
