// import React from 'react';
// import {
//   View,
//   Text,
//   Image,
//   Platform
// } from 'react-native';

// import { Camera } from 'expo-camera';
// import * as tf from '@tensorflow/tfjs';
// import * as mobilenet from '@tensorflow-models/mobilenet';
// import { fetch, decodeJpeg, cameraWithTensors } from '@tensorflow/tfjs-react-native';
// import * as FileSystem from 'expo-file-system'

// const TensorCamera = cameraWithTensors(Camera);

// export class App extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       isTfReady: false,
//       prediction: 'wait'
//     };
//   }

//   handleCameraStream(images, updatePreview, gl) {
//     const loop = async () => {
//       const nextImageTensor = images.next().value

//       //
//       // do something with tensor here
//       //

//       // if autorender is false you need the following two lines.
//       // updatePreview();
//       // gl.endFrameEXP();

//       requestAnimationFrame(loop);
//     }
//     loop();
//   }

//   imageToTensor(rawImageData) {
//     const TO_UINT8ARRAY = true
//     const { width, height, data } = jpeg.decode(rawImageData, TO_UINT8ARRAY)
    
//     const buffer = new Uint8Array(width * height * 3)
//     let offset = 0 // offset into original data
//     for (let i = 0; i < buffer.length; i += 3) {
//       buffer[i] = data[offset]
//       buffer[i + 1] = data[offset + 1]
//       buffer[i + 2] = data[offset + 2]
  
//       offset += 4
//     }
  
//     return tf.tensor3d(buffer, [height, width, 3])
//   }
 
//   async componentDidMount() {
//     // Wait for tf to be ready.
//     await tf.ready();
//     // Signal to the app that tensorflow.js can now be used.
//     // const model = await mobilenet.load();
    
//     // const fileUri = './assets/catsmall.jpg';      
//     // const imgB64 = await FileSystem.readAsStringAsync(fileUri, {
//     //   encoding: FileSystem.EncodingType.Base64,
//     // });
//     // const imgBuffer = tf.util.encodeString(imgB64, 'base64').buffer;
//     // const raw = new Uint8Array(imgBuffer)  
//     // const imageTensor = decodeJpeg(raw);

    
//     // const image = require('./assets/catsmall.jpg');
//     // const imageAssetPath = Image.resolveAssetSource(image);
//     // const response = await fetch('https://ichef.bbci.co.uk/news/976/cpsprodpb/12A9B/production/_111434467_gettyimages-1143489763.jpg', {}, { isBinary: true });
//     // const imageData = await response.arrayBuffer();
//     console.log('->', imgBuffer, raw)
//     // const imageTensor = decodeJpeg(imageData);
//     // const prediction = await model.classify(imageTensor);
    
//     this.setState({
//       isTfReady: true,
//       // prediction
//     });
//   }
 
 
//   render() {
//     // Get a reference to the bundled asset and convert it to a tensor
//     let textureDims;
//     if (Platform.OS === 'ios') {
//      textureDims = {
//        height: 1920,
//        width: 1080,
//      };
//     } else {
//      textureDims = {
//        height: 1200,
//        width: 1600,
//      };
//     }    

    
//     return (<View style={{flex: 1, justifyContent: 'center'}}>
//       <TensorCamera
//        // Standard Camera props
//        style={{flex: 1}}
//        type={Camera.Constants.Type.front}
//        // Tensor related props
//        cameraTextureHeight={textureDims.height}
//        cameraTextureWidth={textureDims.width}
//        resizeHeight={200}
//        resizeWidth={152}
//        resizeDepth={3}
//        onReady={this.handleCameraStream}
//        autorender={true}
//       />
//       {/* <Image source={require('./catsmall.jpg')} /> */}
//       <Text>{this.state.isTfReady ? 'Si' : 'No'}</Text>
//       <Text>{this.state.prediction}</Text>
//     </View>)
//   }
// }

// export default App;
import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import * as FileSystem from 'expo-file-system'
import * as tf from '@tensorflow/tfjs';
import * as mobilenet from '@tensorflow-models/mobilenet';
import { fetch, decodeJpeg, cameraWithTensors } from '@tensorflow/tfjs-react-native';

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  // const [type, setType] = useState(Camera.Constants.Type.back);

  useEffect(() => {
    (async () => {
      await tf.ready();
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={{ flex: 1 }}>
      <Camera ref={ref => {
        this.camera = ref;
      }} style={{ flex: 1 }}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            flexDirection: 'row',
          }}>
          <TouchableOpacity
            style={{
              flex: 0.1,
              alignSelf: 'flex-end',
              alignItems: 'center',
            }}
            onPress={async () => {
              if (this.camera) {
                const model = await mobilenet.load();
                let photo = await this.camera.takePictureAsync();
                const fileUri = photo.uri;      
                const imgB64 = await FileSystem.readAsStringAsync(fileUri, {
                  encoding: FileSystem.EncodingType.Base64,
                });
                const imgBuffer = tf.util.encodeString(imgB64, 'base64').buffer;
                const raw = new Uint8Array(imgBuffer)  
                const imageTensor = decodeJpeg(raw);
                const predictions = await model.classify(imageTensor)
                console.log('-->', predictions)
              }
              // setType(
              //   type === Camera.Constants.Type.back
              //     ? Camera.Constants.Type.front
              //     : Camera.Constants.Type.back
              // );
            }}>
            <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Take </Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}