import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEvent, HttpEventType } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiHost: string;
  login: string;
  addAdmin: string;
  logout: string;
  register: string;
  addAdminList: string;
  getDentistRecordById: string;
  addPricingPlan:string;
  constructor(private http: HttpClient) {
    this.apiHost = environment.API_HOST;
    this.login = this.apiHost + `login`;
    this.logout = this.apiHost + `admin/logout`;
    this.addAdmin = this.apiHost+ 'admin-user';
    this.addAdminList = this.apiHost + `getUserRecordList`;
    this.getDentistRecordById= this.apiHost + 'getDentistRecordById';
    this.addPricingPlan = this.apiHost + `setPricingPlan`;
  }
   onLogin(requestParameters: string) {
    return this.http.post(`${this.login}`, JSON.parse(requestParameters), {});
  }

  addRole(requestParameters) {
    return this.http.post(`${this.addAdmin}`, requestParameters, {});
  } 
  onLogout() {
    return this.http.get(`${this.logout}`);
  }
  getUserList() {
    return this.http.get(`${this.addAdminList}`);
  }
  getUserRecordById(id){
    return this.http.get(`${this.getDentistRecordById}?dentist_id=${id}`);
  }
  addPrice(requestParameters) {
    return this.http.post(`${this.addPricingPlan}`, requestParameters, {});
  }
}
