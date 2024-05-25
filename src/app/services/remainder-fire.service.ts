import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestoreCollection,AngularFirestore,DocumentReference,QueryDocumentSnapshot} from '@angular/fire/compat/firestore'; 
import {combineLatest, from, Observable, of } from 'rxjs';
import { catchError, map, switchMap, take, tap } from 'rxjs/operators'; 

export interface remainder {  
  id?:string;
  filterId: string; 
  budgetId:string; 
  timestamp :Date;
  userId:string
}

@Injectable({
  providedIn: 'root'
})
export class RemainderFireService {

  private remainder: Observable<remainder[]> | any; 
  private remainderCollection: AngularFirestoreCollection<remainder> ; 
  constructor(private http: HttpClient,private db: AngularFirestore) { 
    this.remainderCollection = this.db.collection<remainder>('remainder');
    this.remainder = this.remainderCollection.snapshotChanges().pipe(  
      map(actions => {  
        return actions.map(a => {  
          const data = a.payload.doc.data();  
          const id = a.payload.doc.id;  
          return { id, ...data };  
        });  
      })  
    );
  }



  createRemainder(data:any){
    data['userId']=localStorage.getItem("userId");
    return this.remainderCollection.add(data);  
  }
  
  getRemainder(){
    // return this.remainder;
    let  userId:any=localStorage.getItem("userId");
    const remainderObservable = from(this.remainderCollection.ref.where('userId', '==', userId).get()).pipe(
      map(querySnapshot => {
        const remainder: remainder[] = [];
        querySnapshot.forEach((doc: QueryDocumentSnapshot<remainder>) => {
          const budgetData = doc.data() as remainder;
          budgetData.id = doc.id;
          remainder.push(budgetData);
        });
        return remainder;
      })
    );
    return remainderObservable
  }
  
  getGoalId(id: string) {  
    return this.remainderCollection.doc<remainder>(id).valueChanges().pipe(  
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



updateRemainder(todo: remainder): Promise<void> {  
 
    console.log(todo.id,'id checks in update')
  return this.remainderCollection.doc(todo.id).update({ 
   filterId:todo.filterId,
   budgetId:todo.budgetId,
   userId:todo.userId,
    timestamp:new Date() });  
}  

deleteRemainder(id:any){
  return this.remainderCollection.doc(id).delete(); 
}
getExpenseByFixAmountId(fixAmountId: string): Observable<remainder[]> {
  return from(this.remainderCollection.ref.where('budgetId', '==', fixAmountId).get()).pipe(
    map(querySnapshot => {
      const expenses: remainder[] = [];
      querySnapshot.forEach((doc: QueryDocumentSnapshot<remainder>) => {
        const expenseData = doc.data() as remainder;
        expenseData.id = doc.id;
        expenses.push(expenseData);
      });
      return expenses;
    }),
    catchError(error => {
      console.error('Error getting expenses by fixAmountId:', error);
      return of([]);  // Return an empty array in case of error
    })
  );
}



}
