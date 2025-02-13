import React, { Component } from 'react'
import { Text, StyleSheet, Picker, Switch, View, Button, ScrollView, Modal, Alert } from 'react-native';
import Datepicker from 'react-native-datepicker';
import * as Animatable from 'react-native-animatable';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';

class Reservation extends Component {

  constructor(props) {
    super(props)

    this.state = {
      guest: 1,
      smoking: false,
      date: '',
      showModal: false
    }

  }

  static navigationOptions = {
    title: 'Reserve Table'
  };

  toggleModal() {
    this.setState({ showModal: !this.state.showModal })
  }

  
 


  handleReservation() {
    console.log(JSON.stringify(this.state));
    // this.toggleModal();

    Alert.alert(
      'Is your reservation ok ?',
      `Number of Guests: ${this.state.guest} \n Smoking ? : ${this.state.smoking ? 'Yes' : 'No'} \n Date and Time : ${this.state.date}`,
      [
        {
          text: 'CANCEL',
          style: 'cancel',
          onPress: () => {
            console.log('Cancel Pressed')
            this.resetForm()
          }
        },
        {
          text: 'OK',
          onPress: () => { 
         this.presentLocalNotification(this.state.date)
          this.resetForm()}
        }
      ]


    )

  }

  resetForm() {
    this.setState({
      guests: 1,
      smoking: false,
      date: '',
      showModal: false
    });
  }
  async obtainNotificationPermission() {
    let permission = await Permissions.getAsync(Permissions.USER_FACING_NOTIFICATIONS);
    if (permission.status !== 'granted') {
        permission = await Permissions.askAsync(Permissions.USER_FACING_NOTIFICATIONS);
        if (permission.status !== 'granted') {
            Alert.alert('Permission not granted to show notifications');
        }
    }
    return permission;
}

async presentLocalNotification(date) {
    await this.obtainNotificationPermission();
    Notifications.presentNotificationAsync({
        title: 'Your Reservation',
        body: 'Reservation for '+ date + ' requested',
        ios: {
            sound: true
        },
        android: {
            sound: true,
            vibrate: true,
            color: '#512DA8'
        }
    });
}


  render() {
    return (
      <Animatable.View animation='zoomIn' duration={2000}>
        <ScrollView>
          <View style={styles.formRow}>
            <Text style={styles.formLabel}>Number of guests</Text>
            <Picker
              style={styles.formItem}
              selectedValue={this.state.guest}
              onValueChange={(itemValue, itemIndex) => this.setState({ guest: itemValue })}>
              <Picker.Item label='1' value='1' />
              <Picker.Item label='2' value='2' />
              <Picker.Item label='3' value='3' />
              <Picker.Item label='4' value='4' />
              <Picker.Item label='5' value='5' />
              <Picker.Item label='6' value='6' />
            </Picker>
          </View>
          <View style={styles.formRow}>
            <Text style={styles.formLabel}>Smoking/Non-Smoking?</Text>
            <Switch
              style={styles.formItem}
              value={this.state.smoking}
              onTintColor='#512DA8'
              onValueChange={(value) => this.setState({ smoking: value })}
            >
            </Switch>
          </View>
          <View style={styles.formRow}>
            <Text style={styles.formLabel}>Date and Time</Text>
            <Datepicker
              style={{ flex: 2, marginRight: 10 }}
              date={this.state.date}
              format=''
              mode="datetime"
              placeholder="select date and Time"
              minDate="2020-07-10"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {
                  position: 'absolute',
                  left: 0,
                  top: 4,
                  marginLeft: 0
                },
                dateInput: {
                  marginLeft: 36
                }
              }}
              onDateChange={(date) => { this.setState({ date: date }) }}
            />
          </View>
          <View style={styles.formRow}>
            <Button
              title='Reserve'
              color="#512DA8"
              accessibilityLabel="Learn more about this purple button"
              onPress={() => this.handleReservation()}
            />
          </View>
        </ScrollView>
      </Animatable.View>
      // <Modal
      //   animationType={'slide'}
      //   transparent={false}
      //   visible={this.state.showModal}
      //   onDismiss={() => this.toggleModal()}
      //   onRequestClose={() => this.toggleModal()}
      // >
      //   <View style={styles.modal}>
      //     <Text style={styles.modalTitle}>Your Reservation</Text>
      //     <Text style={styles.modalText}>Number of Guests: {this.state.guest}</Text>
      //     <Text style={styles.modalText}>Smoking ? : {this.state.smoking ? 'Yes' : 'No'}</Text>
      //     <Text style={styles.modalText}>Date and Time : {this.state.date}</Text>

      //     <Button
      //       title="Close"
      //       onPress={() => { this.toggleModal(); this.resetForm() }}
      //       color="#512DA8"
      //     />
      //   </View>

      // </Modal>
    )
  }


}

const styles = StyleSheet.create({
  formRow: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row',
    margin: 20
  },
  formLabel: {
    fontSize: 15,
    flex: 2
  },
  formItem: {
    flex: 1
  },
  modal: {
    justifyContent: 'center',
    margin: 20
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    backgroundColor: '#512DA8',
    textAlign: 'center',
    color: 'white',
    marginBottom: 20
  },
  modalText: {
    fontSize: 18,
    margin: 10
  }

})

export default Reservation

