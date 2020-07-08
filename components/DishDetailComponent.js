import React, { Component } from 'react';
import { View, Text, ScrollView, FlatList } from 'react-native';
import {Icon, Card} from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';

const mapStateToProps = state => {
    return {
      dishes: state.dishes,
      comments: state.comments
    }
  }

const RenderDishDetail = (props) => {

  const dish = props.dish;

  if (dish != null) {
    return (
      <Card
        featuredTitle={dish.name}
        image={{source:{uri:baseUrl+item.image}}}
      >
        <Text style={{ margin: 10 }}>{dish.description}</Text>
        <Icon
          raised
          reverse
          name={ props.favorite ? 'heart' : 'heart-o'}
          type='font-awesome'
          color='#f50'
          onPress={() => props.favorite ? console.log('Already favorite') : props.onPress()}
          />
      </Card>
    )
  }
  else {
    return (<View></View>)
  }

}

function RenderComments (props) {

  const comments = props.comments;

  const renderCommentItem = ({item,index}) => {

    return(
      <View key={index} style={{margin:10}}>
        <Text style={{fontSize:14}}>{item.comment}</Text>
        <Text style={{fontSize:12}}>{item.rating} Stars</Text>
        <Text style={{fontSize:12}}>{`-- ${item.author}, ${item.date}`}</Text>
      </View>
    );
  };


  return(
    <Card title='Comments'>
        <FlatList
        data={comments}
        renderItem={renderCommentItem}
        keyExtractor={item => item.id.toString()}/>
    </Card> 
  )


}

class DishDetail extends Component {

  constructor(props) {
    super(props)

    this.state = {
      favorite: []
    }
  }

  static navigationOptions = {
    title: 'Dish Detail'
  }

  markFavorite (dishId){
    this.setState({
      favorite:this.state.favorite.concat(dishId)
    });
  }

  render() {

    const dishId = this.props.navigation.getParam('dishId', '');
    return (
      <ScrollView>
        <RenderDishDetail dish={this.props.dishes.dishes[+dishId]} 
            favorite={this.state.favorite.some(el => el === dishId)}
            onPress={() => this.markFavorite(dishId)}/>
        <RenderComments comments={this.props.comments.comments.filter((comment) =>
          comment.dishId === dishId)}/>
      </ScrollView>
    )
  }

}

export default connect(mapStateToProps)(DishDetail);
