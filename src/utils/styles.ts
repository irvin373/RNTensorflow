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
