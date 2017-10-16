import React, { Component } from 'react';
import {
  AsyncStorage,
  Text,
  ScrollView,
  SectionList
} from 'react-native';
import { filter, sortBy, groupBy, each } from 'lodash';
import styles from "../styles/machinelistview.js";
import ExpandableMachineList from './ExpandableMachineList.js';

export default class MachineListView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      cardioMachines: [],
      strengthMachines: [],
      freeFormMachines: []
    };
  }

  _filter(machineList, type) {

    if (machineList!==null) {
      const filtered = filter(machineList, (o) => o.type == type);
      const sorted = sortBy(filtered, (o) => o.name);

      //aggregating duplicate machines under one collapsed label
      const groupedByName = groupBy(sorted,(o)=> o.name);
      const keys = Object.keys(groupedByName);
      formattedArry = [];

      // formats machineList as an array of either single machines objects or
      // arrays of multiple machines objects of the same type
      // [ {machineObj}, [{machineObj},{machineObj}, ...], ... ]
      each(keys, (key) => {
      	if (groupedByName[key].length==1)
          formattedArry.push(groupedByName[key][0]);
        else
        	formattedArry.push(groupedByName[key]);
      });

      return formattedArry;

    } else {
      return [];
    }  
  }

  componentWillReceiveProps(nextProps) {
    //for now we only need a shallow comparison here
    if(this.props!=nextProps) {
      this.setState({
        cardioMachines: this._filter(nextProps.allMachines, 'cardio'),
        strengthMachines: this._filter(nextProps.allMachines, 'strength'),
        freeFormMachines: this._filter(nextProps.allMachines, 'freeform')
      });
    }
  }

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>

        <Text style={styles.title}>Select a machine</Text>

        <Text style={styles.divider} />

        <SectionList
          renderItem={
            ({item}) => {
              if (Array.isArray(item)) {
                return (
                  <ExpandableMachineList data={item} />
                );
              }
              else {
                return <Text style={styles.listItem}>{item.name}</Text>
              }
            }
          }

          renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title}</Text>}

          sections={[
            {
              keyExtractor: (item) => {
                if (!Array.isArray(item)) {
                  return item.name + ' ' + item.brand
                }
                else
                  return item[0].name
              },
              data: this.state.cardioMachines,
              title: "Cardio"
            },
            {
              keyExtractor: (item) => {
                if (!Array.isArray(item)) {
                  return item.name + ' ' + item.brand
                }
                else
                  return item[0].name
              },
              data: this.state.strengthMachines,
              title: "Strength"
            },
            {
              keyExtractor: (item) => {
                if (!Array.isArray(item)) {
                  return item.name + ' ' + item.brand
                }
                else
                  return item[0].name
              },
              data: this.state.freeFormMachines,
              title: "Free form"
            }
          ]}
        />

      </ScrollView>
    );
  }

}