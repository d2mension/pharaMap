import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';

const { height: windHei } = Dimensions.get("window");

const Navigation = () => (
  <View style={styles.navigation}>
    {/* Navigation Bar 내용 구현 */}
  </View>
);

const styles = StyleSheet.create({
  navigation: {
    backgroundColor: 'teal',
    height : windHei * 0.08,
  },
});

export default Navigation;