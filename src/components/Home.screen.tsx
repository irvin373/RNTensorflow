import * as React from 'react';
import {Text, View} from 'react-native';
import FilePicker from './ActionCamera.component';
import * as mobilenet from '@tensorflow-models/mobilenet';
import * as tf from '@tensorflow/tfjs'
import { fetch, decodeJpeg } from '@tensorflow/tfjs-react-native';
import * as FileSystem from 'expo-file-system';
import { ready } from '@tensorflow/tfjs';

export default class Home extends React.Component {
  state = {
    ready: false
  }
  async componentDidMount() {
    await tf.ready();
    const model = await mobilenet.load();
    // TFModel.setModel(model);
    this.setState({ready: true});
  }
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>{this.state.ready ? 'Done' : 'Loading...'}</Text>
        <FilePicker />
      </View>
    );
  }
}
