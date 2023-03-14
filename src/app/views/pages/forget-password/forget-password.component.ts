import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { of, catchError } from 'rxjs';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {
  display: any = `00:00`;
  public resetState = false;
  setNewPass = false;
  timePassed = false;
  emailReset = '';
  data: '';
  otp = '';
  newPass = "";
  cnfPass = "";
  ALPHA_NUMERIC_REGEX = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=\S+$).{7,20}$/;

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
    const testBy = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    // console.log(this.emailReset);
    // for(let i  = this.time; i >= 0; i--){
      //   setTimeout(function () {
        //     console.log(i);
        //   },(this.time - i) * 1000);
        // }
    if(this.emailReset !== ''){

      let isValid = testBy.test(this.emailReset.toLowerCase());
      if (!isValid) {
        Swal.fire({
          text: 'Please enter valid email',
          icon: 'warning'
        });
        return false;
      }
      this.apiService.forgotPassword({email: this.emailReset}).pipe(
        catchError(err => of([err]))
      ).subscribe((res: any) => {
        if(res.data){
          console.log("Email done!", res.otp);
          this.data = res.data;
          this.resetState = true;
          this.timePassed = false;
          this.timer(2);
        } else {
          Swal.fire({
            text: `An account with email address ${this.emailReset} does not exists, please register.`,
            icon: 'error'
          });
          return false;
        }
      });

    } else if(this.emailReset.trim() == '' || this.emailReset == '') {
      console.log("email not entered");
      Swal.fire({
        text: 'Please enter email',
        icon: 'warning'
      });
      return false;
    }
    console.log(this.resetState);
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
      try {
        this.apiService.VerifyingOTP({email: this.emailReset, token: this.data, otp: this.otp}).pipe(
          catchError(err => of([err]))
        ).subscribe((res:any) => {
          if(res.success){
            console.log("OTP done!", res.success);
            this.setNewPass = true;
          } else {
            Swal.fire({
              text: 'Incorrect otp, please try again',
              icon: 'error'
            });
            return false;
          }
        })
      } catch (e) {
        console.log(e);
      }
    } else if(this.otp == '') {
      Swal.fire({
        text: 'Please enter otp',
        icon: 'warning'
      });
      return false;
    }
  }
  setNew(){
    if(this.newPass !== "" && this.cnfPass !== "" && this.newPass == this.cnfPass){
      this.apiService.setNewPassword({email: this.emailReset, newPass: this.newPass, cnfPass: this.cnfPass}).subscribe((res:any) => {
        console.log("Password changes");
        this.router.navigateByUrl("/login")
      })
    } else if (!this.ALPHA_NUMERIC_REGEX.test(this.cnfPass) || !this.ALPHA_NUMERIC_REGEX.test(this.cnfPass) || this.cnfPass.length < 7 || this.newPass.length < 7) {
      Swal.fire({
        text: 'Password must be contain atleast 7 characters and atleast one letter and one number',
        icon: 'warning'
      });
      return false;
    } else if (this.newPass !== this.cnfPass) {
      Swal.fire({
        text: 'The password confirmation does not match, please again',
        icon: 'error'
      });
      return false;
    }
  }
  public timer(minute: any) {
    // let minute = 1;
    if(this.resetState){

    }


    let seconds: number = minute * 60;
    let textSec: any = '0';
    let statSec: number = 60;

    const prefix = minute < 10 ? '0' : '';

    const timer = setInterval(() => {
      seconds--;
      if (statSec != 0) statSec--;
      else statSec = 59;

      if (statSec < 10) {
        textSec = '0' + statSec;
      } else textSec = statSec;

      this.display = `${prefix}${Math.floor(seconds / 60)}:${textSec}`;
      // console.log(this.display);
      // console.log(`${prefix}${Math.floor(seconds / 60)}`);

      if(`${prefix}${Math.floor(seconds / 60)}` == `00` && textSec == `00`){
        console.log("worked");
        this.timePassed = false;
      }

      // if(textSec == 0){

      // }

      if (seconds == 0) {
        this.timePassed = true;
        console.log('finished', this.timePassed);
        clearInterval(timer);
      }
    }, 1000);
  }
  constructor(private apiService: UserService, public router : Router){}
  ngOnInit(): void {

    // console.log(this.resetState);
  }
}
