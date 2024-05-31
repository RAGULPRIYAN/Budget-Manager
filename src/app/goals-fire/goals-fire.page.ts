import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { GoalService } from '../services/goal.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { GoalfireService, goal } from '../services/goalfire.service';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-goals-fire',
  templateUrl: './goals-fire.page.html',
  styleUrls: ['./goals-fire.page.scss'],
})
export class GoalsFirePage implements OnInit {


  todo: goal = {
    goalName: '',
    goalAmount: '',
    savedAmount: '',
    timestamp: new Date(),
    targetDate: new Date(),
    userId:''
  };
  updateTodo: goal = {
    goalName: '',
    goalAmount: '',
    savedAmount: '',
    timestamp: new Date(),
    targetDate: new Date(),
    userId:''
  };
  goalName:string =''
  goalAmount:string=''
  savedAmount:string=''
  targetDate:Date | undefined
  goalData:any
  buffer: number = 0;
  progress = 0;
  goalDatas:any
  goalId:any
  modalVisible:Boolean=false
  //update

  updateGoalName:string =''
  updateGoalAmount:string=''
  updateSavedAmount:string=''
  updateTargetDate:Date | undefined

  constructor(private toastController: ToastController,private datePipe: DatePipe,private goal:GoalfireService ,private modalController: ModalController,private route: Router) { }

  ngOnInit() {
    this.getGoal()
  }
  

  ionViewWillEnter(){
    this.getGoal()
  }


  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color,
      position: 'top',
    });
    toast.present();
  }

  formatTargetDate(targetDate: string): string {
    const formattedDate = new Date(targetDate);
    return this.datePipe.transform(formattedDate, 'dd/MM/yyyy') || '';
  }

  calculateProgress(savedAmount: number, goalAmount: number): number {
    // console.log(savedAmount,goalAmount,'checks')
    if (goalAmount <= 0) {
      return 0; // Handle the case where goalAmount is zero or negative to avoid division by zero
    }
   let data=(savedAmount / goalAmount) * 100;
  //  console.log(data,'dTA')
    return data
  }
  

  getGoal(){
   
    this.goalData = this.goal.getGoal()
    console.log(this.goalData ,'this.goalData ')
  }


  goToEdit(id:any){
    // this.goal.getGoalId(id).subscribe((res:any)=>{
    //   console.log(res,'res checks id')
    //   this.goalId = id
    //   this.modalVisible=true
    //   this.updateGoalName=res.data[0].goalName
    //   this.updateGoalAmount=res.data[0].goalAmount
    //   this.updateSavedAmount=res.data[0].savedAmount
    //   this.updateTargetDate=res.data[0].targetDate
     
    // })
  
           this.goal.getGoalId(id).subscribe(todo => {
            this.modalVisible=true
             this.updateTodo = todo!;
             console.log(this.updateTodo,'todo checks)))')
            
           });
         
  }


  deleteGoal(id:any){
    this.goal.deleteGoals(id)
    this.getGoal()

// this.goal.deleteGoal(id).subscribe((res:any)=>{
//   console.log(res,'res checks')
//   this.getGoal()
// })
  }

 
//   saveGoal(){
// // let payload={
// //   goalName:this.goalName,
// //   goalAmount:this.goalAmount,
// //   savedAmount:this.savedAmount,
// //   targetDate:this.targetDate
// // }
// // console.log(payload,'payload checks')
// // this.goal.addGoal(payload).subscribe({  
// //   next: (res: any) => { 
// //     this.getGoal()
// //     this.modalController.dismiss();
// //     this.goalName = ''
// //     this.goalAmount=''
// //     this.savedAmount=''
// //   },
// //   error: (err) => {
// //     console.log("error", err);  
// //   },    
  
// // });
// this.goal.createGoal(this.todo).then(() => {
//   this.getGoal()
//   this.modalController.dismiss();
//   this.todo.goalName = ''
//   this.todo.goalAmount = ''
//   this.todo.savedAmount = ''
 
  
// }, err => {
//   // this.showToast('There was a some problem in adding your todo :(');  
// });
//   }

