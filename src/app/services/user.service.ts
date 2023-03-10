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
  getUsersRecordById: string;
  addPricingPlan: string;
  getPlanList: string;
  getPlanById: string;
  updateUserById: string;
  updatePlanById: String;
  userRegister:string;
  userSubscription:string;
  uploadXray:string;
  forgotPass: string;
  otpVerify: string;
  setNewPass: string;
  cancelUserSub:string;
  userXrayById:string;
  xrayList:string;
  getXrayById: string;
  setEvalData: string;
  setEvalDataFromAdmin: any;


  constructor(private http: HttpClient) {
    this.apiHost = environment.API_HOST;
    this.login = this.apiHost + `login`;
    this.logout = this.apiHost + `admin/logout`;
    this.addAdmin = this.apiHost + 'adminRegister';
    this.addAdminList = this.apiHost + `getUserRecordList`;
    this.getUsersRecordById = this.apiHost + 'getUserRecordById';
    this.addPricingPlan = this.apiHost + `setPricingPlan`;
    this.getPlanList = this.apiHost + 'getPlanList';
    this.getPlanById = this.apiHost + 'getPlanById';
    this.updateUserById = this.apiHost + 'updateUserById';
    this.updatePlanById = this.apiHost + 'updatePlanById';
    this.userRegister = this.apiHost + 'adminRegistration';
    this.userSubscription = this.apiHost + 'getSubscriptionDetail';
    this.uploadXray = this.apiHost + 'upload-xray';
    this.forgotPass = this.apiHost + 'auth/forgot-password';
    this.otpVerify = this.apiHost + 'auth/reset-password';
    this.setNewPass = this.apiHost + 'auth/update-password';
    this.cancelUserSub = this.apiHost + 'cancelUserSub';
    this.userXrayById = this.apiHost + 'getUserXrayById';
    this.xrayList = this.apiHost + 'getXrayList';
    this.getXrayById = this.apiHost + 'getXrayById';
    this.setEvalData = this.apiHost + 'setEvaluatedData';
    this.setEvalDataFromAdmin = this.apiHost + 'setEvaluatedDataFromAdmin'

  }
  onLogin(requestParameters: string) {
    return this.http.post(`${this.login}`, JSON.parse(requestParameters), {});
  }

  addUser(requestParameters) {
    return this.http.post(`${this.userRegister}`, requestParameters, {});
  }
  onLogout() {
    return this.http.get(`${this.logout}`);
  }
  getUserList() {
    return this.http.get(`${this.addAdminList}`);
  }
  getUserRecordById(id) {
    return this.http.get(`${this.getUsersRecordById}?dentist_id=${id}`);
  }
  addPrice(requestParameters) {
    return this.http.post(`${this.addPricingPlan}`, requestParameters, {});
  }
  getSubscriptionList() {
    return this.http.get(`${this.getPlanList}`);
  }
  getSubPlanById(id) {
    return this.http.get(`${this.getPlanById}?subscription_id=${id}`);
  }
  getUserXrayById(id) {
    return this.http.get(`${this.userXrayById}?dentist_id=${id}`);
  }
  getXrayList() {
    return this.http.get(`${this.xrayList}`);
  }
  updateUser(requestParameters, id) {
    return this.http.post(`${this.updateUserById}?dentist_id=${id}`, requestParameters, {});
  }
  updatePlan(requestParameters, id) {
    return this.http.post(`${this.updatePlanById}?id=${id}`, requestParameters, {});
  }
  cancelUserPlan( id) {
    return this.http.post(`${this.cancelUserSub}?dentist_id=${id}`,{});
  }
  getSubscription(requestParameters , id) {
    return this.http.post(`${this.userSubscription}?id=${id}`,requestParameters,{})
  }
  addXray(requestParameters){
    return this.http.post(`${this.uploadXray}`,requestParameters,{});
  }
  getXray(id){
    return this.http.get(`${this.getXrayById}?xray_id=${id}`);
  }
  addEvalData(requestParameters) {
    return this.http.post(`${this.setEvalData}`, requestParameters, {});
  }
  addEvalDataFromAdmin(requestParameters) {
    return this.http.post(`${this.setEvalDataFromAdmin}`, requestParameters, {});
  }
  forgotPassword(requestParameters){
    return this.http.post(`${this.forgotPass}`, requestParameters,{});
  }
  VerifyingOTP(requestParameters){
    return this.http.post(`${this.otpVerify}`, requestParameters, {});
  }
  setNewPassword(requestParameters){
    return this.http.put(`${this.setNewPass}`, requestParameters, {});
  }
}
