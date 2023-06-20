import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  constructor(private route : Router) { }

  login(){
    this.route.navigateByUrl('login')
  }

  signUp(){
    this.route.navigateByUrl('signup')
  }

  ngOnInit(): void {
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
// to show about us
aboutus(){
  let x= document.getElementById("aboutUs")
  if(x!==null){
   x.style.display='block'
 
  }
 }
 
// to show contact us
 contactus(){
   let x= document.getElementById("contactUs")
   if(x!==null){
    x.style.display='block'

}
}
}
