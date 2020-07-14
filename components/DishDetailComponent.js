import React, { Component, useState } from 'react';
import { View, Text, ScrollView, FlatList, StyleSheet, Modal, Button, Alert, PanResponder, Share } from 'react-native';
import { Icon, Card, Input, Rating } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postFavorite, postComment } from '../redux/ActionCreators';
import * as Animatable from 'react-native-animatable';

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    favorite: state.favorite
  }
}

const mapDispatchToProps = dispatch => ({
  postFavorite: (dishId) => dispatch(postFavorite(dishId)),
  postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment))
})

const RenderDishDetail = (props) => {

  const dish = props.dish;

  handleViewRef = ref => this.view = ref;

  const shareDish = (title, message, url) => {
    Share.share({
      title: title,
      message: title + ':' + message + '' + url,
      url: url
    },
      {
        dialogTitle: "Share" + title
      })
  };

  const recognizingDrag = ({ moveX, moveY, dx, dy }) => {
    if (dx < -200) {
      return true;
    }
    else {
      return false;
    }
  }


  const recognizingLeftDrag = ({ moveX, moveY, dx, dy }) => {
    if (dx > -200) {
      return true;
    }
    else {
      return false;
    }
  }

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: (e, gestureState) => {
      return true;
    },

    onPanResponderGrant: () => {
      this.view.rubberBand(1000)
        .then(endState => console.log(endState.finished ? 'finished' : 'cancelled'));
    },

    onPanResponderEnd: (e, gestureState) => {
      console.log('pan responder end', gestureState);
      if (recognizingDrag(gestureState)) {
        Alert.alert(
          'Add Favorite',
          'Are you sure you wish to add ' + dish.name + ' to favorite?',
          [
            { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
            { text: 'OK', onPress: () => { props.favorite ? console.log('Already favorite') : props.onPress() } },
          ],
          { cancelable: false }
        );

        return true;
      }

      if (recognizingLeftDrag(gestureState)) {
        props.toggleModal();

        return true;
      }
    }
  })
  if (dish != null) {
    return (
      <Animatable.View animation="fadeInDown" duration={2000} delay={1000}
        ref={this.handleViewRef}
        {...panResponder.panHandlers}>
        <Card
          featuredTitle={dish.name}
          image={{ uri: baseUrl + dish.image }}
        >
          <Text style={{ margin: 10 }}>{dish.description}</Text>
          <View style={styles.iconContainer}>
            <Icon
              raised
              reverse
              name={props.favorite ? 'heart' : 'heart-o'}
              type='font-awesome'
              color='#f50'
              onPress={() => props.favorite ? console.log('Already favorite') : props.onPress()}
            />
            <Icon
              raised
              reverse
              name='pencil'
              type='font-awesome'
              color='#5f27cd'
              onPress={() => props.toggleModal()}
            />

            <Icon
              raised
              reverse
              name='share'
              type='font-awesome'
              color='#51D2A8'
              style={styles.cardItem}
              onPress={() => shareDish(dish.name, dish.description, baseUrl + dish.image)} />
          </View>
        </Card>
      </Animatable.View>
    )
  }
  else {
    return (<View></View>)
  }

}

function RenderComments(props) {

  const comments = props.comments;



  const renderCommentItem = ({ item, index }) => {

    return (
      <View key={index} style={{ margin: 10 }}>
        <Text style={{ fontSize: 14 }}>{item.comment}</Text>
        <Rating
          imageSize={12}
          readonly
          startingValue={item.rating}
          style={styles.rating}
        />
        <Text style={{ fontSize: 12 }}>{`-- ${item.author}, ${item.date}`}</Text>
      </View>
    );
  };


  return (
    <Animatable.View animation='fadeInUp' duration={2000} delay={1000}>
      <Card title='Comments'>
        <FlatList
          data={comments}
          renderItem={renderCommentItem}
          keyExtractor={item => item.id.toString()} />
      </Card>
    </Animatable.View>
  )


}

class DishDetail extends Component {

  constructor(props) {
    super(props)

    this.state = {
      showModal: false,
      rating: 1,
      author: '',
      comment: ''
    }
  }

  toggleModal() {
    this.setState({ showModal: !this.state.showModal })
  }

  static navigationOptions = {
    title: 'Dish Detail'
  }

  markFavorite(dishId) {
    this.props.postFavorite(dishId);
    console.log('clicked')
  }

  handleSubmit(dishId) {


    this.props.postComment(dishId, this.state.rating, this.state.author, this.state.comment)

  }

  resetState() {
    this.setState({
      rating: 1,
      author: '',
      comment: ''
    })
  }
  render() {

    const dishId = this.props.navigation.getParam('dishId', '');
    return (
      <ScrollView>
        <RenderDishDetail dish={this.props.dishes.dishes[+dishId]}
          favorite={this.props.favorite.some(el => el === dishId)}
          onPress={() => this.markFavorite(dishId)}
          toggleModal={() => this.toggleModal()} />
        <RenderComments comments={this.props.comments.comments.filter((comment) =>
          comment.dishId === dishId)} />

        <Modal
          animationType={'slide'}
          transparent={false}
          visible={this.state.showModal}
          onDismiss={() => this.toggleModal()}
          onRequestClose={() => this.toggleModal()}
        >
          <View style={styles.modal}>
            <Rating
              showRating
              style={{ paddingVertical: 10 }}
              onFinishRating={(value) => this.setState({ rating: value })}
            />
            <Input
              placeholder='Author'
              leftIcon={{ type: 'font-awesome', name: 'user-o' }}
              value={this.state.author}
              onChangeText={(author) => this.setState({ author: author })}
            />
            <Input
              placeholder='Comment'
              leftIcon={{ type: 'font-awesome', name: 'comment-o' }}
              value={this.state.comment}
              onChangeText={(comment) => this.setState({ comment: comment })}
            />
            <View style={styles.button}>
              <Button
                title="Submit"
                onPress={() => { this.toggleModal(); this.handleSubmit(dishId); this.resetState() }}
                color="#512DA8"
              />
            </View>
            <Button
              title="Cancel"
              onPress={() => { this.toggleModal(); this.resetState() }}
              color="#636e72"
            />
          </View>
        </Modal>
      </ScrollView>
    )
  }

}

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: "center",
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row'
  },
  modal: {
    justifyContent: 'center',
    margin: 20
  },
  button: {
    marginBottom: 20
  },
  rating: {
    alignItems: 'flex-start'
  }

})

export default connect(mapStateToProps, mapDispatchToProps)(DishDetail);
