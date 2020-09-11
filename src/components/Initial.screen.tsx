import * as React from 'react';
import {Text, View} from 'react-native';
import { FloatingAction } from 'react-native-floating-action';

export default function InitialScreen({navigation}) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Loading...</Text>
    </View>
  );
}