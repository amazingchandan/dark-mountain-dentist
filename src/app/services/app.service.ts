import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
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

  private approvalStageMessage = new BehaviorSubject(false);
  currentApprovalStageMessage = this.approvalStageMessage.asObservable();

  private forImage = new BehaviorSubject({})
  currentApprovalStageImage = this.forImage.asObservable();


  constructor(private router: Router,
    private UserService: UserService,
    private route: ActivatedRoute) {}

  private getUrl = new BehaviorSubject(false)
  currentUrl = this.getUrl.asObservable();

  updateGetUrl(url: boolean){
    this.getUrl.next(url)
    console.log(url)
  }

  userData: any = {};
  role: string;
  updateApprovalMessage(message: boolean) {
    this.approvalStageMessage.next(message)
    console.log(message);
  }
  updateApprovalImage(message: any) {
    this.forImage.next(message)
    console.log(message);
  }

  urlChange(){
    console.log(this.router.url)
    if(this.router.url.split('/')[1] == 'evaluate-x-ray' && localStorage.getItem('url') == '1'){
      return true
    } else {
      return false
    }
  }

  login(getLoginDetail) {
    localStorage.setItem('userInfo', JSON.stringify(getLoginDetail['userInfo']));
    localStorage.setItem('id', getLoginDetail.userInfo.id);
    // localStorage.setItem('email', getLoginDetail.userInfo.email);
    // localStorage.setItem('role', getLoginDetail.userInfo.role);
    // localStorage.setItem('objId', getLoginDetail.userInfo.objId);
    //localStorage.setItem('isSub', getLoginDetail.userInfo.subscribed);
    localStorage.setItem('token', getLoginDetail.userInfo.token);

    //console.log(getLoginDetail.userInfo.role)


    let jwt = getLoginDetail.userInfo.token

    let jwtData = jwt.split('.')[1]
    let decodedJwtJsonData = window.atob(jwtData)
    let decodedJwtData = JSON.parse(decodedJwtJsonData)
    this.role = decodedJwtData.role;
    //let isAdmin = decodedJwtData.admin

    //  console.log('jwtData: ' + jwtData)
    // console.log('decodedJwtJsonData: ' + decodedJwtJsonData)
    //console.log('decodedJwtData: ' + this.role)


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
    if (getLoginDetail.userInfo.token != undefined && getLoginDetail.userInfo.token != null && getLoginDetail.userInfo.token != "") {
      this.UserService.getUserRecordById(getLoginDetail.userInfo.id).subscribe((res: any) => {
        console.log(res, "*****");
        if (res.getData[0]?.role == 'dentist') {
          let status = res.getData[0]?.subscription_details.status;
          console.log(status)
          if (status == true || new Date(res.getData[0].subscription_details.end_date).getTime() > Date.now()) {
            this.router.navigateByUrl('/dashboard');
          }

          //this.router.navigateByUrl('/dashboard');

          else {
            this.router.navigateByUrl('/pricing/' + getLoginDetail.userInfo.id);
          }
        }
        else {
          this.router.navigateByUrl('/dashboard');
        }
      })
    }
    else {
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

  roleAdmin(){
    if(JSON.parse(localStorage.getItem("userInfo")).role == 'admin'){
      return true
    } else {
      return false
    }
  }

  pricingPage(){
    if(JSON.parse(localStorage.getItem("userInfo"))?.role == 'dentist' && !JSON.parse(localStorage.getItem("userInfo"))?.subscribed){
      return true;
    } else {
      this.UserService.getUserRecordById(JSON.parse(localStorage.getItem("userInfo")).id).subscribe((res: any) => {
        console.log(res)
        // return true;
        return false;
      })
    }
  }

  // roleOfAdmin(){

  // }

  roleDentist(){
    if(JSON.parse(localStorage.getItem("userInfo")).role == 'dentist'){
      return true
    } else {
      return false
    }
  }

  async subsForDashboard(){
    let subsNotEnded;
    this.UserService.getUserRecordById(JSON.parse(localStorage.getItem("userInfo")).id).subscribe((res: any) => {
      // if(new Date(res?.getData[0]?.subscription_details?.end_date).getTime() > Date.now()){
      //   console.log(subsNotEnded, true)
      //   subsNotEnded = true
      // } else {
      //   subsNotEnded = false
      // }
      if((JSON.parse(localStorage.getItem("userInfo")).role == 'admin' && !JSON.parse(localStorage.getItem("userInfo")).subscribed)  || (JSON.parse(localStorage.getItem("userInfo")).role == 'dentist' && new Date(res?.getData[0]?.subscription_details?.end_date).getTime() > Date.now()) || (JSON.parse(localStorage.getItem("userInfo")).role == 'dentist' && JSON.parse(localStorage.getItem("userInfo")).subscribed)){
        console.log(JSON.parse(localStorage.getItem("userInfo")).role, subsNotEnded)
        return true
      } else {
        console.log(JSON.parse(localStorage.getItem("userInfo")).role, subsNotEnded)
        return false
      }
    })
  }

  async subsAlready(){
    let subsNotEnded;
    this.UserService.getUserRecordById(JSON.parse(localStorage.getItem("userInfo")).id).subscribe((res: any) => {
      // if(new Date(res?.getData[0]?.subscription_details?.end_date).getTime() > new Date('2023/06/14').getTime()){
      //   console.log(subsNotEnded, true)
      //   subsNotEnded = true
      // } else {
      //   subsNotEnded = false
      // }
      if(JSON.parse(localStorage.getItem("userInfo")).subscribed || new Date(res?.getData[0]?.subscription_details?.end_date).getTime() > Date.now()){
        return true
      } else {
        return false
      }
    })
    // let id = JSON.parse(localStorage.getItem("userInfo")).id
    // await this.UserService.getUserRecordById(id).subscribe((res: any) => {
    //   console.log(res)
    //   if(res.getData[0]?.subscription_details.status){
    //     return true
    //   } else {
    //     return false
    //   }
    // })
  }

  async isSubscribed() {

    let jwt = localStorage.getItem('token');
    let jwtData = jwt.split('.')[1]
    let decodedJwtJsonData = window.atob(jwtData)
    let decodedJwtData = JSON.parse(decodedJwtJsonData)
    this.role = decodedJwtData.role;
    console.log("role", this.role)
    if (this.role === 'dentist') {
      console.log("inside if")
      const id = localStorage.getItem('id');
      const d = await this.UserService.getUserRecordById(id).subscribe((res: any) => {
        console.log(res)
        if (res.success) {
          this.userData = res.getData;
          console.log("iff", !!this.userData[0]?.subscription_details.status, this.userData[0]?.subscription_details.status)
          return (!!this.userData[0]?.subscription_details.status);
        }
      })
    }
    else {
      console.log("else")
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
