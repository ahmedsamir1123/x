import { Component, OnInit } from '@angular/core';
import { ApiFunctionsService } from '../sharedServices/api-functions.service';
import { Router ,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-clerk',
  templateUrl: './clerk.component.html',
  styleUrls: ['./clerk.component.css']
})
export class ClerkComponent implements OnInit {
name:any;
  allData:any;
  constructor(private serv :ApiFunctionsService,private route:Router ) { 
    const userRow = localStorage.getItem('userRow');
    const user = userRow !== null ? JSON.parse(userRow) : null;
    this.name = user ? user.name : this.name; // Set a default value if user or user.name is null
    this.serv.clerk().subscribe((feedback:any)=>{
      this.allData =feedback;
    })
  }

  ngOnInit(): void {
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
