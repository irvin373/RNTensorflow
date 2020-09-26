import * as React from 'react';
import {Text, View} from 'react-native';
import FilePicker from '../components/ActionCamera.component';
import { decodeJpeg, bundleResourceIO } from '@tensorflow/tfjs-react-native';
import * as tf from '@tensorflow/tfjs'
import * as FileSystem from 'expo-file-system';

const modelJson = require('../../assets/model.json');
const modelWeights = require('../../assets/group1-shard1of1.bin');

export default class Home extends React.Component {
  model: tf.GraphModel | null = null; // mobilenet.MobileNet | null = null; // tf.LayersModel | null = null;
  state = {
    ready: false
  }

  async imageToTensor(fileUri: string) {
    const imgB64 = await FileSystem.readAsStringAsync(fileUri, {
      encoding: FileSystem.EncodingType.Base64,
    });
    const imgBuffer = tf.util.encodeString(imgB64, 'base64').buffer;
    const raw = new Uint8Array(imgBuffer)  
    const imageTensor = decodeJpeg(raw).resizeBilinear([224,224]).expandDims(0);
    return imageTensor;
  }

  async componentDidMount() {
    console.clear();
    await tf.ready();
    this.model = await tf.loadGraphModel(bundleResourceIO(modelJson, modelWeights));
    await this.model?.load();
    this.setState({ready: true});
  }
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>{this.state.ready ? 'Done' : 'Loading...'}</Text>
        <FilePicker onTakePicture={async (uri) => {
          const imageTensor = await (await this.imageToTensor(uri));
          const prediction = await this.model?.predict(imageTensor)  as tf.Tensor
          console.log('-->', prediction.dataSync())
          console.log('-->', prediction)
        }} />
      </View>
    );
  }
}
