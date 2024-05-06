import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  constructor(private http: HttpClient) { }

  getAllBudgetAmount(){
    return this.http.get(`${environment.url}/budget/getAllBudgetAmount`);
  }

  getAllExpenseName(){
    return this.http.get(`${environment.url}/budget/getAllBudgetName`);
  }

  getAllBudgets(){
    return this.http.get(`${environment.url}/budget/getAllBudgets`);
  }

  addBudgetAmount(data:any){
    return this.http.post(`${environment.url}/budget/addBudgetAmount`,data);
  }

  addExpenseName(data:any){
    return this.http.post(`${environment.url}/budget/addExpenseName`,data);
  }

  addBudgets(data:any){
    return this.http.post(`${environment.url}/budget/addBudgets`,data);
  }


getBudgetAmountId(id:any){
  return this.http.get(`${environment.url}/budget/getAmountId/${id}`);
}

getRemainingBudgetId(id:any){
  return this.http.get(`${environment.url}/budget/getRemainingBudgetId/${id}`);
}

getBudgetId(id:any){
  return this.http.get(`${environment.url}/budget/getBudgetId/${id}`);
}

updateBudget(id:number,data:any){
  return this.http.put(`${environment.url}/budget/updateBudget/${id}`,data);
}

deleteBudget(id:any){
  return this.http.delete(`${environment.url}/budget/deleteBudget/${id}`)
}

getExpenseCount(){
  return this.http.get(`${environment.url}/budget/getExpenseCount`);
}

getFilterDateId(id:any){
  return this.http.get(`${environment.url}/budget/getFilterDateId/${id}`);
}

getExpenseCountFilterDateId(id:any){
  return this.http.get(`${environment.url}/budget/getExpenseCountFilterDateId/${id}`);

}
}
