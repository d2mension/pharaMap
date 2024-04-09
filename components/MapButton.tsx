import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';

const { width: windWid, height: windHei } = Dimensions.get('window');

interface ButtonProps {
  title: string;
  onPress: () => void;
}

const MapButton = ({ title, onPress }: ButtonProps) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#DDDDDD',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    width: windWid * 0.3,
    height: windHei * 0.08,
    borderRadius: 20,
    marginVertical: 10,
    fontSize: 20,
  },
});

export default MapButton;