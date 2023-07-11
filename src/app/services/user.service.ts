import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEvent, HttpEventType } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiHost: string;
  payApi: String;
  login: string;
  addAdmin: string;
  logout: string;
  register: string;
  addAdminList: string;
  getUsersRecordById: string;
  addPricingPlan: string;
  getPlanList: string;
  getPlanListPricing: string;
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
  getEvaluationById:string;
  testApi: string;
  subscriptionorderuser: string;
  subscriptioncompleteorder: string;

  paypalReq: string;
  getUserAllSubsById: any;
  AIData:string;
  newAIData:String;
  flag:String;
  subscriberCount:String;
  xrayEvalCount: String;
  planCount : String;
  amtEarned : String;
  xrayNotEval :String;
  unsubscriberCount : String;
 totXrayById : String;
 totXrayEvalById:String;
 totCavityByAI : String;
 userPlanById :String;
 rstPwd : String;
 renewSub : String;
 sub_expire_time:String;
 deleteXray: String;
 setXrayData: String;
 deleteSubs: String;
 planDeleteErr: String;
 activeSubs: String;
 accuracyOfSys: String;
 totalCavityCount: String;

 // ! paypal subscription
 paypalToken: String;
 paypalProdID: String;
 paypalPlans: String;
 paypalUserSubs: String;
 failureTransaction: String;

 // * country api
 country: String;
 states: String;
  constructor(private http: HttpClient) {
    this.apiHost = environment.API_HOST;
    this.payApi = environment.PAY_API;
    this.login = this.apiHost + `login`;
    this.logout = this.apiHost + `admin/logout`;
    this.addAdmin = this.apiHost + 'adminRegister';
    this.addAdminList = this.apiHost + `getUserRecordList`;
    this.getUsersRecordById = this.apiHost + 'getUserRecordById';
    this.addPricingPlan = this.apiHost + `setPricingPlan`;
    this.getPlanList = this.apiHost + 'getPlanList';
    this.getPlanListPricing = this.apiHost + 'getPlanListForPricing';
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
    this.getEvaluationById = this.apiHost +'getEvaluationById';
    this.testApi = this.apiHost + 'testApi';
    this.subscriptionorderuser = this.apiHost + 'order';
    this.subscriptioncompleteorder = this.apiHost + 'subscriptionOrder';
    this.getUserAllSubsById = this.apiHost + 'getUserAllSubListById'
    this.paypalReq = this.apiHost + 'create_payment';
    this.AIData = this.apiHost +'loadAIMarking';
    this.newAIData = this. apiHost + 'updateAIMarking';
    this.flag = this.apiHost + 'setFlag';
    this.subscriberCount = this.apiHost +'noOfSubscriber';
    this.xrayEvalCount = this.apiHost +'noOfXrayEval';
    this.planCount = this.apiHost + 'noOfPlans';
    this.amtEarned = this.apiHost + 'amtEarned';
    this.xrayNotEval = this.apiHost + 'noOfXrayNotEval';
    this.unsubscriberCount = this.apiHost + 'noOfUnsubscriber';
    this.totXrayById = this.apiHost + 'noOfXrayById';
    this.totXrayEvalById = this.apiHost + 'noOfXrayEvalById';
    this.totCavityByAI =this.apiHost + 'noOfCavitiesByAIofUser';
    this.accuracyOfSys = this.apiHost + 'accuracyPercentageSystem';
    this.userPlanById = this.apiHost + 'userPlanById';
    this.rstPwd = this.apiHost + 'resetPassword';
    this.renewSub = this.apiHost + 'getSubscriptionRenew';
    this.sub_expire_time=this.apiHost + 'sub-expiration-time'
    this.deleteXray = this.apiHost + 'delete-xray';
    this.setXrayData = this.apiHost + 'saveEvaluation';
    this.deleteSubs = this.apiHost + 'deleteSubsById';
    this.planDeleteErr = this.apiHost + 'deletePlanIfErrByID';
    this.activeSubs = this.apiHost + 'activateSubsById';
    this.totalCavityCount = this.apiHost + 'cavitiesCountOfAI';

    this.country = this.apiHost + 'countries';
    this.states = this.apiHost + 'countries-states';

    // ! paypal subscription
    this.paypalToken = this.payApi + 'oauth2/token';
    this.paypalProdID = this.payApi + 'catalogs/products';
    this.paypalPlans = this.payApi + 'billing/plans';
    this.paypalUserSubs = this.payApi + 'billing/subscriptions';
    this.failureTransaction = this.apiHost + 'failureTrans'
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
  getUserAllSubById(id) {
    return this.http.get(`${this.getUserAllSubsById}?dentist_id=${id}`);
  }
  addPrice(requestParameters) {
    return this.http.post(`${this.addPricingPlan}`, requestParameters, {});
  }
  getSubscriptionList() {
    return this.http.get(`${this.getPlanList}`);
  }
  getSubscriptionListPricing() {
    return this.http.get(`${this.getPlanListPricing}`);
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
  getSubscriptionRenew(requestParameters , id) {
    return this.http.post(`${this.renewSub}?id=${id}`,requestParameters,{})
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
  getEvalById(id) {
    return this.http.get(`${this.getEvaluationById}?xray_id=${id}`);
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
  allWebUser(){
    return this.http.get(`https://api.glabol.com/admin/get-all-website-user`);
  }
  order(requestParameter: any) {
    return this.http.post(`${this.subscriptionorderuser}`, requestParameter, {});
  }

  ordercomplete(requestParameter: any) {
    return this.http.post(`${this.subscriptioncompleteorder}`, requestParameter, {});
  }

  paypalOrderReq(requestParameter: any){
    return this.http.post(`${this.paypalReq}`, requestParameter, {})
  }
  generateAIData(requestParameter: any){
    var myHeaders = new HttpHeaders();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Access-Control-Allow-Origin", "*");
    myHeaders.append("Access-Control-Allow-Headers", "*");
    const requestOptions = {
      headers: myHeaders,
    };
    return this.http.post(`https://c602-52-173-187-78.ngrok-free.app/predict`, requestParameter, requestOptions)
  }
  sendXrayData(data: any){
    return this.http.post(`${this.setXrayData}`, data, {})
  }
  loadAIData(requestParameters: any){
    return this.http.post(`${this.AIData}`, requestParameters, {});
  }
  updateAIData(requestParameters: any){
    return this.http.post(`${this.newAIData}`, requestParameters, {});
  }
  setFlag(requestParameters:any){
    return this.http.post(`${this.flag}`, requestParameters, {});
  }
  noOfSubscriber() {
    return this.http.get(`${this.subscriberCount}`);
  }
  noOfUnsubscriber() {
    return this.http.get(`${this.unsubscriberCount}`);
  }
  noOfXrayEval() {
    return this.http.get(`${this.xrayEvalCount}`);
  }
  noOfXrayNotEval() {
    return this.http.get(`${this.xrayNotEval}`);
  }
  noOfPlans() {
    return this.http.get(`${this.planCount}`);
  }
  totAmtEarned() {
    return this.http.get(`${this.amtEarned}`);
  }
  noOfXrayByID(id) {
    return this.http.get(`${this.totXrayById}?dentist_id=${id}`);
  }
  noOfXrayEvalByID(id) {
    return this.http.get(`${this.totXrayEvalById}?dentist_id=${id}`);
  }
 noOfCavityByAI(id) {
    return this.http.get(`${this.totCavityByAI}?dentist_id=${id}`);
  }
  getUserPlanById(id) {
    return this.http.get(`${this.userPlanById}?dentist_id=${id}`);
  }
  resetPassword(requestParameters){
    return this.http.post(`${this.rstPwd}`,requestParameters,{});
  }
  getUserSubExpireTime(id) {
    return this.http.get(`${this.sub_expire_time}?dentist_id=${id}`);
  }
  getCountries(){
    return this.http.get(`${this.country}`);
  }
  getStateByCountries(requestParameters){
    return this.http.post(`${this.states}`, requestParameters, {});
  }
  deleteXrayByID(id: any, name: any){
    return this.http.post(`${this.deleteXray}/${id}`, name, {});
  }
  deleteSubsById(id: any){
    return this.http.post(`${this.deleteSubs}`, id, {})
  }
  planDeleteDueToErr(id: any){
    return this.http.post(`${this.planDeleteErr}`, id)
  }
  activeSubsID(id: any){
    return this.http.post(`${this.activeSubs}`, id, {})
  }
  getAccuracyOfSys(){
    return this.http.get(`${this.accuracyOfSys}`);
  }
  handleTotalCavityCount(){
    return this.http.get(`${this.totalCavityCount}`)
  }

  // ! paypal subscription
  payPalTokenGen(requestParameters: any){
    const body = new URLSearchParams();
    body.set("grant_type", "client_credentials")
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Basic ' + btoa(`${environment.CLIENT_ID}:${environment.CLIENT_SECRET_KEY}`)
      })
    };
    return this.http.post(`${this.paypalToken}`, body, httpOptions)
  }
  paypalGenProdID(requestParameter: any, token: any){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(`${environment.CLIENT_ID}:${environment.CLIENT_SECRET_KEY}`)
        // 'Authorization': 'Bearer ' + token
      })
    };
    return this.http.post(`${this.paypalProdID}`, requestParameter, httpOptions)
  }
  paypalDataByProdID(id: any, token: any){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(`${environment.CLIENT_ID}:${environment.CLIENT_SECRET_KEY}`)
        // 'Authorization': 'Bearer ' + token
      })
    };
    return this.http.get(`${this.paypalProdID}/${id}`, httpOptions)
  }
  paypalCreatePlan(requestParameter: any, token: any){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(`${environment.CLIENT_ID}:${environment.CLIENT_SECRET_KEY}`)
        // 'Authorization': 'Basic ' + btoa('AeKffQqEC4lR2FtZBUdTIlOz6vMXajfBakTU2IIqdmA18KxLwV7FHpfMagXrAqf0RAwc7evqE3_HcvKr:EPNEGNEQmmqoQ3-Re3U7gyVkH3jIPS1h8Ai_mti1fBdMwkpIu2GeQxqFxg3Oy4JetoMQM-PLMK4yjBLU')
        // 'Authorization': 'Bearer ' + token
      })
    };
    return this.http.post(`${this.paypalPlans}`, requestParameter, httpOptions)
  }
  paypalPayment(requestParameter: any){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(`${environment.CLIENT_ID}:${environment.CLIENT_SECRET_KEY}`)
        // 'Authorization': 'Bearer ' + token
      })
    };
    return this.http.post(`${this.paypalUserSubs}`, requestParameter, httpOptions)
  }
  paypalSuspend(requestParameter: any, id: any){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(`${environment.CLIENT_ID}:${environment.CLIENT_SECRET_KEY}`)
        // 'Authorization': 'Bearer ' + token
      })
    };
    return this.http.post(`${this.paypalUserSubs}/${id}/suspend`, requestParameter, httpOptions)
  }
  paypalActivate(requestParameter: any, id: any){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(`${environment.CLIENT_ID}:${environment.CLIENT_SECRET_KEY}`)
        // 'Authorization': 'Bearer ' + token
      })
    };
    return this.http.post(`${this.paypalUserSubs}/${id}/activate`, requestParameter, httpOptions)
  }
  paypalRevise(requestParameter: any, id: any){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(`${environment.CLIENT_ID}:${environment.CLIENT_SECRET_KEY}`)
        // 'Authorization': 'Bearer ' + token
      })
    };
    return this.http.post(`${this.paypalUserSubs}/${id}/revise`, requestParameter, httpOptions)
  }
  paypalCancel(requestParameter: any, id: any){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(`${environment.CLIENT_ID}:${environment.CLIENT_SECRET_KEY}`)
        // 'Authorization': 'Bearer ' + token
      })
    };
    return this.http.post(`${this.paypalUserSubs}/${id}/cancel`, requestParameter, httpOptions)
  }
  paypalTransactions(id: any){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(`${environment.CLIENT_ID}:${environment.CLIENT_SECRET_KEY}`)
        // 'Authorization': 'Bearer ' + token
      })
    };
    return this.http.get(`${this.paypalUserSubs}/${id}/transactions?start_time=2018-01-21T07:50:20.940Z&end_time=2023-08-21T07:50:20.940Z`,  httpOptions)
  }
  handleFailedTransaction(id: any){
    return this.http.post(`${this.failureTransaction}`, id, {})
  }
}
