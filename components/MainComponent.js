import React, { Component } from 'react';
import Menu from './MenuComponent';
import DishDetail from './DishDetailComponent';
import Home from './HomeComponent';
import { DISHES } from '../shared/dishes';
import { View, Platform } from 'react-native';
import { createStackNavigator , createDrawerNavigator} from 'react-navigation';


const MenuNavigator = createStackNavigator({
  Menu: { screen: Menu },
  DishDetail: { screen: DishDetail }
},
{
  initialRouteName: 'Menu',
  navigationOptions: {
      headerStyle: {
          backgroundColor: "#512DA8"
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
          color: "#fff"            
      }
  }
}
);

const HomeNavigator = createStackNavigator({
  Home:{screen:Home}
},
{
  navigationOptions: ({navigation}) => ({
      headerStyle: {
          backgroundColor: "#512DA8"
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
          color: "#fff"            
      }
  })
})

const MainNavigator = createDrawerNavigator({
 Home:{
   screen:HomeNavigator,
   navigationOptions:{
     title:"Home",
     drawerLable:"Home"
   }
 },
 Menu:{
    screen:MenuNavigator,
     navigationOptions:{
       title:"Menu",
       drawerLable:"Menu"
     } 
 }

},
{
  drawerBackgroundColor: '#D1C4E9'
});


export class Main extends Component {

  render() {
    return (
      <View style={{flex:1, paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight }}>
        <MainNavigator/>
      </View>

    )
  }
}

export default Main
