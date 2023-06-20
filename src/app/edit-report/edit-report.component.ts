import { Component, OnInit } from '@angular/core';
import { HtmlTagDefinition } from '@angular/compiler/public_api';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ApiFunctionsService } from './../sharedServices/api-functions.service';
import { HttpClient, HttpErrorResponse ,HttpHeaders} from '@angular/common/http';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import {  Output, EventEmitter } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-edit-report',
  templateUrl: './edit-report.component.html',
  styleUrls: ['./edit-report.component.css']
})
export class EditReportComponent implements OnInit {

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    minHeight: '20rem',
    maxHeight: '20rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    sanitize: false,
    toolbarPosition: 'top',
    defaultFontName: 'Arial',
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },],
   
      
    
  
  };
  angForm:FormGroup
  id:any;
  inputText = '';
  predictedText = [];
  selectedWord: string | null = null;

  private apiUrl = 'http://127.0.0.1:5000/predict';
  constructor(private serv: ApiFunctionsService  ,private http: HttpClient, private fb:FormBuilder,private route:Router, private ActivatedRoute : ActivatedRoute){
   const rid =123
    this.angForm=this.fb.group({
      rid,
      title:['', Validators.required],
      description:['',Validators.required]
    ,
    })
  }
  

  ngOnInit(): void {
    setInterval(() => {
      if (this.inputText) {
        this.Nextword();
      }
    }, 1000);

    this.ActivatedRoute.paramMap.subscribe(paramId => {
      this.id = paramId.get('id');
      
      console.log(this.id);
    
      this.serv.editSingleReport(this.id).subscribe((data: any) => {
        this.angForm.patchValue(data[0]);
});
});
}
  
  
  saveToggle(){
    let s = document.getElementById('save-as-container')
    if(typeof s !== 'undefined' && s !== null) {
      if(s.style.display=="none"){s.style.display="flex"}
      else{s.style.display="none"}
    }

  }
  postReport(){
      
   
   
    const url='http://localhost/NWP/editReport.php?rid='
    this.http.put(url,this.angForm.value)
    .subscribe(response=>{

      this.route.navigate(['My Reports']);

  })
  }
  
  

  // save report
  @Output() saveFile = new EventEmitter<string>();
  fileName: string = '';
  save() {
    if (this.fileName) {
      this.saveFile.emit(this.fileName);
      this.close();
    }
  }

  close() {
    this.fileName = '';
    this.saveFile.emit();
  }
  predictNextWord(): void {
    const formData = new FormData();
    formData.append('text', this.inputText);

    this.http.post<any>(this.apiUrl, formData).subscribe(Response => {
      this.predictedText = Response.predicted_text;
      this.selectedWord = this.predictedText[0];

      // this.inputText =this.inputText+' '+ data.predicted_text;
    });
  }
  addWord() {
    this.inputText=this.inputText+' '+this.selectedWord
  }
  Nextword(): void {
    const formData = new FormData();
    formData.append('text', this.inputText);

    this.http.post<any>(this.apiUrl, formData).subscribe(response => {
      this.predictedText = response.predicted_text;
    });
  }}



