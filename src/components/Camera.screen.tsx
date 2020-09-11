import * as React from 'react';
import {Text, View} from 'react-native';
import { FloatingAction } from 'react-native-floating-action';

export default function InitialScreen({navigation}) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Loading...</Text>
      <FloatingAction
        actions={[{
          text: "Accessibility",
          icon: require("../../assets/add.png"),
          name: "bt_accessibility",
        }]}
        overrideWithAction
        onPressItem={name => {
          navigation.navigate('Camera');
          console.log("Icon pressed", `the icon ${name} was pressed`);
        }}
      />
    </View>
  );
}