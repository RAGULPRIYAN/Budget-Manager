import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { GoalService } from '../services/goal.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { GoalfireService, goal } from '../services/goalfire.service';


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

  constructor(private datePipe: DatePipe,private goal:GoalfireService ,private modalController: ModalController,private route: Router) { }

  ngOnInit() {
    this.getGoal()
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
// this.goal.deleteGoal(id).subscribe((res:any)=>{
//   console.log(res,'res checks')
//   this.getGoal()
// })
  }

 
  saveGoal(){
// let payload={
//   goalName:this.goalName,
//   goalAmount:this.goalAmount,
//   savedAmount:this.savedAmount,
//   targetDate:this.targetDate
// }
// console.log(payload,'payload checks')
// this.goal.addGoal(payload).subscribe({  
//   next: (res: any) => { 
//     this.getGoal()
//     this.modalController.dismiss();
//     this.goalName = ''
//     this.goalAmount=''
//     this.savedAmount=''
//   },
//   error: (err) => {
//     console.log("error", err);  
//   },    
  
// });
this.goal.createGoal(this.todo).then(() => {
  this.getGoal()
  this.modalController.dismiss();
  this.todo.goalName = ''
  this.todo.goalAmount = ''
  this.todo.savedAmount = ''
 
  
}, err => {
  // this.showToast('There was a some problem in adding your todo :(');  
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
    this.goal.updateGoal(this.updateTodo).then(()=>{
      this.modalController.dismiss();
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
