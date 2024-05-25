import { Component, OnInit, ViewChild } from '@angular/core';
import { BudgetService } from '../services/budget.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { FcmService } from '../services/fcm.service';
import { IonSelect } from '@ionic/angular';
import { PushNotifications } from '@capacitor/push-notifications';
import { LocalNotifications } from '@capacitor/local-notifications';


@Component({
  selector: 'app-remainder',
  templateUrl: './remainder.page.html',
  styleUrls: ['./remainder.page.scss'],
})
export class RemainderPage implements OnInit {
  @ViewChild('selectRemainder') selectRemainder!: IonSelect;
  budgetData:any
  filteredData:any
  remainderData:any
  remainVisible:boolean=true
  statusVisible:boolean=false
  updateRemainderDrop:any
  constructor(private datePipe: DatePipe,private budget:BudgetService,private route: Router,private remainder:FcmService) { }

  ngOnInit() {
    this.getCardData()
    this.getFilterData()
   
  }

getFilterData(){
  this.remainder.getFilter().subscribe((res:any)=>{
this.filteredData=res.data
  })
}

getRemainderId(id:any){
this.remainder.getRemainderId(id).subscribe((res:any)=>{
  console.log(res,'res id checked')
})
}

getCardData() {
  this.budget.getAllBudgets().subscribe((res: any) => {
    this.budgetData = res.data;
  
    for (let e of this.budgetData) {
      this.remainder.getRemainderWiseBudgetId(e.budgetId).subscribe((res: any) => {
        e.remainderData = res.data; // Assuming each budget item should have remainder data
     
      });
    }
   
  });
}


  formatTargetDate(targetDate: string): string {
    const formattedDate = new Date(targetDate);
    return this.datePipe.transform(formattedDate, 'dd/MM/yyyy') || '';
  }

 async createRemainder(event:any,todo:any){
    console.log(todo,"todo checks")
    const selectedValue = event.detail.value;
    const selectedOption = this.filteredData.find((e: { id: any; }) => e.id === selectedValue);
    console.log(selectedOption,'select option')
    const payDate = new Date(todo.payDate);
    const reminderTimes = this.calculateReminderTimes(selectedOption.filterData, payDate);
    for (let reminderTime of reminderTimes) {
      await LocalNotifications.schedule({
        notifications: [
          {
            title: todo.expenseName,
            body: `Pay ₹${todo.expenseAmount}`,
            id: Math.ceil(Math.random() * 100),
            schedule: { at: reminderTime },
            ongoing: false
          }
        ]
      });
    }
    // if (selectedOption) {
    //   const payDate = new Date(todo.payDate);
    //   const now = new Date();
    //   let reminderDate;

    //   if (selectedOption.filterData === 'Daily') {
    //     // Set reminder time to 10:00 AM every day
    //     reminderDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 14, 48, 0, 0);
    //     if (reminderDate < now) {
    //       reminderDate.setDate(reminderDate.getDate() + 1); // Schedule for the next day if 10 AM has passed
    //     }

    //     // Schedule the daily notification
    //     await LocalNotifications.schedule({
    //       notifications: [
    //         {
    //           title: "Daily Reminder",
    //           body: `Reminder for ${todo.expenseName}`,
    //           id: todo.id, // Use a unique ID for each notification
    //           schedule: { repeats: true, every: 'day', on: { hour: 14, minute:48 } },
    //           // sound: null,
    //           // attachments: null,
    //           actionTypeId: "",
    //           extra: null
    //         }
    //       ]
    //     });

    //     alert(`Daily notification scheduled for 10:00 AM starting from ${reminderDate.toLocaleDateString()}`);

    //   } else if (selectedOption.filterData === 'Monthly') {
    //     // Set reminder for 30 days after the payDate
    //     reminderDate = new Date(payDate);
    //     reminderDate.setDate(payDate.getDate() + 30);

    //     // Schedule the monthly notification
    //     await LocalNotifications.schedule({
    //       notifications: [
    //         {
    //           title: "Monthly Reminder",
    //           body: `Reminder for ${todo.expenseName}`,
    //           id: todo.id, // Use a unique ID for each notification
    //           schedule: { at: reminderDate },
    //           // sound: null,
    //           // attachments: null,
    //           actionTypeId: "",
    //           extra: null
    //         }
    //       ]
    //     });

    //     alert(`Monthly notification scheduled for ${reminderDate.toLocaleDateString()}`);
    //   }
    // }
    // else   if (selectedOption.filterData === 'Weekly') {
    //   const payDate = new Date(todo.payDate);
    //   const reminderDate = new Date(payDate);
    //   reminderDate.setDate(payDate.getDate() + 7); // 7 days later for weekly reminder

    //   // Schedule the notification
    //   await LocalNotifications.schedule({
    //     notifications: [
    //       {
    //         title: "Weekly Reminder",
    //         body: `Reminder for ${todo.expenseName}`,
    //         id: todo.id, // Use a unique ID for each notification
    //         schedule: { at: reminderDate },
    //         // sound: null,
    //         // attachments: null,
    //         actionTypeId: "",
    //         extra: null
    //       }
    //     ]
    //   });

    //   alert(`Notification scheduled for ${reminderDate.toLocaleDateString()}`);
    // }
    console.log(selectedValue,'value checks')
    let payload={
      filterId:event.detail.value,
      budgetId:todo.budgetId
    }
    this.remainder.addRemainder(payload).subscribe((res:any)=>{
      console.log(res,'res checks')
      this.statusVisible=true
      this.remainVisible=false
      this.getCardData()
    })

  }
  calculateReminderTimes(interval: string, payDate: Date): Date[] {
    const reminderTimes: Date[] = [];
    const reminderDate = new Date(payDate);
    reminderDate.setHours(16, 37, 0, 0); // Set time to 4:00 PM

    if (interval === 'Daily') {
      // For daily, schedule reminder at 4:00 PM every day
      for (let i = 0; i < 7; i++) {
        const nextDay = new Date(reminderDate);
        nextDay.setDate(reminderDate.getDate() + i);
        reminderTimes.push(nextDay);
      }
    } else if (interval === 'Weekly') {
      // For weekly, schedule reminder at 4:00 PM once a week
      reminderDate.setDate(reminderDate.getDate() + 7);
      reminderTimes.push(reminderDate);
    } else if (interval === 'Monthly') {
      // For monthly, schedule reminder at 4:00 PM once a month
      reminderDate.setMonth(reminderDate.getMonth() + 1);
      reminderTimes.push(reminderDate);
    }

    return reminderTimes;
  }


  updateRemainder(event:any,todo:any){
    console.log(todo.remainderData.id,"todo checksmm")
    const selectedValue = event.detail.value;
    console.log(selectedValue,'value checks')
    let payload={
      filterId:event.detail.value,
      budgetId:todo.budgetId
    }
    this.remainder.updateRemainder(todo.remainderData.id,payload).subscribe((res:any)=>{
      console.log(res,'res checks')
      this.statusVisible=true
      this.remainVisible=false
      this.updateRemainderDrop=" "
      this.getCardData()
    })
  }

  async showLocalNotification() {
    await LocalNotifications.schedule({
        notifications: [
            {

                title: "My App",
                body: "Your upate is ready",
                id: Math.ceil(Math.random() * 100), // any random int
                schedule: { at: new Date(Date.now() + 1000 * 5) },
                // sound: null,
                ongoing: false // (optional, default: false)
                //if ongoing:true, this notification can't be cleared
            }
        ]
    });
}
// }

  deleteRemainder(id:any){
this.remainder.deleteRemainder(id).subscribe((res:any)=>{
  this.getCardData()
})
  }



  

}
