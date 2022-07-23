
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }
  // connectfrontend to backend

  apiurl='http://localhost:3000';
    headers={
    headers:new HttpHeaders({
    'Content-Type':'application/json'
  })}
  getAllData():Observable<any>{
    return this.http.get(`${this.apiurl}/user/all`).pipe()
  }
  // save state
  createUser(data:any):Observable<any>
  {
    return this.http.post(`${this.apiurl}/user/create`,data)
  }
  updateUser(id:any,user:any):Observable<any>
  {
    return this.http.put(`${this.apiurl}/user/update/${id}`,user)
  }
}
