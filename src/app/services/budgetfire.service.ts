import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestoreCollection,AngularFirestore,DocumentReference,QueryDocumentSnapshot} from '@angular/fire/compat/firestore'; 
import {combineLatest, from, Observable, of } from 'rxjs';
import { catchError, map, switchMap, take, tap } from 'rxjs/operators'; 
export interface set_budget_amount {  
  id?:string;
  budget: string; 
  timestamp :Date;
  userId:string
} 

export interface expense {  
  id?:string;
  expense: string; 
  timestamp :Date;
  userId:string
} 


export interface budgets {  
  id?:string;
  expenseAmount: string; 
  expenseNameId:string;
  setAmountId:string; 
  timestamp :Date,
  userId:string
} 

export interface filterData{
  id?:string;
  filterData: string; 
  userId:string
}

@Injectable({
  providedIn: 'root'
})
export class BudgetfireService {

  private amount: Observable<set_budget_amount[]> | any; 
  private expense: Observable<expense[]> | any; 
  private budgets: Observable<budgets[]> | any; 
  private filters: Observable<filterData[]> | any; 
  private setBudgetCollection: AngularFirestoreCollection<set_budget_amount> ; 
  private expenseCollection: AngularFirestoreCollection<expense> ; 
  private budgetsCollection: AngularFirestoreCollection<budgets> ; 
  private filterCollection: AngularFirestoreCollection<filterData> ; 

