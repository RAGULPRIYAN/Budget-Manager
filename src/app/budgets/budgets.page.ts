import { Component, OnInit } from '@angular/core';
import { BudgetService } from '../services/budget.service';
import { ModalController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-budgets',
  templateUrl: './budgets.page.html',
  styleUrls: ['./budgets.page.scss'],
})
export class BudgetsPage implements OnInit {
budgetAmount :any
expenseName:any
budgetAmounts:string | undefined
expenseNames:string | undefined
budgetId:string | undefined
expenseId:string | undefined
expenseAmount : string | undefined
remainingAmount:any 
submitVisible:boolean =true
updateVisible:boolean=false
budgetsId:any

  constructor(private activeRoute: ActivatedRoute,private budget:BudgetService,private modalController: ModalController,private route: Router) { }

  ngOnInit() {
    
    let id = this.activeRoute.snapshot.queryParams["id"];
    console.log(id,'budgetsId')
    this.budgetsId = id
    if(id){
      this.editBudgetId(this.budgetsId)
    }
   this.getBudgetAmount()
   this.getExpenseName()
  
  }

  editBudgetId(id:any){
    this.budget.getBudgetId(id).subscribe({  
      next: (res: any) => {  
        console.log(res,'res checks@@@')
        this.submitVisible = false
        this.updateVisible = true
        this.expenseAmount = res.data[0].expenseAmount
        this.budgetId = res.data[0].budgetId
        this.expenseId= res.data[0].expenseNameId
      },
      error: (err) => {
        console.log("error", err);  
      },    
      
    });
  }

  updateExpense(){
    let payload={
      expenseAmount:this.expenseAmount,
      setAmountId:this.budgetId,
      expenseNameId:this.expenseId
    }
    this.budget.updateBudget(this.budgetsId,payload).subscribe({  
      next: (res: any) => {  
        this.route.navigate(['/records'])
        // this.expenseAmount = ''
        // this.budgetId=''
        // this.expenseId=''
       
      },
      error: (err) => {
        console.log("error", err);  
      },    
      
    });
  }

  cancelExpense(){
    this.route.navigate(['/records'])
  }

  getBudgetAmount(){
    this.budget.getAllBudgetAmount()
    .subscribe({  
      next: (res: any) => {  
        this.budgetAmount = res.data
      },
      error: (err) => {
        console.log("error", err);  
      },    
      
    });
  }

  getExpenseName(){
    this.budget.getAllExpenseName().subscribe({  
      next: (res: any) => {  
        this.expenseName = res.data
      },
      error: (err) => {
        console.log("error", err);  
      },    
      
    });
  }
  addNew(){}
  createBudget(){
    let payload={
      expenseAmount:this.expenseAmount,
      setAmountId:this.budgetId,
      expenseNameId:this.expenseId
    }
    this.budget.addBudgets(payload).subscribe({  
      next: (res: any) => { 
        this.route.navigate(['/records']) 
        this.expenseAmount = ''
        this.budgetId=''
        this.expenseId=''
      },
      error: (err) => {
        console.log("error", err);  
      },    
      
    });

  }

  addAmount(){
    let payload={
      budget:this.budgetAmounts
    }
    this.budget.addBudgetAmount(payload).subscribe({  
      next: (res: any) => {  
        this.modalController.dismiss();
        this.getBudgetAmount()
      },
      error: (err) => {
        console.log("error", err);  
      },    
      
    });

  }

  addExpense(){
    let payload={
      expense:this.expenseNames
    }
    this.budget.addExpenseName(payload).subscribe({  
      next: (res: any) => {  
        this.modalController.dismiss();
        this.getExpenseName()
      },
      error: (err) => {
        console.log("error", err);  
      },    
      
    });
  }

  setRemainingAmount(event: any) {
    const selectedValue = event.detail.value;
  console.log(selectedValue,'value checks')
  this.budget.getBudgetAmountId(selectedValue).subscribe((res:any)=>{
    console.log(res,'res checks')
    const fixAmount = res.data.budget
    console.log(fixAmount,'amount checks')
    this.budget.getRemainingBudgetId(selectedValue).subscribe((res:any)=>{
      console.log(res,'res checsk00')
      const totalExpenseAmount = res.data.reduce((total: number, e: { expenseAmount: string; }) => total + parseFloat(e.expenseAmount), 0);
      console.log(totalExpenseAmount,'totalExpenseAmount res checsk00')
      this.remainingAmount = parseFloat(fixAmount) - totalExpenseAmount;
      console.log( this.remainingAmount,'remainingAmount res checsk00')
      // const budgets = res.data
    })
  })
   
  
  }
  
}
