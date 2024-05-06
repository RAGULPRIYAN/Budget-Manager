import { Component, OnInit } from '@angular/core';
import { BudgetService } from '../services/budget.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FcmService } from '../services/fcm.service';
import { DatePipe } from '@angular/common';
import { RegisterService } from '../services/register.service';

@Component({
  selector: 'app-records',
  templateUrl: './records.page.html',
  styleUrls: ['./records.page.scss'],
})
export class RecordsPage implements OnInit {
budgetData:any
budgetAmount:any
budgetId:any
dateId:any
filteredData:any
userData:any
userId:any
  constructor(private activeRoute: ActivatedRoute,private apiService:RegisterService,private datePipe: DatePipe,private remainder:FcmService,private budget:BudgetService,private route: Router) { }

  ngOnInit() {
    this.userId =localStorage.getItem("userId");
    let id = this.activeRoute.snapshot.queryParams["id"];
    console.log(id,'budgetsId')
   
    if(id){
      this.getUserDetails(id)
    }
    else{
      this.getUserDetails(this.userId)
    }
   
    this.getCardData()
    this.getBudgetAmount()
    this. getFilterData()
   
  }

  getUserDetails(id:any){
this.apiService.getUserId(id).subscribe((res:any)=>{
  console.log(res,'res checks')
  this.userData = res.data
})
  }

  getCardData(){
    this.budget.getAllBudgets().subscribe((res:any)=>{
this.budgetData=res.data
console.log(res,'res checks')
    })
  }

  getFilterData(){
    this.remainder.getFilter().subscribe((res:any)=>{
  this.filteredData=res.data
    })
  }

  getBudgetAmount(){
    this.budget.getAllBudgetAmount().subscribe((res:any)=>{
      console.log(res,'res checsk')
    this.budgetAmount = res.data
    })
  }

  formatTargetDate(targetDate: string): string {
    const formattedDate = new Date(targetDate);
    return this.datePipe.transform(formattedDate, 'dd/MM/yyyy') || '';
  }


  getAmountWiseData(event: any){
    const selectedValue = event.detail.value;
this.budget.getRemainingBudgetId(selectedValue).subscribe((res:any)=>{
  this.budgetData=res.data
  console.log(res,'res checks***')
})
  }

  getFilterWiseData(event:any){
    const selectedValue = event.detail.value;
    console.log(selectedValue,'se')
    this.budget.getFilterDateId(selectedValue).subscribe((res:any)=>{
      console.log(res,'res checks date wise')
      this.budgetData=res.data
    })
  }

  removeFilter(){
    this.budgetId = ""
    this.dateId = " "
    this.getCardData()
  }

  goToEdit(id:number){
    console.log(id,'id checsk')
    this.route.navigate(['/budgets'], { queryParams: { id: id } });
  }

  deleteExpenseList(id:number){
this.budget.deleteBudget(id).subscribe((res:any)=>{
  console.log(res,'res checsk')
  this.getCardData()
})
  }


  logOut(){
     this.route.navigate(['/login'])
    localStorage.clear()
    // this.userData = []
   
  }

}
