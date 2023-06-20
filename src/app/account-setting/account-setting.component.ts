import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
@Component({
  selector: 'app-account-setting',
  templateUrl: './account-setting.component.html',
  styleUrls: ['./account-setting.component.css']
})
export class AccountSettingComponent implements OnInit {
  name: string='' ;
  email: any;
  password: any;
  id:any;
  cpassword:any;
  constructor(private formBuilder: FormBuilder , private http:HttpClient, private fb:FormBuilder,) {
   
   }

  ngOnInit(): void {      

       // Retrieve data from local storage and populate the form
       const userRow = localStorage.getItem('userRow');
       const user = userRow !== null ? JSON.parse(userRow) : null;
       this.name = user ? user.name : this.name; // Set a default value if user or user.name is null
       this.email = user ? user.email : this.email; // Set a default value if user or user.email is null
       this.password = user ? user.password : this.password; // Set a default value if user or user.password is null
       this.id = user ? user.id : this.id; // Set a default value if user or user.password is null
this.cpassword=this.password
   

    }
    
    editprofile(){

      if (this.password==this.cpassword)
      {
        const userRow = {
          id:this.id,
          name: this.name,
          email: this.email,
          password: this.password
        };

        localStorage.setItem('userRow', JSON.stringify(userRow));


        const headers = new HttpHeaders().set('Content-Type', 'application/json');

      const data = {
        id:this.id,
        name: this.name,
        email: this.email,
        password: this.password
      };
      const url='http://localhost/NWP/edituser.php?id='
      this.http.put(url,data)
      .subscribe(response=>{
        console.log('Data updated successfully:', response);

        alert("data updated");

        window.location.reload();


  
    })

  }
  else{
    alert("error");
  }
    }

   
  }



