import * as React from 'react';
import {Text, View, Image} from 'react-native';
import FilePicker from './ActionCamera.component';
import { fetch, decodeJpeg, bundleResourceIO,  } from '@tensorflow/tfjs-react-native';

import * as mobilenet from '@tensorflow-models/mobilenet';
import * as tf from '@tensorflow/tfjs'
import * as FileSystem from 'expo-file-system';
import { ready } from '@tensorflow/tfjs';
// import {} from '../../assets/'

const modelJson = require('../../assets/model.json');
const modelWeights = require('../../assets/group1-shard1of1.bin');

export default class Home extends React.Component {
  model: tf.GraphModel | null = null; // mobilenet.MobileNet | null = null; // tf.LayersModel | null = null;
  state = {
    ready: false
  }

  async imageToTensor(fileUri: string) {
    // let photo = await this.camera.takePictureAsync();
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
    // this.model = await mobilenet.load();
    // this.model = await mobilenet.load({version: 2, modelUrl: bundleResourceIO(modelJson, modelWeights)});
    // this.model.load();
    this.model = await tf.loadGraphModel(bundleResourceIO(modelJson, modelWeights));
    await this.model?.load();
    // this.model?.loadSync({});
    // this.model = await tf.loadGraphModel(bundleResourceIO(modelJson, modelWeights));
    // console.log('-->', model)
    // const imageTensor = this.imageToTensor(image);
    
    this.setState({ready: true});
  }
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>{this.state.ready ? 'Done' : 'Loading...'}</Text>
        <FilePicker onTakePicture={async (uri) => {
          // console.log('-->', this.model?.)
          const imageTensor = await (await this.imageToTensor(uri));
          const prediction = await this.model?.predict(imageTensor) // (imageTensor);
          // const prediction = this.model?.predict(imageTensor);
          console.log('-->', prediction?.dataSync())
          console.log('-->', prediction?.dispose())
        }} />
      </View>
    );
  }
}