  constructor(private http: HttpClient,private db: AngularFirestore) {
    this.setBudgetCollection = this.db.collection<set_budget_amount>('set_budget_amount');
    this.expenseCollection = this.db.collection<expense>('expenses');
    this.budgetsCollection = this.db.collection<budgets>('budgets');
    this.filterCollection = this.db.collection<filterData>('filters');


    this.amount = this.setBudgetCollection.snapshotChanges().pipe(  
      map(actions => {  
        return actions.map(a => {  
          const data = a.payload.doc.data();  
          const id = a.payload.doc.id;  
          return { id, ...data };  
        });  
      })  
    );
    this.expense = this.expenseCollection.snapshotChanges().pipe(  
      map(actions => {  
        return actions.map(a => {  
          const data = a.payload.doc.data();  
          const id = a.payload.doc.id;  
          return { id, ...data };  
        });  
      })  
    ); 
    this.budgets = this.budgetsCollection.snapshotChanges().pipe(  
      map(actions => {  
        return actions.map(a => {  
          const data = a.payload.doc.data();  
          const id = a.payload.doc.id;  
          return { id, ...data };  
        });  
      })  
    );
    this.filters = this.filterCollection.snapshotChanges().pipe(  
      map(actions => {  
        return actions.map(a => {  
          const data = a.payload.doc.data();  
          const id = a.payload.doc.id;  
          return { id, ...data };  
        });  
      })  
    );
   }




createSetBudget(data:any){
  data['userId']=localStorage.getItem("userId");
  return this.setBudgetCollection.add(data);  
}

getSetAmount(){
  // return this.amount;
  let  userId:any=localStorage.getItem("userId");
  const setBudgetObservable = from(this.setBudgetCollection.ref.where('userId', '==', userId).get()).pipe(
    map(querySnapshot => {
      const budgets: set_budget_amount[] = [];
      querySnapshot.forEach((doc: QueryDocumentSnapshot<set_budget_amount>) => {
        const budgetData = doc.data() as set_budget_amount;
        budgetData.id = doc.id;
        budgets.push(budgetData);
      });
      return budgets;
    })
  );
  return setBudgetObservable;
}

getSetAmountId(id: string) {  
  return this.setBudgetCollection.doc<set_budget_amount>(id).valueChanges().pipe(  
    take(1),  
    map(todo => {  
      if (todo) {
        todo.id = id;  
        return todo;
      } else {
        // Handle the case where todo is undefined (e.g., return a default value or throw an error)
        return null; // Or any other appropriate handling
      }  
    })  
  );  
}

createExpense(data:any){
  data['userId']=localStorage.getItem("userId");
  return this.expenseCollection.add(data);  
}

getExpense(){
  // return this.expense;
  let  userId:any=localStorage.getItem("userId");
  const expenseObservable = from(this.expenseCollection.ref.where('userId', '==', userId).get()).pipe(
    map(querySnapshot => {
      const expenses: expense[] = [];
      querySnapshot.forEach((doc: QueryDocumentSnapshot<expense>) => {
        const expenseData = doc.data() as expense;
        expenseData.id = doc.id;
        expenses.push(expenseData);
      });
      return expenses;
    })
    
  );
  return expenseObservable
}


createBudgets(data:any){
  data['userId']=localStorage.getItem("userId");
  return this.budgetsCollection.add(data)
}


getBudgets(){
  // return this.budgets;
  let  userId:any=localStorage.getItem("userId");
  const budgetsObservable = from(this.budgetsCollection.ref.where('userId', '==', userId).get()).pipe(
    map(querySnapshot => {
      const budgets: budgets[] = [];
      querySnapshot.forEach((doc: QueryDocumentSnapshot<budgets>) => {
        const budgetData = doc.data() as budgets;
        budgetData.id = doc.id;
        budgets.push(budgetData);
      });
      return budgets;
    })
  );
  return budgetsObservable
}



getExpenseByFixAmountId(fixAmountId: string): Observable<budgets[]> {
  const userId = localStorage.getItem("userId");
  // if (!userId) {
  //   return throwError('User ID not found in localStorage');
  // }

  return from(this.budgetsCollection.ref.where('setAmountId', '==', fixAmountId).where('userId', '==', userId).get()).pipe(
    map(querySnapshot => {
      const expenses: budgets[] = [];
      querySnapshot.forEach((doc: QueryDocumentSnapshot<budgets>) => {
        const expenseData = doc.data() as budgets;
        expenseData.id = doc.id;
        expenses.push(expenseData);
      });
      return expenses;
    }),
    catchError(error => {
      console.error('Error getting expenses by fixAmountId:', error);
      throw error; // Handle error appropriately in your application
    })
  );
}


getBudgetsId(id: string) {  
  return this.budgetsCollection.doc<budgets>(id).valueChanges().pipe(  
    take(1),  
    map(todo => {  
      if (todo) {
        todo.id = id;  
        return todo;
      } else {
        // Handle the case where todo is undefined (e.g., return a default value or throw an error)
        return null; // Or any other appropriate handling
      }  
    })  
  );  
}

updateBudgets(todo: budgets): Promise<void> {  
 let  userId:any=localStorage.getItem("userId");
  return this.budgetsCollection.doc(todo.id).update({ 
    expenseAmount: todo.expenseAmount, 
    expenseNameId: todo.expenseNameId,
    setAmountId:todo.setAmountId,
    userId:userId,
    timestamp:new Date() }) 
    
}  

deleteBudgets(id:any){
  return this.budgetsCollection.doc(id).delete(); 
}

getFilter(){
  return this.filters;
}


// getBudgetsByDateRange(startDate: Date, endDate: Date): Observable<budgets[]> {
//   return from(
//     this.budgetsCollection.ref
//       .where('timestamp', '>=', startDate)
//       .where('timestamp', '<=', endDate)
//       .get()
//   ).pipe(
//     map(querySnapshot => {
//       const budgets: budgets[] = [];
//       querySnapshot.forEach((doc: QueryDocumentSnapshot<budgets>) => {
//         const budgetData = doc.data() as budgets;
//         budgetData.id = doc.id;
//         budgets.push(budgetData);
//       });
//       return budgets;
//     }),
//     catchError(error => {
//       console.error('Error getting budgets by date range:', error);
//       throw error;
//     })
//   );
// }
getBudgetsByDateRange(startDate: Date, endDate: Date): Observable<budgets[]> {
  const userId = localStorage.getItem("userId");
  // if (!userId) {
  //   return throwError('User ID not found in localStorage');
  // }

  return from(
    this.budgetsCollection.ref
      .where('userId', '==', userId)
      .where('timestamp', '>=', startDate)
      .where('timestamp', '<=', endDate)
      .get()
  ).pipe(
    map(querySnapshot => {
      const budgets: budgets[] = [];
      querySnapshot.forEach((doc: QueryDocumentSnapshot<budgets>) => {
        const budgetData = doc.data() as budgets;
        budgetData.id = doc.id;
        budgets.push(budgetData);
      });
      return budgets;
    }),
    catchError(error => {
      console.error('Error getting budgets by date range:', error);
      throw error;
    })
  );
}




getExpenseCount(): Observable<any> {
  let  userId:any=localStorage.getItem("userId");
  return this.db.collection<budgets>('budgets', ref => ref.where('userId', '==', userId)).snapshotChanges().pipe(
    switchMap(actions => {
      const expenseIds: string[] = actions.map(a => a.payload.doc.data().expenseNameId);
      const uniqueExpenseIds = Array.from(new Set(expenseIds));

      if (uniqueExpenseIds.length === 0) {
        return of({ topFive: [], others: [], othersTotalCount: 0, totalCount: 0 });
      }

      const expenseObservables = uniqueExpenseIds.map(expenseId => {
        return this.db.collection<expense>('expenses').doc(expenseId).valueChanges().pipe(
          map(expenseData => ({ id: expenseId, expense: expenseData?.expense })) // Use optional chaining
        );
      });

      return combineLatest(expenseObservables).pipe(
        map(expenseDataArray => {
          const expenseCounts: { [key: string]: { expense: string, itemCount: number } } = {};
          actions.forEach(a => {
            const data = a.payload.doc.data() as budgets;
            const expenseId = data.expenseNameId;
            if (expenseCounts[expenseId]) {
              expenseCounts[expenseId].itemCount++;
            } else {
              const expenseData = expenseDataArray.find(exp => exp.id === expenseId);
              if (expenseData && expenseData.expense) { // Check if expenseData and expense are defined
                expenseCounts[expenseId] = { expense: expenseData.expense, itemCount: 1 };
              }
            }
          });

          const result = Object.values(expenseCounts);
          const topFive = result.sort((a, b) => b.itemCount - a.itemCount).slice(0, 5);
          const others = result.filter(item => !topFive.some(topItem => topItem.expense === item.expense));
          const othersTotalCount = others.reduce((total, item) => total + item.itemCount, 0);
          const totalCount = result.reduce((total, item) => total + item.itemCount, 0);

          return { topFive, others, othersTotalCount, totalCount };
        })
      );
    }),
    catchError(error => {
      console.error('Error getting expense counts:', error);
      throw error;
    })
  );
}


getExpenseCountByDateRange(startDate: Date, endDate: Date): Observable<any> {
  return this.getBudgetsByDateRange(startDate, endDate).pipe(
    switchMap(budgets => {
      const expenseIds = budgets.map(budget => budget.expenseNameId);
      const uniqueExpenseIds = Array.from(new Set(expenseIds));

      const expenseObservables = uniqueExpenseIds.map(expenseId => {
        return this.expenseCollection.doc(expenseId).get().pipe(
          map(doc => {
            const expenseData = doc.data() as expense;
            return { id: expenseId, expense: expenseData.expense };
          })
        );
      });

      return combineLatest(expenseObservables).pipe(
        map(expenseDataArray => {
          const expenseCounts: { [key: string]: { expense: string, itemCount: number } } = {};
          budgets.forEach(budget => {
            const expenseId = budget.expenseNameId;
            if (expenseCounts[expenseId]) {
              expenseCounts[expenseId].itemCount++;
            } else {
              const expenseData = expenseDataArray.find(exp => exp.id === expenseId);
              if (expenseData) {
                expenseCounts[expenseId] = { expense: expenseData.expense, itemCount: 1 };
              }
            }
          });

          const result = Object.values(expenseCounts);
          const topFive = result.sort((a, b) => b.itemCount - a.itemCount).slice(0, 5);
          const others = result.filter(item => !topFive.some(topItem => topItem.expense === item.expense));
          const othersTotalCount = others.reduce((total, item) => total + item.itemCount, 0);
          const totalCount = result.reduce((total, item) => total + item.itemCount, 0);

          return { topFive, others, othersTotalCount, totalCount };
        })
      );
    }),
    catchError(error => {
      console.error('Error getting expense counts:', error);
      throw error;
    })
  );
}


}
