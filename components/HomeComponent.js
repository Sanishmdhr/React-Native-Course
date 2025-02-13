import React, { Component } from 'react';
import { Text, View, Animated, Easing } from 'react-native';
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

  constructor(props) {
    super(props)
    this.animatedValue = new Animated.Value(0);        

  }

  static navigationOptions = {
    title: 'Home',
  };

  componentDidMount() {
    this.animate();
  }

  animate() {
    this.animatedValue.setValue(0);
    Animated.timing(
      this.animatedValue, {
      toValue: 8,
      duration: 8000,
      easing: Easing.linear
    }
    ).start(() => this.animate())
  }


  render() {

    const xpos1 = this.animatedValue.interpolate({
      inputRange: [0, 1, 3, 5, 8],
      outputRange: [1200, 600, 0, -600, -1200]
    })
    const xpos2 = this.animatedValue.interpolate({
      inputRange: [0, 2, 4, 6, 8],
      outputRange: [1200, 600, 0, -600, -1200]
    })
    const xpos3 = this.animatedValue.interpolate({
      inputRange: [0, 3, 5, 7, 8],
      outputRange: [1200, 600, 0, -600, -1200]
    })

    return (
      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
        <Animated.View style={{ width: '100%', transform: [{ translateX: xpos1 }] }}>
          <RenderItem item={this.props.dishes.dishes.filter((dish) =>
            dish.featured)[0]}
            isLoading={this.props.dishes.isLoading}
            errmess={this.props.dishes.errmess} />
        </Animated.View>
        <Animated.View style={{ width: '100%', transform: [{ translateX: xpos2 }] }}>
          <RenderItem item={this.props.promos.promos.filter((promo) =>
            promo.featured)[0]}
            isLoading={this.props.promos.isLoading}
            errmess={this.props.promos.errmess} />
        </Animated.View>
        <Animated.View style={{ width: '100%', transform: [{ translateX: xpos3 }] }}>
          <RenderItem item={this.props.leaders.leaders.filter((leader) =>
            leader.featured)[0]}
            isLoading={this.props.leaders.isLoading}
            errmess={this.props.leaders.errmess} />
        </Animated.View>

      </View>
    );
  }
}

export default connect(mapStateToProps)(Home);
