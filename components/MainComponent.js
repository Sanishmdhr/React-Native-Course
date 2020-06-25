import React, { Component } from 'react';
import Menu from './MenuComponent';
import DishDetail from './DishDetailComponent';
import Home from './HomeComponent';
import About from './AboutUsComponent';
import ContactUs from './ContactUsComponent';
import { DISHES } from '../shared/dishes';
import { View, Platform } from 'react-native';
import { createStackNavigator , createDrawerNavigator} from 'react-navigation';
import { Icon } from 'react-native-elements';



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

const AboutNavigator = createStackNavigator({
  Home:{screen:About}
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

const ContactNavigator = createStackNavigator({
  Home:{screen:ContactUs}
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
 },
 About: {
   screen:AboutNavigator,
   navigationOptions:{
     title:'About Us',
     drawerLable:"About Us"
   }
 },
 ContactUs: {
   screen:ContactNavigator,
   navigationOptions:{
     title:'Contact Us',
     drawerLable:"Contact Us"
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
