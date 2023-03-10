import { Component } from '@angular/core';
import {FormControl, FormGroup, NgForm, ValidationErrors, Validators} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';
import { AppService } from 'src/app/services/app.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

const ALPHA_NUMERIC_REGEX = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=\S+$).{7,20}$/;
const ALPHA_NUMERIC_VALIDATION_ERROR = { alphaNumericError: 'only alpha numeric values are allowed' }


@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})

export class RegisterFormComponent {
  public registerForm: FormGroup;
  newUser:any;
  isAuthLoading: boolean;
  constructor(
  
    private toastr: ToastrService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private appService: AppService
  ) {}

  ngOnInit() {
    function alphaNumericValidator(control: FormControl): ValidationErrors | null {
      return ALPHA_NUMERIC_REGEX.test(control.value) ? null : ALPHA_NUMERIC_VALIDATION_ERROR;
    }
   // this.renderer.addClass(document.querySelector('app-root'), 'register-page');
    this.registerForm = new FormGroup({
      first_name: new FormControl(null, Validators.required),
      last_name: new FormControl(null, Validators.required),
      email: new FormControl(null,  [Validators.pattern('^([a-zA-Z0-9\.-]+)@([a-zA-Z0-9-]+).[a-zA-Z]{2,4}$')]),
      password: new FormControl(null, [Validators.required, Validators.minLength(7),Validators.maxLength(10), alphaNumericValidator]),
     
    });
  }
   register(){
    console.log(this.registerForm.value)
    if (
      this.registerForm.value.first_name == undefined ||
      this.registerForm.value.first_name.trim() == ''
    ) {
      Swal.fire({
        text: 'Please enter first name',
        icon: 'warning'
      });
      return false;
      // this.toastr.error('Please enter plan name');
      // return false;
    }
    if (
      this.registerForm.value.last_name == undefined ||
      this.registerForm.value.last_name.trim() == ''
    ) {
      Swal.fire({
        text: 'Please enter last name',
        icon: 'warning'
      });
      return false;
      // this.toastr.error('Please enter plan name');
      // return false;
    }
    if (
      this.registerForm.value.email == undefined ||
      this.registerForm.value.email.trim() == ''
    ) {
      Swal.fire({
        text: 'Please enter email',
        icon: 'warning'
      });
      return false;
      // this.toastr.error('Please enter plan name');
      // return false;
    }
    if (
      this.registerForm.value.password == undefined ||
      this.registerForm.value.password.trim() == ''
    ) {
      Swal.fire({
        text: 'Please enter password',
        icon: 'warning'
      });
      return false;
      // this.toastr.error('Please enter plan name');
      // return false;
    }
    if (!ALPHA_NUMERIC_REGEX.test(this.registerForm.value.password)|| this.registerForm.value.password.length < 7) {
      Swal.fire({
        text: 'Password must be contains atleats 7 characters and atleast one letter and one number',
        icon: 'warning'
      });
      return false;
    }
   // this.newUser= this.registerForm.value;
    console.log()
    this.userService.addUser(this.registerForm.value).subscribe((res: any) => {
      if (res.success) {
        //this.toastr.success(res.message);
        Swal.fire({
          text: res.message,
          icon: 'success',
        });
        let loginData = {
          email: this.registerForm.value.email,
          password: this.registerForm.value.password
        };

       this.userService.onLogin(JSON.stringify(loginData)).subscribe((result: any) => {
          console.log(result);
          if (result.success) {
            this.isAuthLoading = false;
           
            //this.toastr.success(result.message);
          this.appService.login(result);
          this.router.navigateByUrl('pricing');
          }})
     //   this.appService.login(result);
       /*localStorage.setItem('userInfo', JSON.stringify(this.registerForm.value['userInfo']));
        localStorage.setItem('id', getLoginDetail.userInfo.id);
        localStorage.setItem('email', getLoginDetail.userInfo.email);
        localStorage.setItem('role', getLoginDetail.userInfo.role);
        localStorage.setItem('objId', getLoginDetail.userInfo.objId);
        localStorage.setItem('isSub', getLoginDetail.userInfo.subscribed);*/
        
      }
       else {
        Swal.fire({
          text: res.message,
          icon: 'error',
        });
        //this.toastr.error(res.message);
      }
  })
}

  handleForm(data:NgForm){
    console.log(data);
  }
  countryList = "-Select-";
}
