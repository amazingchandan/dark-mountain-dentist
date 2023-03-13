import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject, BehaviorSubject  } from 'rxjs';
// import { FormGroup } from '@angular/forms';



@Injectable({
  providedIn: 'root'
})
export class AppService {

  public user = {
    firstName: 'Alexander',
    lastName: 'Pierce',
    image: 'assets/img/user2-160x160.jpg',
  };

  private approvalStageMessage = new BehaviorSubject({});
  currentApprovalStageMessage = this.approvalStageMessage.asObservable();

  constructor(private router: Router) {}

  updateApprovalMessage(message: {}) {
    this.approvalStageMessage.next(message)
    console.log(message);

    }

  login(getLoginDetail) {
    localStorage.setItem('userInfo', JSON.stringify(getLoginDetail['userInfo']));
    localStorage.setItem('id', getLoginDetail.userInfo.id);
   // localStorage.setItem('email', getLoginDetail.userInfo.email);
   // localStorage.setItem('role', getLoginDetail.userInfo.role);
   // localStorage.setItem('objId', getLoginDetail.userInfo.objId);
    //localStorage.setItem('isSub', getLoginDetail.userInfo.subscribed);
    localStorage.setItem('token',getLoginDetail.userInfo.token);

    //console.log(getLoginDetail.userInfo.role)


   let jwt = getLoginDetail.userInfo.token

let jwtData = jwt.split('.')[1]
let decodedJwtJsonData = window.atob(jwtData)
let decodedJwtData = JSON.parse(decodedJwtJsonData)

let isAdmin = decodedJwtData.admin

console.log('jwtData: ' + jwtData)
console.log('decodedJwtJsonData: ' + decodedJwtJsonData)
console.log('decodedJwtData: ' + decodedJwtData.role)
console.log('Is admin: ' + isAdmin)

console.log(getLoginDetail.userInfo.token)
  /* if(decodedJwtData.role==="dentist")
   {
    if (getLoginDetail.userInfo.subscribed==true)
   {
    this.router.navigateByUrl('/');
  }
  else{ (this.router.navigateByUrl('pricing'));}
   }
   else{
    this.router.navigateByUrl('/');
   }*/
  // ! changed here
  //  this.router.navigateByUrl('/');
   this.router.navigateByUrl('/dashboard');
  }

    addTripData(tripData: any) {
    localStorage.setItem('tripInfo', JSON.stringify(tripData));
  }

  logout() {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('id');
   // localStorage.removeItem('email');
   // localStorage.removeItem('role');
    //localStorage.removeItem('objId');
    localStorage.removeItem('token');
    this.router.navigateByUrl('login');
  }

  loggedIn() {
    return (!!localStorage.getItem("token"));
  }

  private _listners = new Subject<any>();

    listen(): Observable<any> {
       return this._listners.asObservable();
    }

    filter(filterBy: string) {
       this._listners.next(filterBy);
    }
  }
