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
     
    })
  }

  async openModal() {
    const modal = await this.modalController.create({
      component: GoalsPage, // Use the same component for modal
      componentProps: {
        goalData: this.goalData, // Pass data to modal component
      },
    });
    return await modal.present();
  }
 

  deleteGoal(id:any){

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
    // this.route.navigate(['/goals']) 
    this.goalName = ''
    this.goalAmount=''
    this.savedAmount=''
  },
  error: (err) => {
    console.log("error", err);  
  },    
  
});
  }



}
