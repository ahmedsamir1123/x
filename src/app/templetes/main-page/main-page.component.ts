import { Component, OnInit } from '@angular/core';
import {Router } from '@angular/router';
import { ApiFunctionsService } from '../../sharedServices/api-functions.service';
import { HttpClient, HttpErrorResponse ,HttpHeaders} from '@angular/common/http';
import { ControlContainer, FormBuilder,FormGroup,Validators } from '@angular/forms';
@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  angForm:FormGroup;
  uname:any;
  constructor(private serv: ApiFunctionsService  ,private http: HttpClient, private fb:FormBuilder,private route:Router) { 
    const userRow = localStorage.getItem('userRow');
    const user = userRow !== null ? JSON.parse(userRow) : null;
    const uid = user ? user.id : ''; 
    this.uname = user ? user.name : this.uname; // Set a default value if user or user.name is null
    // Set a default value if user or user.uid is null
    this.angForm=this.fb.group({
      uid,
      name:['',Validators.required],
      email:['',Validators.required],
      content:['',Validators.required]
    })
  }

 uid:any;
name:any;
email:any;
content:any;

  postdata(data:any){
    
       // const userRow = localStorage.getItem('userRow');
    // const user = userRow ? JSON.parse(userRow) : null;
    // const uid = user.uid; // Replace 'uid' with the actual property name for UID in your user object
    //   data.uid = uid;

    this.serv.feedback(this.angForm.value).subscribe(response => {
      console.log(response);
      alert(response);
    },);}
    allData:any;
  ngOnInit(): void {

    this.serv.gettem().subscribe((MyReports: any) => {
      console.log(MyReports);
      this.allData = MyReports;
    });
  }

  state: boolean = false;
  messages: { name: string, message: string }[] = [];
  newMessage: string = '';
  toggleState(): void {
    let s = document.getElementById('hide-ChatBot')
    if(typeof s !== 'undefined' && s !== null) {
      if(s.style.display=="flex"){s.style.display="none"}
      else{s.style.display="flex"}
  }
  }

  onSendButton(): void {
    if (this.newMessage.trim() === '') {
      return;
    }
  
    let msg1 = { name: "User", message: this.newMessage };
    this.messages.push(msg1);
  
    fetch('http://127.0.0.1:5000/chatbot', {
      method: 'POST',
      body: JSON.stringify({ message: this.newMessage }),
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then(r => r.json())
    .then(r => {
      let msg2 = { name: "mzmz", message: r.answer };
      this.messages.push(msg2);
      this.newMessage = '';
    })
    .catch((error) => {
      console.error('Error:', error);
      this.newMessage = '';
    });
  }
  logout() {
    this.serv.logout().subscribe(
      (response) => {
        localStorage.removeItem('userRow');
  
        this.route.navigate(['login'])
        console.log(response);
        // redirect to login page or update UI as needed
      },
     
    );
  }
}
