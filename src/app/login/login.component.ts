import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { ApiFunctionsService } from '../sharedServices/api-functions.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent  {
  email: string = "";
  password: string="";

  constructor(private route : Router , private http: HttpClient , private serv:ApiFunctionsService) { }

  display(Email: any){
    console.log(Email);
  }

hero:any

log() {
  const headers = new HttpHeaders().set('Content-Type', 'application/json');

  this.http.post('http://localhost/NWP/login.php', { email: this.email, password: this.password },{ headers: headers }).subscribe(
    

  (response: any) => {

    
    if (response.status === 'success') {
      if (response['account_STATUS'] === 'Active') {

        localStorage.setItem('userRow', JSON.stringify(response.row));
        this.route.navigate(['templates'])
        if (response['role'] === 'user') {

        this.route.navigate(['templates'])}
        else if (response['role'] === 'admin') {
          // Redirect to the admin page for admins
          this.route.navigate(['admin']);
        }
        else if (response['role'] === 'clerk') {
          // Redirect to the admin page for admins
          this.route.navigate(['clerk']);
        }
      }
      else if(response['account_STATUS'] === 'ban'){
      
      
        alert('account is banned');


      }

    
    } else {
      alert('Invalid email or password');
    }
  
  },

  );}
  doSomethingThatRequiresAuthentication() {
    if (!this.serv.loggedIn) {
      alert('You must be logged in to do that');
      return;
    }

    // ... make requests to the PHP server using the ApiService
  }
}
