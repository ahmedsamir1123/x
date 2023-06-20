import { Component, OnInit} from '@angular/core';
import {Router } from '@angular/router';
import { ApiFunctionsService } from './../sharedServices/api-functions.service';
import { HttpClient, HttpErrorResponse ,HttpHeaders} from '@angular/common/http';
import { ControlContainer, FormBuilder,FormGroup,Validators } from '@angular/forms';

@Component({
  selector: 'app-feed-back',
  templateUrl: './feed-back.component.html',
  styleUrls: ['./feed-back.component.css']
})
export class FeedBackComponent implements OnInit {
  angForm:FormGroup

  constructor(private serv: ApiFunctionsService  ,private http: HttpClient, private fb:FormBuilder,private route:Router) { 
    const userRow = localStorage.getItem('userRow');
    const user = userRow !== null ? JSON.parse(userRow) : null;
    const uid = user ? user.id : ''; // Set a default value if user or user.uid is null
    this.angForm=this.fb.group({
      uid,
      name:['',Validators.required],
      email:['',Validators.required],
      content:['',Validators.required]
    })
  }


  ngOnInit(): void {
  }
  postdata(data:any){
    
    this.serv.feedback(this.angForm.value).subscribe(response => {
      console.log(response);
      alert(response);
    },);}
}
