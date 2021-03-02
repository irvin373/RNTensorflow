import React from 'react';
import {View, Text, Platform} from 'react-native';
export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isTfReady: false,
      prediction: 'wait'
    };
  } 
 
  render() {
    // Get a reference to the bundled asset and convert it to a tensor
    let textureDims;
    if (Platform.OS === 'ios') {
     textureDims = {
       height: 1920,
       width: 1080,
     };
    } else {
     textureDims = {
       height: 1200,
       width: 1600,
     };
    }    
    return (<View style={{flex: 1, justifyContent: 'center'}}>
    </View>)
  }
}

export default App;