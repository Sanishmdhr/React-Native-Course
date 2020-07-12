import React, { Component } from 'react'
import { View, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { ListItem } from 'react-native-elements';
import { Loading } from './LoadingComponent';


const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    favorite:state.favorite 
  }
}


class Favorites extends Component {


  
  static navigationOptions = {
    title: 'My Favorites'
  };

  render() {
    
    const {navigate} = this.props.navigation;

    const renderMenuItem = ({item, index}) => {
      return (
        
        <ListItem
          key={index}
          title={item.name}
          subtitle={item.description}
          onPress={() => navigate('DishDetail', {dishId: item.id})}
          leftAvatar={{source:{uri: baseUrl+ item.image}}}
        />

      );
    };

    if(this.props.dishes.isLoading){
      return (
        <Loading/>
      )
    }

    else if(this.props.dishes.errmess){
      return (
        <View>
          <Text>{this.props.dishes.errmess}</Text>
        </View>
      )
    }

    else{
      return(
        <FlatList
          data={this.props.dishes.dishes.filter(dish => this.props.favorite.some(el => el === dish.id))}
          renderItem={renderMenuItem}
          keyExtractor={item => item.id.toString()}

        />
      )
    }


  }
}

export default connect(mapStateToProps)(Favorites);

