import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class GoalService {

  constructor(private http: HttpClient) { }

  addGoal(data:any){
    return this.http.post(`${environment.url}/goal/addGoal`,data);
  }
  getGoalId(id:any){
    return this.http.get(`${environment.url}/goal/getGoalId/${id}`);
  }
  
  updateGoal(id:number,data:any){
    return this.http.put(`${environment.url}/goal/updateGoal/${id}`,data);
  }
  
  deleteGoal(id:any){
    return this.http.delete(`${environment.url}/goal/deleteGoal/${id}`)
  }
  
  getGoal(){
    return this.http.get(`${environment.url}/goal/getGoals`);
  }

}
