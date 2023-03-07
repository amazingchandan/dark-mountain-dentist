import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent {
  constructor(private apiService: UserService){}
  resetState = false;
  setNewPass = false;
  emailReset = '';
  data: '';
  otp = '';
  newPass = "";
  cnfPass = "";
  onEmailReset(event: any){
    this.emailReset = (<HTMLInputElement>event.target).value.trim();
  }
  onOTP(event: any){
    this.otp = (<HTMLInputElement>event.target).value.trim();
  }
  onNewPass(event: any){
    this.newPass = (<HTMLInputElement>event.target).value.trim();
  }
  onCnfPass(event: any){
    this.cnfPass = (<HTMLInputElement>event.target).value.trim();
  }
  // time = 5;
  handleReset(){
    // console.log(this.emailReset);
    // for(let i  = this.time; i >= 0; i--){
      //   setTimeout(function () {
        //     console.log(i);
        //   },(this.time - i) * 1000);
        // }
    if(this.emailReset !== ''){
      this.resetState = true
      this.apiService.forgotPassword({email: this.emailReset}).subscribe((res: any) => {
        console.log("Email done!");
        this.data = res.data;
      });
    }

  }
  // countDown() {
  //   for(let i  = this.time; i >= 0; i--){
  //     setTimeout(function () {
  //       console.log(i);
  //     },(this.time - i) * 1000);
  //   }
  // }
  handleClick(){
    this.resetState = false;
  }
  otpVerify(){
    if(this.otp !== ''){
      this.setNewPass = true;
      this.apiService.VerifyingOTP({email: this.emailReset, token: this.data, otp: this.otp}).subscribe((res:any) => {
        console.log("OTP done!");
      })
    }
  }
  setNew(){
    if(this.newPass !== "" && this.cnfPass !== "" && this.newPass == this.cnfPass){
      this.apiService.setNewPassword({email: this.emailReset, newPass: this.newPass, cnfPass: this.cnfPass}).subscribe((res:any) => {
        console.log("Password changes");
      })
    }
  }
}
