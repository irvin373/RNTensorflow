import { StyleSheet } from "react-native";
import color from './color';

export default StyleSheet.create({
  textHeader: {
    color: color.textPrimary,
    fontSize: 18,
    fontWeight: '600'
  },
  headerName: {
    color: color.textPrimary,
    fontSize: 24,
    padding: 8,
    fontWeight: '600'
  },
  detailedText: {
    color: color.textPrimary,
    fontSize: 16,
  }
});
