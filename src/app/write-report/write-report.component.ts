import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ApiFunctionsService } from './../sharedServices/api-functions.service';
import { HttpClient, } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Output, EventEmitter } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import $ from 'jquery';

@Component({
  selector: 'app-write-report',
  templateUrl: './write-report.component.html',
  styleUrls: ['./write-report.component.css'],

})

export class WriteReportComponent implements OnInit {

  hello:any

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
 

  sections: string[] = [];

  angForm: FormGroup
  inputText =  '';
  predictedText = [];
  selectedWord: string | null = null;
  private apiUrl = 'http://127.0.0.1:5000/predict';
  predictedWordListTop: number = 0;
  predictedWordListLeft: number = 0;
  id:any;
  // angForm1:FormGroup;
  ngOnInit(): void {
    setInterval(() => {
      if (this.inputText) {
        this. predictNextWord();
      }
    }, 1000);
    this.ActivatedRoute.paramMap.subscribe(paramId => {
      this.id = paramId.get('id');
      
      console.log(this.id);
    
      this.serv.temsingle(this.id).subscribe((data: any) => {
        this.angForm.patchValue(data[0]);
});
});
  }


  constructor(private serv: ApiFunctionsService, private http: HttpClient, private fb: FormBuilder, private route: Router,private elementRef: ElementRef,private ActivatedRoute : ActivatedRoute) {
    const userRow = localStorage.getItem('userRow');
    const user = userRow !== null ? JSON.parse(userRow) : null;
    const uid = user ? user.id : ''; // Set a default value if user or user.uid is null
    this.angForm = this.fb.group({
      uid, 
      title: ['', Validators.required],
      description: ['', Validators.required],
    });

 
  }

  saveToggle(){
    let s = document.getElementById('save-as-container')
    if(typeof s !== 'undefined' && s !== null) {
      if(s.style.display=="none"){s.style.display="flex"}
      else{s.style.display="none"}
    }

  }


  //  fucntion of the prediction
  predictNextWord(): void {
    const formData = new FormData();
    formData.append('text', this.inputText);

    this.http.post<any>(this.apiUrl, formData).subscribe(Response => {
      this.predictedText = Response.predicted_text;
      this.selectedWord = this.predictedText[0];

    });
  }
  addWord() {
    this.inputText = this.inputText + ' ' + this.selectedWord
  }
  
 
  // end of the fucntion of the prediction

name:any;
  postReport(data:any ) {

    this.serv.Addrebort(this.angForm.value).subscribe(response => {
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
  // updateSelectOptions() {
  //   const inputValue = this.inputText;
  //   // Use jQuery to update the select options
  //   // Calculate the position of the text input
  // const inputPosition = $('#inputtext').position();
  // const inputTop = inputPosition.top + $('#inputtext').outerHeight();
  // const inputLeft = inputPosition.left;

  // // Set the position of the select element
  // $('#word-select').css({
  //   top: inputTop,
  //   left: inputLeft
  // });

  //   $('#word-select').empty();
  //   for (const word of this.predictedText as string[]) {
  //     if (word.includes(inputValue)) {
  //       $('#word-select').append(`<option value="${word}">${word}</option>`);
  //     }
  //   }
    
  // }
  
  
}
