import { Component, destroyPlatform, OnInit } from '@angular/core';
import { ApiFunctionsService } from '../sharedServices/api-functions.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit  {
 

  name:any;
  email: any;
  password: any;

  cpassword:any;
 
  constructor(private serv:ApiFunctionsService ,private route:Router ,private http: HttpClient ) { 

  }


  addUser() {
    if (this.password==this.cpassword){
    this.serv.addUser(this.name, this.email, this.password).subscribe(
      response => {
        console.log(response);
        alert(response);
        this.route.navigate(['login'])
      },
      error => {
        console.log(error);
        alert('Error: ' + error.message);
      }
    );
    }
    else {
      alert('Error: confirm password not equal password');

    }

  } 




 safety(pass:any,confPass:any){
  if (confPass!==pass){
    alert("please enter valid password");
    window.location.reload()
  }
 }

 ngOnInit(): void {
}

}