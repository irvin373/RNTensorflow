import { Navigation } from "react-native-navigation"
import Screen1 from '../screens/screen1';
import Screen2 from '../screens/screen2';

Navigation.registerComponent('Home', () => Screen1);
Navigation.registerComponent('Settings', () => Screen2);

const menuBottom = [
  {
    componentName: 'Home',
    title: 'Home',
    bottomBar: 'Home'  
  },
  {
    componentName: 'Settings',
    title: 'Settings',
    bottomBar: 'Settings'  
  },
]

Navigation.setDefaultOptions({
  statusBar: {
    backgroundColor: '#4d089a'
  },
  topBar: {
    title: {
      color: 'white'
    },
    backButton: {
      color: 'white'
    },
    background: {
      color: '#4d089a'
    }
  },
  bottomTab: {
    fontSize: 14,
    selectedFontSize: 14
  }
});

function buildStack(componentName: string, title: string, bottomBar: string){
  return ({
    stack: {
      children: [
        {
          component: {
            name: componentName
          }
        },
      ],
      options: {
        topBar: {
          title: {
            text: title,
          }
        },
        bottomTab: {
          text: bottomBar,
        }
      }
    }
  })
}

export function getNavigation () {
  return menuBottom.map(menuItem => buildStack(menuItem.componentName, menuItem.title, menuItem.bottomBar));
}