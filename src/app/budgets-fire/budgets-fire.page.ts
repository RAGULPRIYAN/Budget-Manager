import { Component, OnInit } from '@angular/core';
import { BudgetfireService, budgets, expense, set_budget_amount } from '../services/budgetfire.service';
import { ModalController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-budgets-fire',
  templateUrl: './budgets-fire.page.html',
  styleUrls: ['./budgets-fire.page.scss'],
})

export class BudgetsFirePage implements OnInit {
  budgetPayload: set_budget_amount = {
    budget: '',
    timestamp: new Date(),
    userId:''
  };

  expensePayload: expense = {
    expense: '',
    timestamp: new Date(),
    userId:''
  };


  todo: budgets = {
    expenseAmount: '',
    expenseNameId: '',
    setAmountId: '',
    timestamp: new Date(),
    userId:''
  };


  budgetAmount :any
  expenseName:any
  budgetAmounts:string | undefined
  expenseNames:string | undefined
  setAmountId:string | undefined
  expenseId:string | undefined
  expenseAmount : string | undefined
  remainingAmount=0
  submitVisible:boolean =true
  updateVisible:boolean=false
  budgetsId:any
  
    constructor(private toastController: ToastController,private activeRoute: ActivatedRoute,private budget:BudgetfireService,private modalController: ModalController,private route: Router) { }
  
