import { Observable } from 'rxjs';
import { ApiFunctionsService } from './../sharedServices/api-functions.service';
import { Component, OnInit } from '@angular/core';
import { Router ,ActivatedRoute } from '@angular/router';
import { ControlContainer, FormBuilder,FormGroup,Validators } from '@angular/forms';


@Component({
  selector: 'app-my-reports',
  templateUrl: './my-reports.component.html',
  styleUrls: ['./my-reports.component.css']
})
export class MyReportsComponent implements OnInit {
  angForm:FormGroup
  ngOnInit(): void {

    const userRow = localStorage.getItem('userRow');
    const user = userRow ? JSON.parse(userRow) : null;
    const uid = user.id; // Replace 'uid' with the actual property name for UID in your user object

    this.serv.getMyReport().subscribe((MyReports: any) => {
      console.log(MyReports);
      const filteredReports = MyReports.filter((report: any) => report.uid === uid);
      this.allData = filteredReports;
    });
  
}

// to display my Reports
allData: any
  constructor(private serv :ApiFunctionsService , private route: Router,
    private router: Router ,private fb:FormBuilder) { 
      const userRow = localStorage.getItem('userRow');
      const user = userRow !== null ? JSON.parse(userRow) : null;
      const uid = user ? user.id : ''; // Set a default value if user or user.uid is null
      this.angForm=this.fb.group({
        uid,
        name:['',Validators.required],
        email:['',Validators.required],
        content:['',Validators.required]
      })
  

    // this.serv.getMyReport().subscribe((MyReports :any)=>{
    //   console.log(MyReports);
    //   this.allData = MyReports;
      
    // })
    
  }

  // To delete my report when i click delete button
  remove(rid:any) {
    this.serv.delete(rid).subscribe(
      response => console.log(response),
      
    );
    window.location.reload();
  }
uid:any;
name:any;
email:any;
content:any;

  postdata(data:any){
    this.serv.feedback(this.angForm.value).subscribe(response => {
      console.log(response);
      alert(response);
    },);}
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

}



