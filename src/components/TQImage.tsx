import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  FlatList,
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
};

export type ImageName = keyof typeof images;

export default function TQImage({name, height = 80}: {name: ImageName, height?: number}) {
  const source = images[name];
  return (<Image source={source} style={{height: 140, width: dw - 16}} />);
}