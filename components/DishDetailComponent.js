import React from 'react';
import {View, Text} from 'react-native';
import {Card} from 'react-native-elements';


const RenderDishDetail = (props) => {

  const dish = props.dish;

    if(dish != null){
      return(
        <Card
          featuredTitle={dish.name}
          image={require('./images/uthappizza.png')}
        >
          <Text style={{margin:10}}>{dish.description}</Text>
        </Card>
      )
    }
    else{
      return(<View></View>)
    }
  
}

function DishDetail(props) {
  return (
    <RenderDishDetail dish={props.dish}/>
  )
}

export default DishDetail
