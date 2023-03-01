import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AppService {

  public user = {
    firstName: 'Alexander',
    lastName: 'Pierce',
    image: 'assets/img/user2-160x160.jpg',
  };

  constructor(private router: Router) {}

  login(getLoginDetail) {
    localStorage.setItem('userInfo', JSON.stringify(getLoginDetail['userInfo']));
    localStorage.setItem('id', getLoginDetail.userInfo.id);
    localStorage.setItem('email', getLoginDetail.userInfo.email);
    localStorage.setItem('role', getLoginDetail.userInfo.role);
    localStorage.setItem('objId', getLoginDetail.userInfo.objId);
    console.log(getLoginDetail.userInfo.role)
    
    this.router.navigateByUrl('dashboard');
  }

    addTripData(tripData: any) {
    localStorage.setItem('tripInfo', JSON.stringify(tripData));
  }

  logout() {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('id');
    localStorage.removeItem('email');
    localStorage.removeItem('role');
    localStorage.removeItem('objId');
    this.router.navigate(['/login']);
  }

  loggedIn() {
    return (!!localStorage.getItem("id") && !!localStorage.getItem("email") && !!localStorage.getItem("objId") && !!localStorage.getItem("role"));
  }

  private _listners = new Subject<any>();

    listen(): Observable<any> {
       return this._listners.asObservable();
    }

    filter(filterBy: string) {
       this._listners.next(filterBy);
    }
  }