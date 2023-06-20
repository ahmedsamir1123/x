import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Users } from 'Users';
import { Observable } from 'rxjs';
import { Rebort } from 'rebort';
import { Router } from '@angular/router';
import { feedback } from 'feedback';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};
@Injectable({
  providedIn: 'root'
})
export class ApiFunctionsService {
  reborturl = "http://localhost/NWP/report.php"
  loginurl="http://localhost/test/login.php"
  registerUrl="http://localhost/NWP/register.php"
  feedbackurl="http://localhost/NWP/clerk.php"
  clerkUrl= "http://localhost/NWP/feedback.php"
  editreborturl = "http://localhost/NWP/editReport.php"
  banuserurl="http://localhost/NWP/statue.php"
  addclerkurl="http://localhost/NWP/addclerk.php"
  activeuserurl="http://localhost/NWP/sactive.php"
  temurl = "http://localhost/NWP/tem.php"

  viewdeleteUrl = 'http://localhost/NWP/userReports.php?rid=';
  viewtem = 'http://localhost/NWP/viewTem.php?rid=';

  logouturl='http://localhost/NWP/logout.php';
  private isLoggedIn = false;

  constructor(private http: HttpClient) { }

  logout(): Observable<any> {
    return this.http.get(this.logouturl);
  }
  delete(rid: any) {
    return this.http.delete(this.viewdeleteUrl +`${rid}/`)
  }
  
  getMyReport() {
    return this.http.get(this.viewdeleteUrl);

  }

  gettem() {
    return this.http.get(this.viewtem);

  }



  addUser(name: string, email: string, password: string): Observable<any> {

    const data = {
      name: name,
      email: email,
      password: password
    };
    return this.http.post<any>(this.registerUrl, data, httpOptions);
  }

  Addrebort(data:any) {
    
   
    return this.http.post<any>(this.reborturl, data)  }

    feedback(data:any) {
   
      return this.http.post<any>(this.clerkUrl, data)
    }
    addclerk(data:any) {
   
      return this.http.post<any>(this.addclerkurl, data)
    }
  Addfeedback(uid:number,name:string,email:string,content:string): Observable<any> {
    const data = {
      uid:uid,
      name: name,
      email: email,
      content: content
    };
    return this.http.post<any>(this.clerkUrl, data)
  }
getReport(rid: any){
  return this.http.get(this.editreborturl.indexOf(`${rid}/`) + `${rid}/`)
}


editSingleReport(rid:any){
  return this.http.get(this.editreborturl+'?rid=' + rid);
}
temsingle(id:any){
  return this.http.get(this.temurl+'?id=' + id);
}


editReport(data:any){

  
  return this.http.put<any>(this.editreborturl,data)
}
// for admin panel
admin(){
  return this.http.get(this.registerUrl)
}
deleteuser(id:any){
  return this.http.delete(this.registerUrl+"?id=" +`${id}/`)

}
banuser(id:any){
  return this.http.delete(this.banuserurl+"?id=" +`${id}/`)

}

activeuser(id:any){
  return this.http.delete(this.activeuserurl+"?id=" +`${id}/`)

}
// clerk function
clerk(){
  return this.http.get(this.feedbackurl)
}



setLoggedIn(value: boolean) {
  this.isLoggedIn = value;
}

get loggedIn() {
  return this.isLoggedIn;
}
}
  