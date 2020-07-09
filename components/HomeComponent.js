import React, { Component } from 'react';
import { Text, ScrollView, View } from 'react-native';
import { Card } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { Loading } from './LoadingComponent';

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promos: state.promos,
    leaders: state.leaders
  }
}
function RenderItem(props) {

  const item = props.item;

  if (props.isLoading) {
    return (
      <Loading />
    )
  }

  else if (props.errmess) {
    return (
      <View>
        <Text>{props.errmess}</Text>
      </View>
    )
  }

  else {
    if (item != null) {
      return (
        <Card
          featuredTitle={item.name}
          featuredSubtitle={item.designation}
          image={{ uri: baseUrl + item.image }}>
          <Text
            style={{ margin: 10 }}>
            {item.description}</Text>
        </Card>
      );
    }
    else {
      return (<View></View>);
    }
  }

}

export class Home extends Component {

  static navigationOptions = {
    title: 'Home',
  };



  render() {

    return (
      <ScrollView>
        <RenderItem item={this.props.dishes.dishes.filter((dish) =>
          dish.featured)[0]} 
          isLoading={this.props.dishes.isLoading}
          errmess={this.props.dishes.errmess}/>
        <RenderItem item={this.props.promos.promos.filter((promo) =>
          promo.featured)[0]} 
          isLoading={this.props.promos.isLoading}
          errmess={this.props.promos.errmess}/>
        <RenderItem item={this.props.leaders.leaders.filter((leader) =>
          leader.featured)[0]} 
          isLoading={this.props.leaders.isLoading}
          errmess={this.props.leaders.errmess}/>
      </ScrollView>
    );
  }
}

export default connect(mapStateToProps)(Home);
