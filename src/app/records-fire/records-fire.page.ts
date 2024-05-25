import { Component, OnInit } from '@angular/core';
import { BudgetfireService, budgets, expense, filterData, set_budget_amount } from '../services/budgetfire.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FcmService } from '../services/fcm.service';
import { DatePipe } from '@angular/common';
import { RegisterService } from '../services/register.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-records-fire',
  templateUrl: './records-fire.page.html',
  styleUrls: ['./records-fire.page.scss'],
})
export class RecordsFirePage implements OnInit {
  todo: budgets = {
    expenseAmount: '',
    expenseNameId: '',
    setAmountId: '',
    timestamp: new Date(),
    userId:''
  };

  budgetData:any
  budgetAmount:any
  budgetId:any
  dateId:any
  // filteredData:any
  userData:any
  userId:any
  noDataVisible:boolean=false
  public amount: Observable<set_budget_amount[]> | any;
  public expense: Observable<expense[]> | any;
  public filteredData: Observable<filterData[]> | any;
  userName: any;

    constructor(private activeRoute: ActivatedRoute,private apiService:RegisterService,private datePipe: DatePipe,private budget:BudgetfireService,private route: Router) { }
  
    ngOnInit() {
     
      this.getBudgetAmount()
      this.getExpenseName()
      this. getFilterData()
     
    }
  
    ionViewWillEnter(){
      this.userId =localStorage.getItem("userId");
      this.userName =localStorage.getItem("userName");
      console.log( this.userId,' this.userId')
      let id = this.activeRoute.snapshot.queryParams["id"];
      console.log(id,'budgetsId')
     
      // if(id){
      //   this.getUserDetails(id)
      // }
      // else{
      //   this.getUserDetails(this.userId)
      // }
     
      this.getCardData()
    }
  
    formatTimestamp(timestamp: any): any {
      if (timestamp && timestamp.toDate) {
        return this.datePipe.transform(timestamp.toDate(), 'dd/MM/yyyy  HH:mm a');
      }
      return '';
    }
  
  //   getUserDetails(id:any){
  // this.apiService.getUserId(id).subscribe((res:any)=>{
  //   console.log(res,'res checks')
  //   this.userData = res.data
  // })
  //   }
  
    getCardData(){
      this.budgetData=   this.budget.getBudgets()
  //     this.budget.getAllBudgets().subscribe((res:any)=>{
  // this.budgetData=res.data
  // console.log(res,'res checks')
  //     })
    }
  
    getFilterData(){
      this.filteredData = this.budget.getFilter()
    //   this.remainder.getFilter().subscribe((res:any)=>{
    // this.filteredData=res.data
    //   })
    }
  
    getBudgetAmount(){
      this.amount = this.budget.getSetAmount()
      // this.budget.getAllBudgetAmount().subscribe((res:any)=>{
      //   console.log(res,'res checsk')
      // this.budgetAmount = res.data
      // })
    }

    getExpenseName(){
      this.expense = this.budget.getExpense()
    }
  
    formatTargetDate(targetDate: string): string {
      const formattedDate = new Date(targetDate);
      return this.datePipe.transform(formattedDate, 'dd/MM/yyyy') || '';
    }
  
  
    getAmountWiseData(event: any){
      const selectedValue = event.detail.value;
      this.budget.getExpenseByFixAmountId(selectedValue).subscribe((expenses: budgets[]) => {
        this.budgetData = of(expenses);
        console.log(this.expense, 'expenses checks######33');
      });
  // this.budget.getRemainingBudgetId(selectedValue).subscribe((res:any)=>{
  //   this.budgetData=res.data
  //   console.log(res,'res checks***')
  // })
    }
  
    getFilterWiseData(event:any){
      const selectedFilter = event.detail.value;
      console.log(selectedFilter,'se')
      const today = new Date();
      let startDate: Date = new Date();

    if (selectedFilter === 'Weekly') {
      startDate = new Date();
      startDate.setDate(today.getDate() - 7);
    } else if (selectedFilter === 'Monthly') {
      startDate = new Date();
      startDate.setDate(today.getDate() - 30);
    } else if (selectedFilter === 'Daily') {
      startDate = new Date();
      startDate.setHours(0, 0, 0, 0);  // Start of today
      today.setHours(23, 59, 59, 999); // End of today
    }
this.budget.getBudgetsByDateRange(startDate, today).subscribe((expenses: budgets[]) => {
  this.budgetData = of(expenses);
  console.log(this.expense, 'expenses checks######33');
});
    
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
  
    deleteBudgetsList(id:number){
      this.budget.deleteBudgets(id)
      this.getCardData()
  // this.budget.deleteBudget(id).subscribe((res:any)=>{
  //   console.log(res,'res checsk')
  //   this.getCardData()
  // })
    }
  
  
    logOut(){
       this.route.navigate(['/login'])
      localStorage.clear()
      // this.userData = []
     
    }

}
