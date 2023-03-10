import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject, BehaviorSubject  } from 'rxjs';
import { UserService } from './user.service';
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

  constructor(private router: Router,
   private UserService: UserService) {}
 userData:any={};
 role:string;
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
this.role= decodedJwtData.role;
//let isAdmin = decodedJwtData.admin

console.log('jwtData: ' + jwtData)
console.log('decodedJwtJsonData: ' + decodedJwtJsonData)
console.log('decodedJwtData: ' + this.role)


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
  if(getLoginDetail.userInfo.token!=undefined && getLoginDetail.userInfo.token !=null && getLoginDetail.userInfo.token != ""){
   this.router.navigateByUrl('/dashboard');
  }
  else
  {
    this.router.navigateByUrl('/login');
  }
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
  
  isSubscribed(){
   
    let jwt = localStorage.getItem('token');
    let jwtData = jwt.split('.')[1]
let decodedJwtJsonData = window.atob(jwtData)
  let decodedJwtData = JSON.parse(decodedJwtJsonData)
this.role= decodedJwtData.role;
    console.log("role",this.role)
    if(this.role==='dentist'){
    const id=localStorage.getItem('id');
    this.UserService.getUserRecordById(id).subscribe((res: any) => {
      console.log(res)
      if(res.success){
       this.userData = res.getData;
       
      }
    })
      return (!!this.userData[0]?.subscription_details.status);
  }
  else{
  return true;
  }
  }
  private _listners = new Subject<any>();

    listen(): Observable<any> {
       return this._listners.asObservable();
    }

    filter(filterBy: string) {
       this._listners.next(filterBy);
    }
  }
