import { Component, OnInit, ViewChild } from '@angular/core';
import { BudgetService } from '../services/budget.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { FcmService } from '../services/fcm.service';
import { IonSelect } from '@ionic/angular';

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

  createRemainder(event:any,todo:any){
    console.log(todo,"todo checks")
    const selectedValue = event.detail.value;
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


  deleteRemainder(id:any){
this.remainder.deleteRemainder(id).subscribe((res:any)=>{
  this.getCardData()
})
  }
  

}
