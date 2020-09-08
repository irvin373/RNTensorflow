import { Navigation } from "react-native-navigation"
import {getNavigation} from './src/services/Navigation';

Navigation.events().registerAppLaunchedListener(async () => {
  const children = getNavigation();
  Navigation.setRoot({
    root: {
      bottomTabs: {
        children
      }
    }
  });
});