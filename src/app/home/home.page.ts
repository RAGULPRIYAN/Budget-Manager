import { Component } from '@angular/core';
import { PushNotifications } from '@capacitor/push-notifications';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor() {}

  ngOnInit() {
    this.registerNotifications();
    this.addListeners();
  }

  async addListeners  () {
    await PushNotifications.addListener('registration', token => {
      console.info('Registration token: ', token.value);
      alert('Push registration success, token: ' + token.value);
    });
  
    await PushNotifications.addListener('registrationError', err => {
      console.error('Registration error: ', err.error);
    });
  
    await PushNotifications.addListener('pushNotificationReceived', notification => {
      console.log('Push notification received: ', notification);
      alert('Push notification received:'+notification)
    });
  
    await PushNotifications.addListener('pushNotificationActionPerformed', notification => {
      console.log('Push notification action performed', notification.actionId, notification.inputValue);
      alert('Push notification action performed'+notification.actionId+ notification.inputValue)
    });
  }
  
  async registerNotifications () {
    let permStatus = await PushNotifications.checkPermissions();
  alert(JSON.stringify(permStatus))
    if (permStatus.receive === 'prompt') {
      permStatus = await PushNotifications.requestPermissions();
    }
  
    if (permStatus.receive !== 'granted') {
      alert('User denied permissions!');
    }
    if (permStatus.receive === 'granted') {
     try{
     
      await PushNotifications.register();
     }
     catch(e){
      alert(JSON.stringify(e))
     }
    }
  
    
  }
  
  async getDeliveredNotifications () {
    const notificationList = await PushNotifications.getDeliveredNotifications();
    console.log('delivered notifications', notificationList);
    // Convert the notifications to a JSON string for proper display
    alert('Delivered notifications: ' + JSON.stringify(notificationList));
  }

}
