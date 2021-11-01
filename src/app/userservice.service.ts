import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserserviceService {

  constructor(private hc:HttpClient) { }

  createUser(userObj: any):Observable<any>{
    return this.hc.post("/user/createuser",userObj)
  }

  getUser(){}

  deleteuser(){ }
}
