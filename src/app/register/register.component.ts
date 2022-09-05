import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserDetailService } from '../shared/user-detail.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  constructor(public service:UserDetailService,private route : Router) { }

  ngOnInit(): void {
  }

  OnSubmit(fullname:string,email:string, password:string, mobile:string){
    this.service.insertUser(fullname,email,password,mobile).subscribe(
      (data : any) =>{
        localStorage.clear();
        localStorage.setItem('user',JSON.stringify(data));
        this.route.navigate(['/quiz']);
      }
    );
  // }
  // onSubmit(form: NgForm) {
  //   this.service.postUserDetail().subscribe(
  //     response=>{
  //       this.resetForm(form.value);
  //       console.log(response);
  //     },
  //     err=> {console.log()}
  //   );

    // insertRecord(form: NgForm) {
    //   this.service.postUserDetail().subscribe(
    //     res => {
    //       this.resetForm(form);
    //       this.service.refreshList();
    //     },
    //     err => { console.log(err); }
    //   );
    // }

    
    }
}
