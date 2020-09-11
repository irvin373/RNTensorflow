import 'react-native-gesture-handler';
import * as React from 'react';
import * as tf from '@tensorflow/tfjs';
import { NavigationContainer,  } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {AppRegistry, Button, Text, View} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {name as appName} from './app.json';
import DataBase from './src/utils/DataBase';
import SQLScreen from './src/components/SQL.screen'
import InitialScreen from './src/components/Initial.screen';
import Camera from './src/components/Home.screen';
import Home from './src/components/Home.screen';
import TFModel from './src/utils/TFModel';


function DetailsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Details!</Text>
    </View>
  );
}

function SettingsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  );
}

const HomeStack = createStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={Home} />
      <HomeStack.Screen name="Details" component={DetailsScreen} />
    </HomeStack.Navigator>
  );
}

const SettingsStack = createStackNavigator();

function SettingsStackScreen() {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen name="Settings" component={SettingsScreen} />
      <SettingsStack.Screen name="Details" component={DetailsScreen} />
    </SettingsStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

class HomeApp extends React.Component {
  state = {
    ready: false
  };
  async componentDidMount() {
    await tf.ready();
    await DataBase.populateDB();
    // const data = await DataBase.getQuery("SELECT p.name, m.name as medicalGroup FROM Plant p INNER JOIN MedicalGroup m on p.MedicalGroupId = m.id;");
    this.setState({ready: true});
  }

  render() {
    if (!this.state.ready) {
      return(<InitialScreen />)
    }
    return (
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Home" component={HomeStackScreen} />
          <Tab.Screen name="Camera" component={Camera} />
          <Tab.Screen name="Settings" component={SettingsStackScreen} />
        </Tab.Navigator>
        
      </NavigationContainer>
    );
  }
}

AppRegistry.registerComponent(appName, () => HomeApp);
