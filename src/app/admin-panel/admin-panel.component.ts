import { Component, OnInit } from '@angular/core';
import { ApiFunctionsService } from '../sharedServices/api-functions.service';
import { Router ,ActivatedRoute } from '@angular/router';
import { ControlContainer, FormBuilder,FormGroup,Validators } from '@angular/forms';


@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

  filteredData: any;
  allData: any
  searchTerm: any;
  name: string='' ;

  angForm:FormGroup

  constructor(private serv :ApiFunctionsService , private route: ActivatedRoute, private router: Router, private fb:FormBuilder) {




    
    this.angForm=this.fb.group({
      name:['',Validators.required],
      email:['',Validators.required],
      password:['',Validators.required]
    });
    this.serv.admin().subscribe((Users)=>{
      this.allData = Users;
    });
    
    this.searchTerm = '';
    this.serv.admin().subscribe((Users) => {
      this.allData = Users;
      this.filteredData = Users});
      const userRow = localStorage.getItem('userRow');
      const user = userRow !== null ? JSON.parse(userRow) : null;
      this.name = user ? user.name : this.name; // Set a default value if user or user.name is null
   }
   
  ngOnInit(): void {
    this.filteredData = this.allData;

  }

  onSearch(): void {
    this.filteredData = this.allData.filter((x: any) => x.username.toLowerCase().includes(this.searchTerm.toLowerCase()));
    console.log()
  }

  remove(id:any) {
    this.serv.deleteuser(id).subscribe(
      response => console.log(response),
      
    );
    window.location.reload();
  }
  ban(id:any) {
    this.serv.banuser(id).subscribe(
      response => console.log(response),
      
    );
    window.location.reload();
  }
  active(id:any) {
    this.serv.activeuser(id).subscribe(
      response => console.log(response),
      
    );
    window.location.reload();
  }
  postdata(data:any){
    
    this.serv.addclerk(this.angForm.value).subscribe(response => {
      console.log(response);
      alert("clerk added");
      window.location.reload();

    },);}

    logout() {
      this.serv.logout().subscribe(
        (response) => {
          localStorage.removeItem('userRow');
    
          this.router.navigate(['login'])
          console.log(response);
          // redirect to login page or update UI as needed
        },
       
      );
    }

}
