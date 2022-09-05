import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserDetailService } from '../shared/user-detail.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router,private userdetails: UserDetailService) { }

  ngOnInit(): void {
  }

  SignOut() {
    localStorage.clear();
    clearInterval(this.userdetails.timer);
    this.router.navigate(['/register']);
  }

}
