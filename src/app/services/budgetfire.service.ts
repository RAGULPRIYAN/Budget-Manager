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
//     this.setBudgetCollection = this.db.collection<set_budget_amount>('set_budget_amount', ref =>
//     ref.orderBy('timestamp', 'desc') // Order by timestamp in descending order (latest first)
//   );
//   this.expenseCollection = this.db.collection<expense>('expenses', ref =>
//   ref.orderBy('timestamp', 'desc') // Order by timestamp in descending order (latest first)
// );
// this.budgetsCollection = this.db.collection<budgets>('budgets', ref =>
// ref.orderBy('timestamp', 'desc') // Order by timestamp in descending order (latest first)
// );
// this.filterCollection = this.db.collection<filterData>('filters', ref =>
// ref.orderBy('timestamp', 'desc') // Order by timestamp in descending order (latest first)
// );

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




// createSetBudget(data:any){
//   data['userId']=localStorage.getItem("userId");
//   return this.setBudgetCollection.add(data);  
// }

createSetBudget(data: any) {
  data['userId'] = localStorage.getItem("userId");
  return this.setBudgetCollection.add(data).then((docRef) => {
    return docRef.get().then((doc) => {
      return { id: doc.id, ...doc.data() };
    });
  });
}


getSetAmount(): Observable<set_budget_amount[]> {
  const userId: any = localStorage.getItem("userId");
  const query = this.setBudgetCollection.ref
    .where('userId', '==', userId)
    .orderBy('timestamp', 'desc');

  const setBudgetObservable = from(query.get()).pipe(
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

// createExpense(data:any){
//   data['userId']=localStorage.getItem("userId");
//   return this.expenseCollection.add(data);  
// }


createExpense(data: any) {
  data['userId'] = localStorage.getItem("userId");
  return this.expenseCollection.add(data).then((docRef) => {
    return docRef.get().then((doc) => {
      return { id: doc.id, ...doc.data() };
    });
  });
}

getExpense(): Observable<expense[]> {
  const userId: any = localStorage.getItem("userId");
  const query = this.expenseCollection.ref
    .where('userId', '==', userId)
    .orderBy('timestamp', 'desc');

  const expenseObservable = from(query.get()).pipe(
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

  return expenseObservable;
}


createBudgets(data:any){
  data['userId']=localStorage.getItem("userId");
  return this.budgetsCollection.add(data)
}


getBudgets(): Observable<budgets[]> {
  const userId: any = localStorage.getItem("userId");
  const query = this.budgetsCollection.ref
    .where('userId', '==', userId)
    .orderBy('timestamp', 'desc');

  const budgetsObservable = from(query.get()).pipe(
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

  return budgetsObservable;
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
  const userId = localStorage.getItem("userId");
  return this.db.collection<budgets>('budgets', ref => ref.where('userId', '==', userId)).snapshotChanges().pipe(
    switchMap(actions => {
      const expenseObservables = actions.map(a => {
        const data = a.payload.doc.data() as budgets;
        return this.db.collection<expense>('expenses').doc(data.expenseNameId).valueChanges().pipe(
          map(expenseData => ({ id: data.expenseNameId, expense: expenseData?.expense })) // Use optional chaining
        );
      });

      return combineLatest(expenseObservables).pipe(
        map(expenseDataArray => {
          const expenseCounts: { [key: string]: { expense: string, itemCount: number } } = {};
          expenseDataArray.forEach((expenseData:any) => {
            if (expenseCounts[expenseData.expense]) {
              expenseCounts[expenseData.expense].itemCount++;
            } else {
              expenseCounts[expenseData.expense] = { expense: expenseData.expense, itemCount: 1 };
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
          expenseDataArray.forEach((expenseData:any) => {
            if (expenseCounts[expenseData.expense]) {
              expenseCounts[expenseData.expense].itemCount++;
            } else {
              expenseCounts[expenseData.expense] = { expense: expenseData.expense, itemCount: 1 };
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
