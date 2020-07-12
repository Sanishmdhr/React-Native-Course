import React, { Component } from 'react';
import Menu from './MenuComponent';
import DishDetail from './DishDetailComponent';
import Home from './HomeComponent';
import About from './AboutUsComponent';
import ContactUs from './ContactUsComponent';
import Reservation from './ReservationComponent';
import Favorites from './FavoriteComponents';
import { View, Platform, Text, ScrollView, Image, StyleSheet } from 'react-native';
import { createStackNavigator, createDrawerNavigator, DrawerItems, SafeAreaView } from 'react-navigation';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { fetchDishes, fetchComments, fetchPromos, fetchLeaders } from '../redux/ActionCreators';

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}

const mapDispatchToProps = dispatch => ({
  fetchDishes: () => dispatch(fetchDishes()),
  fetchComments: () => dispatch(fetchComments()),
  fetchPromos: () => dispatch(fetchPromos()),
  fetchLeaders: () => dispatch(fetchLeaders()),
})



const MenuNavigator = createStackNavigator({
  Menu: {
    screen: Menu,
    navigationOptions: ({ navigation }) => ({
      headerLeft: <Icon
        name='menu'
        size={24}
        color='white'
        onPress={() => navigation.toggleDrawer()} />
    })
  },
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

const CustomDrawerContentComponent = (props) => (
  <ScrollView>
    <SafeAreaView style={styles.container}
      forceInset={{ top: 'always', horizontal: "never" }}>
      <View style={styles.drawerHeader}>
        <View style={{ flex: 1 }}>
          <Image source={require('./images/logo.png')}
            style={styles.drawerImage} />
        </View>
        <View style={{ flex: 2 }}>
          <Text style={styles.drawerHeaderText}>Ristorante Con Fusion</Text>
        </View>
      </View>
      <DrawerItems {...props} />
    </SafeAreaView>
  </ScrollView>
);

const HomeNavigator = createStackNavigator({
  Home: { screen: Home }
},
  {
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: "#512DA8"
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        color: "#fff"
      },
      headerLeft: <Icon
        name='menu'
        size={24}
        color='white'
        onPress={() => navigation.toggleDrawer()} />
    })
  })

const AboutNavigator = createStackNavigator({
  About: { screen: About }
},
  {
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: "#512DA8"
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        color: "#fff"
      },
      headerLeft: <Icon
        name='menu'
        size={24}
        color='white'
        onPress={() => navigation.toggleDrawer()} />
    })
  })

const ContactNavigator = createStackNavigator({
  ContactUs: { screen: ContactUs }
},
  {
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: "#512DA8"
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        color: "#fff"
      },
      headerLeft: <Icon
        name='menu'
        size={24}
        color='white'
        onPress={() => navigation.toggleDrawer()} />
    })
  })

const ReservationNavigator = createStackNavigator({
  ContactUs: { screen: Reservation }
},
  {
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: "#512DA8"
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        color: "#fff"
      },
      headerLeft: <Icon
        name='menu'
        size={24}
        color='white'
        onPress={() => navigation.toggleDrawer()} />
    })
  })

  const FavoritesNavigator = createStackNavigator({
    Favorites: { screen: Favorites }
  },
    {
      navigationOptions: ({ navigation }) => ({
        headerStyle: {
          backgroundColor: "#512DA8"
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          color: "#fff"
        },
        headerLeft: <Icon
          name='menu'
          size={24}
          color='white'
          onPress={() => navigation.toggleDrawer()} />
      })
    })

const MainNavigator = createDrawerNavigator({
  Home: {
    screen: HomeNavigator,
    navigationOptions: {
      title: "Home",
      drawerLable: "Home",
      drawerIcon: ({ tintColor }) => (
        <Icon
          name='home'
          type='font-awesome'
          size={24}
          color={tintColor}
        />
      )
    }
  },
  Menu: {
    screen: MenuNavigator,
    navigationOptions: {
      title: "Menu",
      drawerLable: "Menu",
      drawerIcon: ({ tintColor }) => (
        <Icon
          name='list'
          type='font-awesome'
          size={24}
          color={tintColor}
        />
      )
    }
  },
  About: {
    screen: AboutNavigator,
    navigationOptions: {
      title: 'About Us',
      drawerLable: "About Us",
      drawerIcon: ({ tintColor }) => (
        <Icon
          name='info-circle'
          type='font-awesome'
          size={24}
          color={tintColor}
        />
      )
    }
  },
  ContactUs: {
    screen: ContactNavigator,
    navigationOptions: {
      title: 'Contact Us',
      drawerLable: "Contact Us",
      drawerIcon: ({ tintColor }) => (
        <Icon
          name='address-card'
          type='font-awesome'
          size={24}
          color={tintColor}
        />
      )
    }
  },
  Reservation: {
    screen: ReservationNavigator,
    navigationOptions: {
      title: 'Reserve Table',
      drawerLable: "Reserve Table",
      drawerIcon: ({ tintColor }) => (
        <Icon
          name='cutlery'
          type='font-awesome'
          size={24}
          color={tintColor}
        />
      )
    }
  },
  Favorites: {
    screen: FavoritesNavigator,
    navigationOptions: {
      title: 'My Favorites',
      drawerLable: "My Favorites",
      drawerIcon: ({ tintColor }) => (
        <Icon
          name='heart'
          type='font-awesome'
          size={24}
          color={tintColor}
        />
      )
    }
  }

},

  {
    drawerBackgroundColor: '#D1C4E9',
    contentComponent: CustomDrawerContentComponent

  });


export class Main extends Component {


  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();
  }

  render() {
    return (
      <View style={{ flex: 1, paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight }}>
        <MainNavigator />
      </View>

    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawerHeader: {
    backgroundColor: '#512DA8',
    height: 140,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row'
  },
  drawerHeaderText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold'
  },
  drawerImage: {
    margin: 10,
    width: 80,
    height: 60
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
