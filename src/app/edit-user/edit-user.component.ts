import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material';
// import { AvatarDialogComponent } from "../avatar-dialog/avatar-dialog.component";
import { FirebaseService } from '../services/firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  userForm: FormGroup;
  item: any;

  validation_messages = {
   'firstname': [
     { type: 'required', message: 'First Name is required.' }
   ],
   'lastname': [
     { type: 'required', message: 'Last Name is required.' }
   ],
   'email': [
     { type: 'required', message: 'E-mail is required.' },
   ]
 };

  constructor(
    public firebaseService: FirebaseService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.route.data.subscribe(routeData => {
      let data = routeData['data'];
      if (data) {
        this.item = data.payload.data();
        this.item.id = data.payload.id;
        this.userForm = this.fb.group({
          firstname: [this.item.firstname, Validators.required],
          lastname: [this.item.lastname, Validators.required],
          email: [this.item.email, Validators.required],
          address: [this.item.address],
          noticeC: [this.item.noticeC],
          noticeE: [this.item.noticeE],
          noticeD: [this.item.noticeD],
          postC: [this.item.postC],
          postE: [this.item.postE],
          postD: [this.item.postD],
          alertC: [this.item.alertC],
          alertE: [this.item.alertE],
          alertD: [this.item.alertD],
        });
      }
    })
  }



  onSubmit(value){
    value.email = value.email;
    this.firebaseService.updateUser(this.item.id, value)
    .then(
      res => {
        this.router.navigate(['/home']);
      }
    )
  }

  delete(){
    this.firebaseService.deleteUser(this.item.id)
    .then(
      res => {
        this.router.navigate(['/home']);
      },
      err => {
        console.log(err);
      }
    )
  }

  cancel(){
    this.router.navigate(['/home']);
  }

}
