import { Component, OnInit, ViewChild } from '@angular/core';
import { BudgetService } from '../services/budget.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { FcmService } from '../services/fcm.service';
import { IonSelect } from '@ionic/angular';
import { PushNotifications } from '@capacitor/push-notifications';
import { LocalNotifications } from '@capacitor/local-notifications';
import { BudgetfireService, budgets, expense } from '../services/budgetfire.service';
import { RemainderFireService, remainder } from '../services/remainder-fire.service';
import { Observable, of, timestamp } from 'rxjs';


@Component({
  selector: 'app-remainder-fire',
  templateUrl: './remainder-fire.page.html',
  styleUrls: ['./remainder-fire.page.scss'],
})
export class RemainderFirePage implements OnInit {
  todo: remainder = {
    filterId: '',
    budgetId: '',
    timestamp: new Date(),
    userId:''
  };


  public expense: Observable<expense[]> | any;
  @ViewChild('selectRemainder') selectRemainder!: IonSelect;
  budgetData:  any;
  filteredData:any
  remainderData:any[]=[]
  remainVisible:boolean=true
  statusVisible:boolean=false
  updateRemainderDrop:any
  repeatVisible:boolean=false
  filterVisible:boolean=true
  getRemain: any;

  constructor(private datePipe: DatePipe,private budget:BudgetfireService,private route: Router,private remainder:RemainderFireService) { }

  ngOnInit() {
    this.getCardData()
    this.getFilterData()
    this.getExpenseName()
   
  }

  getFilterData(){
    this.filteredData = this.budget.getFilter()
    console.log(this.filteredData,'filteredData')
  //   this.remainder.getFilter().subscribe((res:any)=>{
  // this.filteredData=res.data
  //   })
  }

getRemainderId(id:any){
// this.remainder.getRemainderId(id).subscribe((res:any)=>{
//   console.log(res,'res id checked')
// })
}

getExpenseName(){
   this.budget.getExpense().subscribe((res:any[])=>{
    console.log(res,'expense')
    this.expense  = res;
  })
}
getCardData() {
 this.budget.getBudgets().subscribe((res: any[]) => {
    this.budgetData = res;
    console.log(typeof(this.budgetData),this.budgetData, 'this.budgetData checks######33');
    for(let e of this.budgetData){
      console.log(e.id,'e checks')
      this.remainder.getExpenseByFixAmountId(e.id).subscribe((res:any)=>{
        console.log(res,'res checks in id')
        e.remainderData = res
        // console.log(typeof(e.remainderData),e.remainderData[0]?.id, 'e.remainderData checks######33');
      })
    }
  });
}

getAllRemainder(){
  this.getRemain = this.remainder.getRemainder()
}



 
  formatTimestamp(timestamp: any): any {
    if (timestamp && timestamp.toDate) {
      return this.datePipe.transform(timestamp.toDate(), 'dd/MM/yyyy  HH:mm a');
    }
    return '';
  }


  async createRemainder(event: any, todo: any) {
    console.log(todo, "todo checks in console");
    const selectedValue = event.detail.value;
    let selectedOption: any;
    console.log(selectedValue, "selectedValue in console");
    // Subscribe to filteredData to get the actual data
    this.filteredData.subscribe((data: any[]) => {
      selectedOption = data.find((e: { id: any; }) => e.id === selectedValue);
      console.log(selectedOption, 'select option');

      if (selectedOption) {
        const payDate = this.convertToDate(todo.timestamp);
        // const payDate = new Date(todo.targetDate);
        const reminderTimes = this.calculateReminderTimes(selectedOption.filterData, payDate);
        this.scheduleReminders(todo, reminderTimes);
      }
    });

    console.log(selectedValue, 'value checks');
    let payload = {
      filterId: event.detail.value,
      budgetId: todo.id,
      timestamp:new Date()
    };
    console.log(payload, 'payload checks');
    this.remainder.createRemainder(payload).then(()=>{
      this.statusVisible = true;
      this.remainVisible = false;
      this.getCardData();
    })
  
  }

  convertToDate(payDate: any): Date {
    if (payDate instanceof Date) {
      return payDate;
    } else if (typeof payDate === 'object' && payDate.seconds && payDate.nanoseconds) {
      return new Date(payDate.seconds * 1000 + payDate.nanoseconds / 1000000);
    } else {
      throw new Error('Invalid payDate format');
    }
  }

  private async scheduleReminders(todo: any, reminderTimes: Date[]) {
   const  selectedOption = this.expense.find((e: { id: any; }) => e.id === todo.expenseNameId);
    console.log(selectedOption,'selectedOption in scheduleReminders')
    console.log(reminderTimes,'reminderTimes in scheduleReminders')
    for (let reminderTime of reminderTimes) {
      await LocalNotifications.schedule({
        notifications: [
          {
            title: selectedOption.expense,
            body: `Pay ₹${todo.expenseAmount}`,
            id: Math.ceil(Math.random() * 100),
            schedule: { at: reminderTime },
            ongoing: false
          }
        ]
      });
    }
  }
  calculateReminderTimes(interval: string, payDate: Date): Date[] {
    const reminderTimes: Date[] = [];
    const reminderDate = new Date(payDate);
    reminderDate.setHours(17, 26, 0, 0); // Set time to 4:00 PM

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
    let  userId:any=localStorage.getItem("userId");
    console.log(todo.remainderData[0].id,"todo checksmm")
    const selectedValue = event.detail.value;
    let selectedOption: any;
    console.log(selectedValue, "selectedValue in console");
    // Subscribe to filteredData to get the actual data
    this.filteredData.subscribe((data: any[]) => {
      selectedOption = data.find((e: { id: any; }) => e.id === selectedValue);
      console.log(selectedOption, 'select option');

      if (selectedOption) {
        const payDate = this.convertToDate(todo.timestamp);
        // const payDate = new Date(todo.targetDate);
        const reminderTimes = this.calculateReminderTimes(selectedOption.filterData, payDate);
        this.scheduleReminders(todo, reminderTimes);
      }
    });
    console.log(selectedValue,'value checks')
    let payload = {
      filterId: event.detail.value,
      budgetId: todo.id,
      timestamp:new Date(),
      userId:userId,
      id:todo.remainderData[0].id

    };
    this.remainder.updateRemainder(payload).then(()=>{
      this.statusVisible = true;
      this.remainVisible = false;
      this.updateRemainderDrop=" "
      this.getCardData();
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
    this.remainder.deleteRemainder(id)
// this.remainder.deleteRemainder(id).subscribe((res:any)=>{
  this.getCardData()
// })
  }




}
