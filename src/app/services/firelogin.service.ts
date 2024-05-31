import { Injectable } from '@angular/core';
import { AngularFirestoreCollection,AngularFirestore,DocumentReference,QueryDocumentSnapshot} from '@angular/fire/compat/firestore'; 
import {from, Observable } from 'rxjs';
import { catchError, map, take, tap } from 'rxjs/operators'; 
import * as bcrypt from 'bcryptjs';

export interface User {
  id?:string
  email: string;
  password: string;
  name: string;
  userId:string;
}


@Injectable({
  providedIn: 'root'
})
export class FireloginService {
  private user: User[] | any; 
  private userCollection: AngularFirestoreCollection<User> ; 

  constructor(private db: AngularFirestore) { 
    this.userCollection = this.db.collection<User>('user');
    this.user = this.userCollection.snapshotChanges().pipe(  
      map(actions => {  
        return actions.map(a => {  
          const data = a.payload.doc.data();  
          const id = a.payload.doc.id;  
          return { id, ...data };  
        });  
      })  
    );
  }

  createUser(data: any) {
    return this.db.collection('user', ref => ref.where('email', '==', data.email)).get().toPromise().then((querySnapshot) => {
      if (!querySnapshot?.empty) {
        throw new Error('Email already exists');
      }
      data['userId'] = localStorage.getItem("userId");
      return this.userCollection.add(data);
    });
  }
  loginUser(email: string, password: string): Observable<boolean> {
    console.log(email, password, 'checks');
    return this.userCollection.valueChanges({ idField: 'id' }).pipe(
      take(1), // Take only the first emitted value
      tap(users => console.log('Fetched users:', users)),
      map(users => {
        const user:any = users.find(u => u.email === email);
        console.log('User:', user);
        localStorage.setItem("userId",user?.id)
        localStorage.setItem("userName",user?.name)
        if (user) {
          const passwordMatch = bcrypt.compareSync(password, user.password);
          console.log('Password Match:', passwordMatch);
          return passwordMatch;
        } else {
          console.log('User not found');
          return false;
        }
      })
    );
  }


getUser(){
  return this.user;
}
  

getUserId(id: string) {  
  return this.userCollection.doc<User>(id).valueChanges().pipe(  
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

}
