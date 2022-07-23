import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-usertable',
  templateUrl: './usertable.component.html',
  styleUrls: ['./usertable.component.css']
})
export class UsertableComponent implements OnInit {


  public userInfo:any;
  constructor(private userService:UserService){}
  ngOnInit(){
    this.showAll();
  }
  showAll(){
   this.userService.getAllData().subscribe((res)=>{
     this.userInfo=res.data;
   })
 }
 userdetails=[{
  
    "lastName":"", 
    "firstName":"",
     "email":"",
      "phoneNumber":"",
       "role":"",
        "state":""
  
 }]
 isUpdate=true;
 onchangeEdit(){
this.isUpdate=!this.isUpdate;
 }
 onEdit(userFront:any){
   
   //one row should be editable
  //  this.userInfo.array.forEach((element: { isEdit: boolean; }) => {
  //    element.isEdit=false;
  //  });
   userFront.isEdit=true;
     //add
  const userId=userFront.id;
  this.userService.updateUser(userId,userFront).subscribe(
    (data:any)=>{
      // success
     console.log(data)
     
    },(error)=>{
      console.log(error)
      
    }
  )
 
  }

 

}
