import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestoreCollection,AngularFirestore,DocumentReference,QueryDocumentSnapshot} from '@angular/fire/compat/firestore'; 
import {combineLatest, from, Observable } from 'rxjs';
import { catchError, map, switchMap, take, tap } from 'rxjs/operators'; 
export interface goal {  
  id?:string;
  goalName: string; 
  goalAmount:string;
  savedAmount:string; 
  targetDate:Date;
  timestamp :Date;
  userId:string;
} 
@Injectable({
  providedIn: 'root'
})
export class GoalfireService {
  private goal: Observable<goal[]> | any; 
  private goalCollection: AngularFirestoreCollection<goal> ; 
  constructor(private http: HttpClient,private db: AngularFirestore) { 
    this.goalCollection = this.db.collection<goal>('goal');
    this.goal = this.goalCollection.snapshotChanges().pipe(  
      map(actions => {  
        return actions.map(a => {  
          const data = a.payload.doc.data();  
          const id = a.payload.doc.id;  
          return { id, ...data };  
        });  
      })  
    );
  }





  createGoal(data:any){
    data['userId']=localStorage.getItem("userId");
    return this.goalCollection.add(data);  
  }
  
  getGoal(){
    // return this.goal;
    let  userId:any=localStorage.getItem("userId");
    const goalObservable = from(this.goalCollection.ref.where('userId', '==', userId).get()).pipe(
      map(querySnapshot => {
        const goals: goal[] = [];
        querySnapshot.forEach((doc: QueryDocumentSnapshot<goal>) => {
          const goalData = doc.data() as goal;
          goalData.id = doc.id;
          goals.push(goalData);
        });
        return goals;
      })
    );
    return goalObservable
  }
  
  getGoalId(id: string) {  
    return this.goalCollection.doc<goal>(id).valueChanges().pipe(  
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



updateGoal(todo: goal): Promise<void> {  
  let  userId:any=localStorage.getItem("userId");
    console.log(todo.id,'id checks in update')
  return this.goalCollection.doc(todo.id).update({ 
    goalName: todo.goalName, 
    goalAmount: todo.goalAmount,
    savedAmount:todo.savedAmount,
    targetDate:todo.targetDate,
    userId:userId,
    timestamp:new Date() })
   
}  

deleteGoals(id:any){
  return this.goalCollection.doc(id).delete(); 
}

  
}
