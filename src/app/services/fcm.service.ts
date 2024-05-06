import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class FcmService {

    constructor(private http: HttpClient) { }

    addRemainder(data:any){
      return this.http.post(`${environment.url}/remainder/addRemainder`,data);
    }
    getRemainderId(id:any){
      return this.http.get(`${environment.url}/remainder/getRemainderId/${id}`);
    }
    
    updateRemainder(id:number,data:any){
      return this.http.put(`${environment.url}/remainder/updateRemainder/${id}`,data);
    }
    
    deleteRemainder(id:any){
      return this.http.delete(`${environment.url}/remainder/deleteRemainder/${id}`)
    }
    
    getRemainder(){
      return this.http.get(`${environment.url}/remainder/getRemainder`);
    }

    getFilter(){
        return this.http.get(`${environment.url}/remainder/getFilter`);
      }

      getRemainderWiseBudgetId(id:any){
        return this.http.get(`${environment.url}/remainder/getRemainderWiseBudgetId/${id}`);
      }

}
