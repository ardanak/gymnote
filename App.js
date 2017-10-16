import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  ScrollView,
  SectionList,
  AsyncStorage,
  View,
  StatusBar
} from 'react-native';

import MachineData from './resources/data/data.json';
import MachineListView from "./components/MachineListView";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      machines: [] 
    };
  }

  async componentDidMount() {
    try {

      const init = await AsyncStorage.getItem('app_initialized');
      if (init != 'true'){
        //data not initialized, performing init...
        console.log('data not initialized, performing init...');
        try {
          await AsyncStorage.multiSet(
            [
              ['machines', JSON.stringify(MachineData.machines)],
              ['app_initialized', 'true'],
              ['dumbell_weight_range', JSON.stringify(MachineData.dumbellWeightRange)],
              ['plate_weight_range', JSON.stringify(MachineData.plateWeightRange)],
              ['barbell_weight_range', JSON.stringify(MachineData.barbellWeightRange)],
              ['kettlebell', JSON.stringify(MachineData.kettlebell)]
            ]
          );
          this.setState({machines: MachineData.machines});
          this.forceUpdate();
        }
        catch (error) {
          // Error saving data
          console.log("machine data initialization failed", error);
        }
      }
      else {
        // machine data is already initialized, grabbing machine data
        try {
          const data = await AsyncStorage.getItem('machines');
          machines = JSON.parse(data);
          this.setState({
            machines: machines,
          });
        }
        catch (error) {
          // Error retrieving data
          console.log("error retrieving machine data:", error);
        }
      }
    }
    catch (error) {
      // Error retrieving data
      console.log("error retrieving app initialization data:", error);
    }
  }

  render() {
    // currentHeight works on Android only
    const marginOffset = StatusBar.currentHeight;
    return (
      <View style={{flex: 1, paddingTop: marginOffset}}> 
        <MachineListView allMachines={this.state.machines}/>
      </View>
    );
  }
}
