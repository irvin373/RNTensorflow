import * as React from 'react';
import {Alert, Image, Text, View, Dimensions, Platform} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import Tflite from 'tflite-react-native';
import styles from '../utils/styles';
import { TouchableOpacity } from 'react-native-gesture-handler';
const { width: dw } = Dimensions.get('window');
const tflite = new Tflite();

type Props = {
  navigation: any
}

type State = {
  err: any,
  res: any,
  ready: boolean,
  label: string
  imgSrc: any
  path: string
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

export default class Home extends React.Component<Props, State> {
  state = {
    err: null,
    res: null,
    ready: false,
    label: '',
    path: '',
    imgSrc: require('../../assets/img/mate.jpg'),
  }

  componentDidMount() {
    tflite.loadModel({
      model: 'model.tflite',// required
      labels: 'labels.txt',  // required
      numThreads: 1, // defaults to 1  
    },
    (err, res) => {
      if(err)
        console.log('--> error load model', err);
      else
        console.log('--> model loaded: ', res);
      this.setState({ready: true, err: JSON.stringify(err), res: JSON.stringify(res)});
    });
  }

  async openImagePicker (type: string): Promise<any> {
    try {
      let result: any;
      const baseConfiguration = {
        compressVideoPreset: 'HighestQuality',
        ...Platform.select({
          ios: {
            compressImageQuality: 0.9
          }
        }),
        mediaType: 'photo',
        width: 224,
        height: 224
      };
      if (type === 'camera') {
        result = await ImagePicker.openCamera(baseConfiguration);
      } else {
        result = await ImagePicker.openPicker({
          ...baseConfiguration,
          multiple: false
        });
        console.log(result)
      }
      const resolve = this.state.resolve;
      this.setState({
        resolve: false,
        reject: false
      }, () => resolve && resolve(result));
      return result;
    } catch (e) {
      let message = 'USER_CANCELED';
      if (e.message) {
        message = e.message.split(/[. ]/g).join('_').toUpperCase();
      }
      const reject = this.state.reject;
      this.setState({
        resolve: false,
        reject: false
      }, () => { console.log(reject) });
    }
  }

  prediction (uri: string) {
    tflite.runModelOnImage({
      path: uri,
      model: 'SSDMobileNet',
      // imageMean: 224,
      // imageStd: 224,
      threshold: 0.3, // defaults to 0.1
      numResultsPerClass: 5, // defaults to 5
    },
    (err: any, res: any) => {
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
          navigation.push('PlantDetail', {plantId: index});
        } else {
          Alert.alert('Sin Coincidencia', 'La planta no esta dentro del sistema tuquypac');
        }
      }
    });
  }

  predictPicture = async (type: 'camera' | 'gallery') => {
    const result = await this.openImagePicker(type);
    let data = await ImagePicker.openCropper({
      path: result.path,
      width: 224,
      height: 224,
      // includeBase64: true
    } as any)
    this.setState({path: data.path, imgSrc: {uri: result.path}}, () => {
      setTimeout(() => {
        this.prediction(data.path);
      }, 500)
    })
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <View style={{flex: 1, alignSelf: 'center', marginTop: 20}}>
          <Text style={{flex: 1, fontSize: 16, marginHorizontal: 12}}>
            {`Seleccione una imagen, mediante camara o la galeria para el reconocimiento`}
          </Text>
          <Image resizeMethod={'resize'} style={{height: dw, width: dw, marginTop: 20}} source={this.state.imgSrc} />
          <Text style={{flex: 1, fontSize: 18, marginBottom: 10}}> {this.state.label} </Text>
        </View>
        <View style={{flex: 0, marginBottom: 50, flexDirection: 'row', alignSelf: 'center'}}>
          <TouchableOpacity style={styles.actionBtn} onPress={() => { this.predictPicture('camera'); }}>
            <Text style={styles.textBtn}>Camara</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionBtn} onPress={() => { this.predictPicture('gallery'); }}>
            <Text style={styles.textBtn}>Galeria</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
