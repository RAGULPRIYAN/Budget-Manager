import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { GoalService } from '../services/goal.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-goals',
  templateUrl: './goals.page.html',
  styleUrls: ['./goals.page.scss'],
})
export class GoalsPage implements OnInit {
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

  constructor(private datePipe: DatePipe,private goal:GoalService ,private modalController: ModalController,private route: Router) { }

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
    this.goal.getGoal().subscribe((res:any)=>{
      console.log(res,'res checks')
      this.goalData = res.data
    })
  }


  goToEdit(id:any){
    this.goal.getGoalId(id).subscribe((res:any)=>{
      console.log(res,'res checks id')
      this.goalId = id
      this.modalVisible=true
      this.updateGoalName=res.data[0].goalName
      this.updateGoalAmount=res.data[0].goalAmount
      this.updateSavedAmount=res.data[0].savedAmount
      this.updateTargetDate=res.data[0].targetDate
     
    })
  }


  deleteGoal(id:any){
this.goal.deleteGoal(id).subscribe((res:any)=>{
  console.log(res,'res checks')
  this.getGoal()
})
  }

 
  saveGoal(){
let payload={
  goalName:this.goalName,
  goalAmount:this.goalAmount,
  savedAmount:this.savedAmount,
  targetDate:this.targetDate
}
console.log(payload,'payload checks')
this.goal.addGoal(payload).subscribe({  
  next: (res: any) => { 
    this.getGoal()
    this.modalController.dismiss();
    this.goalName = ''
    this.goalAmount=''
    this.savedAmount=''
  },
  error: (err) => {
    console.log("error", err);  
  },    
  
});
  }

  updateGoal(){
    let payload={
      goalName: this.updateGoalName,
      goalAmount: this.updateGoalAmount,
      savedAmount: this.updateSavedAmount,
      targetDate: this.updateTargetDate
    }
    console.log(payload,'payload checks')
    this.goal.updateGoal(this.goalId,payload).subscribe({  
      next: (res: any) => { 
        this.getGoal()
        this.modalController.dismiss();
        this.updateGoalName = ''
        this.updateGoalAmount=''
        this.updateSavedAmount=''
       
      },
      error: (err) => {
        console.log("error", err);  
      },    
      
    });
  }

  closeModal(){
    this.modalVisible=false
  }



}
