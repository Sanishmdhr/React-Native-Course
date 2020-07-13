import React, { Component } from 'react'
import { View, FlatList, Alert } from 'react-native';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { ListItem } from 'react-native-elements';
import { Loading } from './LoadingComponent';
import { deleteFavorites } from '../redux/ActionCreators';
import Swipeout from 'react-native-swipeout';
import * as Animatable from 'react-native-animatable';

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    favorite: state.favorite
  }
}

const mapDispatchToProps = (dispatch) => ({
  deleteFavorites: (dishId) => dispatch(deleteFavorites(dishId))
})


class Favorites extends Component {



  static navigationOptions = {
    title: 'My Favorites'
  };

  render() {

    const { navigate } = this.props.navigation;

    const renderMenuItem = ({ item, index }) => {

      const rightButton = [
        {
          text: 'Delete',
          type: 'delete',
          onPress: () => {
            Alert.alert(
              'Delete Favorite?',
              "Are you sure your wish to delete the favorite dish"+item.name+"?",
              [
                {
                  text:'Cancel',
                  onPress:() => console.log(item.name + "Not Deleted"),
                  style:'cancel'
                },
                {
                  text:"Ok",
                  onPress:() => this.props.deleteFavorites(item.id)
                }
              ],
              {cancelable:false}
            )
          }
        }
      ]

      return (
        <Swipeout right={rightButton} autoClose={true}>
          <Animatable.View animation='fadeInRightBig' duration={2000}>
          <ListItem
            key={index}
            title={item.name}
            subtitle={item.description}
            onPress={() => navigate('DishDetail', { dishId: item.id })}
            leftAvatar={{ source: { uri: baseUrl + item.image } }}
          />
          </Animatable.View>
        </Swipeout>


      );
    };

    if (this.props.dishes.isLoading) {
      return (
        <Loading />
      )
    }

    else if (this.props.dishes.errmess) {
      return (
        <View>
          <Text>{this.props.dishes.errmess}</Text>
        </View>
      )
    }

    else {
      return (
        <FlatList
          data={this.props.dishes.dishes.filter(dish => this.props.favorite.some(el => el === dish.id))}
          renderItem={renderMenuItem}
          keyExtractor={item => item.id.toString()}

        />
      )
    }


  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);

