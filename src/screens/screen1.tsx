import React from 'react'
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'whitesmoke'
  }
});

const HomeScreen = () => {
  return (
    <View style={styles.root}>
      <Text>Home Screen 1</Text>
    </View>
  );
};

HomeScreen.options = {
  topBar: {
    title: {
      text: 'Home',
      color: 'white'
    },
    background: {
      color: '#4d089a'
    }
  }
};

export default HomeScreen;