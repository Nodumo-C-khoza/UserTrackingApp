import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserDetailService } from '../shared/user-detail.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  constructor(private router: Router,public userdetails: UserDetailService) { }

  ngOnInit(): void {
    if (parseInt(localStorage.getItem('seconds')) > 0) {
      this.userdetails.seconds = parseInt(localStorage.getItem('seconds'));
      this.userdetails.qnProgress = parseInt(localStorage.getItem('qnProgress'));
      this.userdetails.qns = JSON.parse(localStorage.getItem('qns'));
    this.userdetails.qnProgress=0;
    this.userdetails.seconds=0;
    this.userdetails.getQuestions().subscribe(
      (data :any)=>{
        this.userdetails.qns = data;
        this.startTimer();
        console.log(this.userdetails.qns);
      }
    );
    }else{
      this.userdetails.seconds = 0;
      this.userdetails.qnProgress = 0;
      this.userdetails.getQuestions().subscribe(
        (data: any) => {
          this.userdetails.qns = data;
          this.startTimer();
        }
      );
    }
  }

    startTimer() {
      this.userdetails.timer = setInterval(() => {
        this.userdetails.seconds++;
        localStorage.setItem('seconds', this.userdetails.seconds.toString());
      }, 1000);
    }

    Answer(qID, choice) {
      this.userdetails.qns[this.userdetails.qnProgress].answer = choice;
      localStorage.setItem('qns', JSON.stringify(this.userdetails.qns));
      this.userdetails.qnProgress++;
      localStorage.setItem('qnProgress', this.userdetails.qnProgress.toString());
      if (this.userdetails.qnProgress == 5) {
        clearInterval(this.userdetails.timer);
        this.router.navigate(['/result']);
      }
    }
  }


