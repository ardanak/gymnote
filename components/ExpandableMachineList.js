import React, { Component } from 'react';
import {
  Text,
  ScrollView,
  SectionList,
  TouchableHighlight,
  Image,
  View
} from 'react-native';
import styles from "../styles/expandablemachinelist.js";
import arrowDown from '../resources/img/ic_keyboard_arrow_down_black_24dp.png';
import arrowUp from '../resources/img/ic_keyboard_arrow_up_black_24dp.png';

export default class ExpandableMachineList extends Component {
  constructor(props) {
    super(props);

    this._setMaxHeight = this._setMaxHeight.bind(this);
    this._setMinHeight = this._setMinHeight.bind(this);
    this.toggle = this.toggle.bind(this);

    this.state = {
      //data is an array of machineObjects
      data: props.data,
      expanded: false,
      counter: 0,
    };
  }

  _setMaxHeight(event){
    const newCount = this.state.counter + 1;
    if(newCount==1) {
      this.setState({
        maxHeight: event.nativeEvent.layout.height,
        counter: newCount
      });
    }
  }

  _setMinHeight(event){
    this.setState({
      minHeight: event.nativeEvent.layout.height,
      expandedHeight: event.nativeEvent.layout.height
    });
  }

  toggle() {
    const expanded = !this.state.expanded
    this.setState({
      expanded: expanded,
      expandedHeight: expanded ? this.state.maxHeight : this.state.minHeight
    });
  }

  render() {

    let imgSource = arrowDown;
    if(this.state.expanded) {
      imgSource = arrowUp;
    }

    return (
      <SectionList
        style={[styles.listItemContainer,{height: this.state.expandedHeight}]}

        onLayout={this._setMaxHeight}

        renderItem={({item})=> (
          <Text style={styles.listItem}>{item.name}<Text style={styles.italic}>{' ' + item.brand}</Text></Text>
        )}

        renderSectionHeader={({section}) => (
          <View style={styles.sectionHeaderWrapper} onLayout={this._setMinHeight}>
            <Text style={styles.sectionHeader}>
              {section.title}
            </Text>
            <TouchableHighlight style={styles.arrowWrapper} onPress={this.toggle}>
              <Image
                style={styles.arrowImg}
                source={imgSource}
              />
            </TouchableHighlight>
          </View>
        )}

        sections={[{
            keyExtractor:(item) => {
            return item.name + ' ' + item.brand
            },
            data: this.state.data,
            title: this.state.data[0].name
          }]}
      />
    )
  }
}