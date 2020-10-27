import * as React from 'react';
import {Alert, Text, View} from 'react-native';
import FilePicker from '../components/ActionCamera.component';
import * as tf from '@tensorflow/tfjs'
import Tflite from 'tflite-react-native';
const tflite = new Tflite();

type Props = {
  navigation: any
}

const mapedLabels = {
  'dienteleon': 10,
  'hierbabuena': 6,
  'lluviaoro': 3,
  'mandarina': 9,
  'manzanilla': 5,
  'munaandina': 1,
  'ortiga': 11,
  'palta': 7,
  'lavanda': 8,
  'toronjil': 2,
  'wirawira': 4,
  'jengibre': 12,
};

type labelKeys = keyof typeof mapedLabels;

export default class Home extends React.Component<Props> {
  model: tf.GraphModel | null = null; // mobilenet.MobileNet | null = null; // tf.LayersModel | null = null;
  state = {
    ready: false,
    label: ''
  }

  async componentDidMount() {
    console.clear();
    tflite.loadModel({
      model: 'model.tflite',// required
      labels: 'labels.txt',  // required
      numThreads: 1,                              // defaults to 1  
    },
    (err, res) => {
      if(err)
        console.log('--> error load model', err);
      else
        console.log('--> model loaded: ', res);
    });
    this.setState({ready: true});
  }

  prediction (uri: string) {
    tflite.runModelOnImage({
      path: uri,
      model: 'SSDMobileNet',
      // imageMean: 224,
      // imageStd: 224,
      threshold: 0.3,       // defaults to 0.1
      numResultsPerClass: 5,// defaults to 5
    },
    (err, res) => {
      if(err) {
        console.log(err);
      }
      else {
        console.log(res);
        const {navigation} = this.props;
        const result = res[0];
        if (result.confidence > 0.6) {
          const labelKey:labelKeys = result.label;
          const index = mapedLabels[labelKey];
          navigation.navigate('Plantas');
          navigation.push('PlantDetail', {
            plantId: index
          });
          // this.setState({label: JSON.stringify(res)})
        } else {
          Alert.alert('Sin Coincidencia', 'La planta no esta dentro del sistema tuquypac');
        }
      }
    });
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: 'transparent', flexDirection: 'row'}}>
        <Text style={{ fontSize: 18, marginBottom: 10 }}> {this.state.ready ? 'Done' : 'Loading...'} </Text>
        <Text style={{ flex: 1, fontSize: 18, marginBottom: 10 }}> {this.state.label} </Text>
        <FilePicker onTakePicture={async (uri) => {
          this.prediction(uri);
        }} />
      </View>
    );
  }
}
