import { Component, OnInit } from '@angular/core';
import { UserDetailService} from '../shared/user-detail.service';
import { UserDetail } from '../shared/user-detail.model';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  constructor(public service:UserDetailService) { }

  ngOnInit(): void {
    this.service.refreshList();
  }

  populateForm(selectedRecord: UserDetail) {
    this.service.formData = Object.assign({}, selectedRecord);
  }

}
