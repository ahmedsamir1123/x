import { HtmlTagDefinition } from '@angular/compiler/public_api';
import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ApiFunctionsService } from './../sharedServices/api-functions.service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Output, EventEmitter } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-write-medical-report',
  templateUrl: './write-medical-report.component.html',
  styleUrls: ['./write-medical-report.component.css']
})
export class WriteMedicalReportComponent implements OnInit {

  @ViewChild('myTextArea') myTextArea!: any;
  @ViewChild('editor') editor!: ElementRef;
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

  text: string = '';
  undoStack: string[] = [];
  redoStack: string[] = [];
  bold: boolean = false;
  italic: boolean = false;
  underline: boolean = false;
  inputText = '';
  predictedText = [];
  selectedWord: string | null = null;
  private apiUrl = 'http://127.0.0.1:5000/medical';


  ngOnInit(): void {
    setInterval(() => {
      if (this.inputText) {
        this.Nextword();
      }
    }, 1000);

  }



  angForm: FormGroup

  constructor(private serv: ApiFunctionsService, private http: HttpClient, private fb: FormBuilder, private route: Router) {
    const userRow = localStorage.getItem('userRow');
    const user = userRow !== null ? JSON.parse(userRow) : null;
    const uid = user ? user.id : ''; // Set a default value if user or user.uid is null
    this.angForm = this.fb.group({
      uid, 
      title: ['', Validators.required],
      description: ['', Validators.required],
    })
  }



 
  // function to show the save container
  saveToggle() {
    let s = document.getElementById('save-as-container')
    if (typeof s !== 'undefined' && s !== null) {
      if (s.style.display == "none") { s.style.display = "flex" }
      else { s.style.display = "none" }
    }
  }
   // end of function that show the save container


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
  Nextword(): void {
    const formData = new FormData();
    formData.append('text', this.inputText);

    this.http.post<any>(this.apiUrl, formData).subscribe(response => {
      this.predictedText = response.predicted_text;
    });
  }

  // end of the fucntion of the prediction


  postReport(data: any) {
    this.serv.Addrebort(this.angForm.value).subscribe(data => {
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

}
