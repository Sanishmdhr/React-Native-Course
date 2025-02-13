import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Card , Button, Icon} from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import * as MailComposer from 'expo-mail-composer';
 

export class ContactUs extends Component {

  static navigationOptions = {
    title:"Contact Us"
  }

  sendMail(){
    MailComposer.composeAsync({
      recipients:['sanish.manandhar20@gmail.com'],
      subject:'test ok ',
      body:'you are the don'
    })
  }
  render() {
    return (
      <Animatable.View animation='fadeInDown' duration={2000} delay={1000}>
        <Card title='Contact Information'>
          <Text>121, Clear Water Bay </Text>
           <Text>Clear Water Bay, Kowloon</Text> 
           <Text>HONG KONG</Text> 
            <Text>Tel: +852 1234 5678</Text>
            <Text>Fax: +852 8765 4321</Text>
            <Text>Email:confusion@food.net</Text>
         <Button
          title='Send Email'
          buttonStyle={{backgroundColor:'#512DA8'}}
          icon={<Icon name="envelope-o" type='font-awesome' color='white'/>}
          onPress={this.sendMail}
         />
        </Card>

        </Animatable.View>
        )
  }
}

export default ContactUs
