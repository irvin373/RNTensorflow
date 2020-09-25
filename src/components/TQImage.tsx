import React from 'react';
import {
  Image, Dimensions
} from 'react-native';
const { width: dw } = Dimensions.get('window');

const images = {
  'manzanilla.jpg': require('../../assets/img/manzanilla.jpg'),
  'lluviadeoro.jpg': require('../../assets/img/lluviadeoro.jpg'),
  'mate.jpg': require('../../assets/img/mate.jpg'),
  'munaandina.jpg': require('../../assets/img/munaandina.jpg'),
  'toronjil.jpg': require('../../assets/img/toronjil.jpg'),
  'wirawira.jpg': require('../../assets/img/wirawira.jpg'),
  'chevron': require('../../assets/img/chevron.png'),
};

export type ImageName = keyof typeof images;

export default function TQImage({name, height = 140, fullsize = false, iconSize = 0}: {name: ImageName, iconSize?: number, height?: number, fullsize?: boolean}) {
  const source = images[name];
  let width = fullsize ? dw : dw - 16;
  if (iconSize) {
    height = iconSize;
    width = iconSize;
  }
  return (<Image source={source} style={{height, width}} />);
}