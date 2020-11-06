import { StyleSheet } from "react-native";
import color from './color';

export default StyleSheet.create({
  textHeader: {
    color: color.textPrimary,
    fontSize: 18,
    fontFamily: 'Lato-Bold'
  },
  headerName: {
    color: color.textPrimary,
    fontSize: 24,
    padding: 8,
    fontFamily: 'Lato-Bold'
  },
  detailedText: {
    color: color.textPrimary,
    fontSize: 16,
    fontFamily: 'Lato-Regular'
  }
});

export const markdonwStyles = StyleSheet.create({
  heading3: {
    fontSize: 28,
    color: color.textPrimary,
    fontFamily: 'Lato-Bold'
  },
  strong: {
    color: color.textPrimary,
    fontSize: 16,
    fontFamily: 'Lato-Bold' 
  },
  paragraph: {
    color: color.textPrimary,
    fontSize: 16,
    fontFamily: 'Lato-Regular',
    textAlign: 'justify'
  },
  list_item: {
    color: color.textPrimary,
    fontSize: 16,
    fontFamily: 'Lato-Regular',
    textAlign: 'justify'
  },
});