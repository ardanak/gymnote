import React, { Component } from 'react';
import {
  Animated,
  Text,
  ScrollView,
  SectionList,
  TouchableHighlight,
  Image,
  View
} from 'react-native';
import styles from "../styles/animatedmachinelist.js";
import arrowDown from '../resources/img/ic_keyboard_arrow_down_black_24dp.png';
import arrowUp from '../resources/img/ic_keyboard_arrow_up_black_24dp.png';

const AnimatedSectionList = Animated.createAnimatedComponent(SectionList);

export default class AnimatedMachineList extends Component {
  constructor(props) {
    super(props);

    this._setMaxHeight = this._setMaxHeight.bind(this);
    this._setMinHeight = this._setMinHeight.bind(this);
    this.toggle = this.toggle.bind(this);
    
    this.state = {
      //data is an array of machineObjects
      data: props.data,
      expanded: false,
      expandAnimation: new Animated.Value(),
      minCounter: 0,
      maxCounter: 0
    };
  }

  _setMaxHeight(event){
    const newCount = this.state.maxCounter + 1;
    if(newCount==1) {
      // console.log('max ', event.nativeEvent.layout.height);
      this.setState({
        maxHeight: event.nativeEvent.layout.height,
        maxCounter: newCount
      });
    }
  }

  _setMinHeight(event){
    const newCount = this.state.minCounter + 1;
    if(newCount==1) {
      this.state.expandAnimation.setValue(event.nativeEvent.layout.height);
      // console.log('min ' + event.nativeEvent.layout.height)
      this.setState({
        minHeight: event.nativeEvent.layout.height,
        minCounter: newCount
      });
    }
  }

  toggle() {
    let initialVal = this.state.expanded? this.state.maxHeight : this.state.minHeight;
    let finalVal = this.state.expanded? this.state.minHeight : this.state.maxHeight;

    this.setState({
      expanded: !this.state.expanded
    });

    this.state.expandAnimation.setValue(initialVal);

    Animated.spring(
      this.state.expandAnimation,
      {
        toValue: finalVal
      }
    ).start();
  }

  render() {
    let imgSource = arrowDown;
    if(this.state.expanded) {
      imgSource = arrowUp;
    }
    return (
      <AnimatedSectionList
        style={[styles.listItemContainer,{height: this.state.expandAnimation}]}

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