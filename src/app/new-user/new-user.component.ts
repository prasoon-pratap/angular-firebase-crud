import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { AvatarDialogComponent } from "../avatar-dialog/avatar-dialog.component";
import { Router } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit {

  userForm: FormGroup;

  validation_messages = {
   'firstname': [
     { type: 'required', message: 'First Name is required.' }
   ],
   'lastname': [
     { type: 'required', message: 'Last Name is required.' }
   ],
   'email': [
     { type: 'required', message: 'Email is required.' },
   ]
 };

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private router: Router,
    public firebaseService: FirebaseService
  ) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.userForm = this.fb.group({
      firstname: ['', Validators.required ],
      lastname: ['', Validators.required ],
      email: ['', Validators.required ],
      noticeC: [],
      noticeE: [],
      noticeD: [],
      postC: [],
      postE: [],
      postD: [],
      alertC: [],
      alertE: [],
      alertD: []
    });
  }

  

   

  resetFields(){
    
    this.userForm = this.fb.group({
      firstname: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      noticeC: new FormControl(),
      noticeE: new FormControl(),
      noticeD: new FormControl(),
      postC: new FormControl(),
      postE: new FormControl(),
      postD: new FormControl(),
      alertC: new FormControl(),
      alertE: new FormControl(),
      alertD: new FormControl(),
    });
  }

  onSubmit(value){
    this.firebaseService.createUser(value)
    .then(
      res => {
        this.resetFields();
        this.router.navigate(['/home']);
      }
    )
  }

}
