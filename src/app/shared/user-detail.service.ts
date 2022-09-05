import { Injectable } from '@angular/core';
import { UserDetail } from './user-detail.model';
import { HttpClient } from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class UserDetailService {
  //---------------- Properties---------------
  qns: any[];
  seconds: number;
  timer;
  qnId: number ;
  qnInWords:string;
  qnProgress: number;
  correctAnswerCount: number = 0;
//DI
  constructor(private http: HttpClient) { }
  readonly baseURL = 'http://localhost:1492'
  formData:UserDetail = new UserDetail();
  list:UserDetail[];



   //---------------- Http Methods---------------

   displayTimeElapsed() {
    return Math.floor(this.seconds / 3600) + ':' + Math.floor(this.seconds / 60) + ':' + Math.floor(this.seconds % 60);
  }

   getQuestions() {
    return this.http.get(this.baseURL + '/api/Questions');
  }

  getAnswers() {
    var body = this.qns.map(x => x.qnId);
    return this.http.post(this.baseURL + '/api/Questions/GetAnswers', body);
  }

  getParticipantName() {
    var user = JSON.parse(localStorage.getItem('user'));
    return user.fullName;
  }

  //  GetAnswers(fullName: string, email: string, password: string,mobile:string) {
  //   var body = {
  //     Name: fullName,
  //     Email: email,
  //     Password: password,
  //     Mobile: mobile
  //   }
  //   return this.http.post(this.baseURL + '/api/Questions/GetAnswers', body);
  // }

  insertUser(fullname: string, email: string, password: string, mobile:string) {
    var body = {
      Fullname: fullname,
      Email: email,
      Password: password,
      Mobile: mobile
    }
    return this.http.post(this.baseURL + '/api/UserDetail', body);
  }

  submitScore() {
    var body = JSON.parse(localStorage.getItem('user'));
    body.Score = this.correctAnswerCount;
    body.TimeSpent = this.seconds;
    return this.http.put(this.baseURL + "/api/UserDetail/{id}", body);
  }


  postUserDetail() {
    return this.http.post(this.baseURL, this.formData,{responseType: 'text'});
  }

  putUserDetail() {
    return this.http.put(`${this.baseURL}/${this.formData.userId}`, this.formData);
  }

  // deleteUserDetail(id: number) {
  //   return this.http.delete(`${this.baseURL}/${id}`);
  // }

  refreshList() {
    this.http.get(this.baseURL)
      .toPromise()
      .then(res =>this.list = res as UserDetail[]);
  }

}
