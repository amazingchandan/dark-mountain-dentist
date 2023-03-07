import { Component } from '@angular/core';
import {FormControl, FormGroup, NgForm, ValidationErrors, Validators} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

const ALPHA_NUMERIC_REGEX = /^(?:[0-9]+[a-z]|[a-z]+[0-9])[a-z0-9]*$/;
const ALPHA_NUMERIC_VALIDATION_ERROR = { alphaNumericError: 'only alpha numeric values are allowed' }


@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})

export class RegisterFormComponent {
  public registerForm: FormGroup;
  
  constructor(
  
    private toastr: ToastrService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
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
        text: 'Please enter First name',
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
        text: 'Please enter Last name',
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

    this.userService.addUser(this.registerForm.value).subscribe((res: any) => {
      if (res.success) {
        //this.toastr.success(res.message);
        Swal.fire({
          text: res.message,
          icon: 'success',
        });
        this.router.navigateByUrl('pricing');
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
