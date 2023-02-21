import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import {UserService} from "../../../services/user.service";
import {AppService} from "../../../services/app.service";
import { FormGroup ,FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  public loginForm: FormGroup;
  public isAuthLoading = false;
  constructor(
    private renderer: Renderer2,
    private toastr: ToastrService,
    private appService: AppService,
    private apiService: UserService
  ) {}

  ngOnInit() {
    this.renderer.addClass(document.querySelector('app-root'), 'login-page');
    this.loginForm = new FormGroup({
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
    });
  }

  async login() {
    if (this.loginForm.valid) {
      const testBy = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      let isValid = testBy.test(this.loginForm.get("email").value.toLowerCase());
      if(!isValid) {
        this.toastr.error('Invalid Email Address');
        return false;
      }
      this.isAuthLoading = true;
      let loginData = {
        email: this.loginForm.get("email").value,
        password: this.loginForm.get("password").value
      };
      await this.apiService.onLogin(JSON.stringify(loginData)).subscribe((result: any) => {
        console.log(result);
        if (result.success) {
          this.isAuthLoading = false;
           Swal.fire({
              text: result.message,
              icon: 'success',
            });
          //this.toastr.success(result.message);
          this.appService.login(result);
        } else {
          this.isAuthLoading = false;
          //this.toastr.error(result.message);
          Swal.fire({
              text: result.message,
              icon: 'error',
            });
        }
      });
    } else {
       Swal.fire({
              text: 'Please enter email/password',
              icon: 'error',
            });
      //this.toastr.error('Please enter email/password');

    }
  }

  ngOnDestroy() {
    this.renderer.removeClass(document.querySelector('app-root'), 'login-page');
  }

}
