import { Component, OnInit } from '@angular/core';
import { UserDetailService } from 'src/app/shared/user-detail.service';
import { NgForm } from '@angular/forms';

import { UserDetail } from 'src/app/shared/user-detail.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-detail-form',
  templateUrl: './user-detail-form.component.html',
  styleUrls: []
})
export class UserDetailFormComponent implements OnInit {
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
//dependency injection
  constructor(public service: UserDetailService, private toastr: ToastrService) { }

  ngOnInit(): void {
    
  }

  onSubmit(form: NgForm) {
    this.service.postUserDetail().subscribe(
      response=>{
        this.resetForm(form.value);
        console.log(response);
      },
      err=> {console.log()}
    );
    // if (this.service.formData.UserId == 0)
    //   this.insertRecord(form);
    // else
    //   this.updateRecord(form);
  }

  insertRecord(form: NgForm) {
    this.service.postUserDetail().subscribe(
      res => {
        this.resetForm(form);
        this.service.refreshList();
      },
      err => { console.log(err); }
    );
  }

  resetForm(form: NgForm) {
    form.form.reset();
    this.service.formData = new UserDetail();
  }
}
