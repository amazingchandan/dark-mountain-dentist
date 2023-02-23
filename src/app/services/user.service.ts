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
  constructor(private http: HttpClient) {
    this.apiHost = environment.API_HOST;
    this.login = this.apiHost + `login`;
    this.logout = this.apiHost + `admin/logout`;
    this.addAdmin = this.apiHost+ 'admin-user';
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

}