saveGoal() {
  // Check if goalName is not empty and contains only text characters
  if (!this.todo.goalName || !/^[a-zA-Z ]+$/.test(this.todo.goalName.trim())) {
   console.log(' message or handle invalid input')
   this.presentToast('Only text is allowed for Goal Name.', 'danger');
    return; // Exit function if validation fails
  }

  // Check if goalAmount and savedAmount are numeric
  if (isNaN(parseFloat(this.todo.goalAmount)) || isNaN(parseFloat(this.todo.savedAmount))) {
    console.log(' message or handle invalid input')
    this.presentToast('Only Numberic is allowed for Amount.', 'danger');
    return; // Exit function if validation fails
  }

   // Check if goalAmount is higher than savedAmount
   if (parseFloat(this.todo.goalAmount) <= parseFloat(this.todo.savedAmount)) {
    console.log('goal Amount is higher than savedAmount')
    this.presentToast('Goal Amount is higher than savedAmount', 'danger');
    return; // Exit function if validation fails
  }

  // Check if all fields are filled
  if (!this.todo.goalName || !this.todo.goalAmount || !this.todo.savedAmount || !this.todo.targetDate) {
    console.log(' message or handle incomplete input')
    this.presentToast('Incomplete input', 'danger');
    return; // Exit function if validation fails
  }

  // All validations passed, proceed to create the goal
  this.goal.createGoal(this.todo).then(() => {
    this.getGoal();
    this.modalController.dismiss();
    this.presentToast('Goal Created Successfully', 'success');
    this.todo.goalName = '';
    this.todo.goalAmount = '';
    this.todo.savedAmount = '';
  }, err => {
    // Handle error if goal creation fails
  });
}


  updateGoal(){
    // let payload={
    //   goalName: this.updateGoalName,
    //   goalAmount: this.updateGoalAmount,
    //   savedAmount: this.updateSavedAmount,
    //   targetDate: this.updateTargetDate
    // }
    // console.log(payload,'payload checks')
    // this.goal.updateGoal(this.goalId,payload).subscribe({  
    //   next: (res: any) => { 
    //     this.getGoal()
    //     this.modalController.dismiss();
    //     this.updateGoalName = ''
    //     this.updateGoalAmount=''
    //     this.updateSavedAmount=''
       
    //   },
    //   error: (err) => {
    //     console.log("error", err);  
    //   },    
      
    // });
    // Check if goalName is not empty and contains only text characters
  if (!this.updateTodo.goalName || !/^[a-zA-Z ]+$/.test(this.updateTodo.goalName.trim())) {
    console.log(' message or handle invalid input')
    this.presentToast('Only text is allowed for Goal Name.', 'danger');
     return; // Exit function if validation fails
   }
 
   // Check if goalAmount and savedAmount are numeric
   if (isNaN(parseFloat(this.updateTodo.goalAmount)) || isNaN(parseFloat(this.updateTodo.savedAmount))) {
     console.log(' message or handle invalid input')
     this.presentToast('Only Number is allowed for Amount.', 'danger');
     return; // Exit function if validation fails
   }


   // Check if goalAmount is higher than savedAmount
   if (parseFloat(this.updateTodo.goalAmount) <= parseFloat(this.updateTodo.savedAmount)) {
    this.presentToast('Goal Amount is higher than savedAmount', 'danger');
    // console.log('goal Amount is higher than savedAmount')
    return; // Exit function if validation fails
  }
 
   // Check if all fields are filled
   if (!this.updateTodo.goalName || !this.updateTodo.goalAmount || !this.updateTodo.savedAmount || !this.updateTodo.targetDate) {
    this.presentToast('Incomplete input', 'danger');
    //  console.log(' message or handle incomplete input')
     return; // Exit function if validation fails
   }
    this.goal.updateGoal(this.updateTodo).then(()=>{
      this.modalController.dismiss();
      this.getGoal();
      this.presentToast('Goal Updated Successfully', 'success');
      this.updateTodo.goalName = ''
      this.updateTodo.goalAmount = ''
      this.updateTodo.savedAmount = ''
      this.modalVisible=false
     
    })
  }

  closeModal(){
    this.modalVisible=false
  }

}
