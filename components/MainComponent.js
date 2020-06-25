import React, { Component } from 'react';
import Menu from './MenuComponent';
import DishDetail from './DishDetailComponent';
import { DISHES } from '../shared/dishes';
import { View, Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';

const Navigator = createStackNavigator({
  Menu: { screen: Menu },
  DishDetail: { screen: DishDetail }
},
  {
    initialRouteName: 'Menu',
    navigationOptions: {
      headStyle: {
        backgroundColor: "#512DA8"
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        color: "#fff"
      }
    }
  })

  const MenuNavigator = createAppContainer(Navigator);

export class Main extends Component {

  render() {
    return (
      <View style={{flex:1, paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight }}>
        <MenuNavigator/>
      </View>

    )
  }
}

export default Main