    ngOnInit() {
      
      this.getBudgetAmount()
      this.getExpenseName()
  
      const id: any = this.activeRoute.snapshot.queryParams["id"];;
      console.log(id,"id ###")
      this.editBudgetId(id)
     
    
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
  
  
    ionViewWillEnter(){
      this.expenseAmount = ''
          this.setAmountId=''
          this.expenseId=''
      this.remainingAmount = 0
      let id = this.activeRoute.snapshot.queryParams["id"];
      console.log(id,'budgetsId')
      this.budgetsId = id
      if(id){
        
        this.editBudgetId(this.budgetsId)
      }
      
    }
  
    editBudgetId(id:any){
      if (id) {
        console.log(id,'id checks')
             this.budget.getBudgetsId(id).subscribe(todo => {
               this.todo = todo!;
               console.log(this.todo,'todo checks)))')
              
             });
           }
     
    }
  
    updateExpense(){
      this.budget.updateBudgets(this.todo).then(() => {
        this.todo.expenseAmount = ''
        this.todo.expenseNameId = ''
        this.todo.setAmountId = ''
        this.route.navigateByUrl('/records');

  
      }, err => {
  
      });
      // let payload={
      //   expenseAmount:this.expenseAmount,
      //   setAmountId:this.setAmountId,
      //   expenseNameId:this.expenseId
      // }
      // this.budget.updateBudget(this.budgetsId,payload).subscribe({  
      //   next: (res: any) => {  
      //     this.route.navigate(['/records'])
      //     this.expenseAmount = ''
      //     this.setAmountId=''
      //     this.expenseId=''
      //   },
      //   error: (err) => {
      //     console.log("error", err);  
      //   },    
        
      // });
    }
  
    cancelExpense(){
      this.route.navigate(['/records'])
      this.todo.expenseAmount = ''
      this.todo.expenseNameId = ''
      this.todo.setAmountId = ''
    }
  
    getBudgetAmount(){
      // this.budget.getAllBudgetAmount()
      // .subscribe({  
      //   next: (res: any) => {  
      //     this.budgetAmount = res.data
      //     console.log(this.budgetAmount,'amount checks')
      //   },
      //   error: (err) => {
      //     console.log("error", err);  
      //   },    
        
      // });
      this.budgetAmount = this.budget.getSetAmount()
    }
  
    getExpenseName(){
      // this.budget.getAllExpenseName().subscribe({  
      //   next: (res: any) => {  
      //     this.expenseName = res.data
      //   },
      //   error: (err) => {
      //     console.log("error", err);  
      //   },    
        
      // });
      this.expenseName = this.budget.getExpense()
    }
   
    createBudget(){

      // let payload={
      //   expenseAmount:this.expenseAmount,
      //   setAmountId:this.setAmountId,
      //   expenseNameId:this.expenseId
      // }
      // this.budget.addBudgets(payload).subscribe({  
      //   next: (res: any) => { 
      //     this.route.navigate(['/records']) 
      //     this.expenseAmount = ''
      //     this.setAmountId=''
      //     this.expenseId=''
      //   },
      //   error: (err) => {
      //     console.log("error", err);  
      //   },    
        
      // });

       // Check if the expenseAmount input contains only text
       const numbersOnlyRegex = /^[0-9]+$/;
  if (!numbersOnlyRegex.test(this.todo.expenseAmount)) {
    // Show a toast notification indicating invalid input
    this.presentToast('Only Number is allowed for Expense Amount.', 'danger');
    // console.error('Invalid input. Only text is allowed for Expense Amount.');
    return;
  }

    // Check if any of the fields are empty
    if (!this.todo.expenseAmount || !this.todo.expenseNameId || !this.todo.setAmountId) {
      // Show a toast notification indicating missing fields
      this.presentToast('All fields are required.', 'danger');

      // console.error('All fields are required.');
      return;
    }


  this.budget.createBudgets(this.todo).then(() => {
    this.modalController.dismiss();
    this.todo.expenseAmount = ''
    this.todo.expenseNameId = ''
    this.todo.setAmountId = ''
    this.presentToast('Budget created successfully', 'success');
    this.route.navigateByUrl('/records');

  }, err => {
    // this.showToast('There was a some problem in adding your todo :(');  
  });


  
    }
  
  
    // addAmount(){
    //   // let payload={
    //   //       budget:this.budgetAmounts
    //   //     }

    //       this.budget.createSetBudget(this.budgetPayload).then(() => {
    //         this.modalController.dismiss();
         
    //      this. getBudgetAmount()
    //       }, err => {
    //         // this.showToast('There was a some problem in adding your todo :(');  
    //       });
    // }

    addAmount() {
      console.log(this.budgetPayload.budget,'this.budgetPayload.budget')
      // Check if the budget input contains only numbers
      const numbersOnlyRegex = /^[0-9]+$/;
      if (!numbersOnlyRegex.test(this.budgetPayload.budget)) {
        console.log('inside if')
        this.presentToast('Only numbers are allowed.', 'danger');
        // console.error('Invalid input. Only numbers are allowed.');
        // Show a toast notification or some error message indicating invalid input
        // this.showToast('Invalid input. Only numbers are allowed.');
        return;
      }
    
      this.budget.createSetBudget(this.budgetPayload).then((res) => {
        console.log(res,'res checsk')
        // this.presentToast('Amount created successfully', 'success');
        this.modalController.dismiss();
         this.getBudgetAmount()
        this.todo.setAmountId = res.id
       
        this.setRemainingAmountAfterCreate(res.id) 
      }, err => {
        // Handle error (e.g., show a toast notification)
        // this.showToast('There was a problem adding your amount.');
        console.error('There was a problem adding your amount', err);
      });
    }
    
  
    // addExpense(){
     
    //   this.budget.createExpense(this.expensePayload).then(() => {
    //     this.modalController.dismiss();
    //     this.getExpenseName()
     
    //   }, err => {
    //     // this.showToast('There was a some problem in adding your todo :(');  
    //   });
    // }

    addExpense() {
      // Check if the expense input contains only text
      const textOnlyRegex = /^[a-zA-Z\s]+$/;
      if (!textOnlyRegex.test(this.expensePayload.expense)) {
        // Show a toast notification or some error message indicating invalid input
        // console.error('Invalid input. Only text is allowed.');
        this.presentToast('Invalid input. Only text are allowed.', 'danger');

        return;
      }
    
      this.budget.createExpense(this.expensePayload).then((res) => {
        this.modalController.dismiss();
        this.todo.expenseNameId = res.id
        this.getExpenseName();
      }, err => {
        // Handle error (e.g., show a toast notification)
        console.error('There was a problem adding your expense', err);
      });
    }

    
  
  


setRemainingAmount(event: any) {
  const selectedValue = event.detail.value;
  // Fetch fixAmount
  this.budget.getSetAmountId(selectedValue).subscribe(todo => {
    const fixAmount:any = todo?.budget;
    // Fetch totalExpenseAmount
    this.budget.getExpenseByFixAmountId(selectedValue).subscribe((expenses: budgets[]) => {
      const todos = expenses;
      const totalExpenseAmount = todos.reduce((total: number, e: { expenseAmount: string; }) => total + parseFloat(e.expenseAmount), 0);
      console.log(totalExpenseAmount, 'total expense amount');
      // Calculate remainingAmount
    this.remainingAmount = parseFloat(fixAmount) - totalExpenseAmount;
    console.log(this.remainingAmount,'remaining amount')

    });
  });

}  



setRemainingAmountAfterCreate(event: any) {
  const selectedValue = event;
  // Fetch fixAmount
  this.budget.getSetAmountId(selectedValue).subscribe(todo => {
    const fixAmount:any = todo?.budget;
    // Fetch totalExpenseAmount
    this.budget.getExpenseByFixAmountId(selectedValue).subscribe((expenses: budgets[]) => {
      const todos = expenses;
      const totalExpenseAmount = todos.reduce((total: number, e: { expenseAmount: string; }) => total + parseFloat(e.expenseAmount), 0);
      console.log(totalExpenseAmount, 'total expense amount');
      // Calculate remainingAmount
    this.remainingAmount = parseFloat(fixAmount) - totalExpenseAmount;
    console.log(this.remainingAmount,'remaining amount')

    });
  });

} 
    addNew(){}
  }
  
