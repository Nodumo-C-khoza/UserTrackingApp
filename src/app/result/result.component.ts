import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserDetailService } from '../shared/user-detail.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  constructor(private router: Router,public userdetails: UserDetailService) { }

  ngOnInit(): void {
    if (parseInt(localStorage.getItem('qnProgress')) == 5) {
      this.userdetails.seconds = parseInt(localStorage.getItem('seconds'));
      this.userdetails.qnProgress = parseInt(localStorage.getItem('qnProgress'));
      this.userdetails.qns = JSON.parse(localStorage.getItem('qns'));
    this.userdetails.getAnswers().subscribe(
      (data: any) => {
        this.userdetails.correctAnswerCount = 0;
        this.userdetails.qns.forEach((e, i) => {
          if (e.answer == data[i])
            this.userdetails.correctAnswerCount++;
          e.correct = data[i];
        });
      }
    );
    }else{
      this.router.navigate(['/quiz']);
    }

    
  }

  OnSubmit() {
    this.userdetails.submitScore().subscribe(() => {
      this.restart();
    });
  }

  restart() {
    localStorage.setItem('qnProgress', "0");
    localStorage.setItem('qns', "");
    localStorage.setItem('seconds', "0");
    this.router.navigate(['/quiz']);
  }

}
