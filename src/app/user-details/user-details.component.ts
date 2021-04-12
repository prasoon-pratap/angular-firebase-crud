import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  items: Array<any>;


  constructor(
    public firebaseService: FirebaseService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getData();
  }

  getData(){
    this.firebaseService.getUsers()
    .subscribe(result => {
      this.items = result;
      // this.age_filtered_items = result;
      // this.name_filtered_items = result;
    })
  }

  viewDetails(item){
    this.router.navigate(['/details/'+ item.payload.doc.id]);
  }

  view(item){
    this.router.navigate(['/user-details'])
  }

  capitalizeFirstLetter(value){
    return value.charAt(0).toUpperCase() + value.slice(1);
  }

  // searchByName(){
  //   let value = this.searchValue.toLowerCase();
  //   this.firebaseService.searchUsers(value)
  //   .subscribe(result => {
  //     this.name_filtered_items = result;
  //     this.items = this.combineLists(result, this.age_filtered_items);
  //   })
  // }

  // rangeChange(event){
  //   this.firebaseService.searchUsersByAge(event.value)
  //   .subscribe(result =>{
  //     this.age_filtered_items = result;
  //     this.items = this.combineLists(result, this.name_filtered_items);
  //   })
  // }

  combineLists(a, b){
    let result = [];

    a.filter(x => {
      return b.filter(x2 =>{
        if(x2.payload.doc.id == x.payload.doc.id){
          result.push(x2);
        }
      });
    });
    return result;
  }

}