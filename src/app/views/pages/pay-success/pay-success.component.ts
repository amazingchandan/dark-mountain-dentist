import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/services/app.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
import { Title } from '@angular/platform-browser';
import { NgxSpinnerService } from "ngx-bootstrap-spinner";


@Component({
  selector: 'app-pay-success',
  templateUrl: './pay-success.component.html',
  styleUrls: ['./pay-success.component.scss']
})
export class PaySuccessComponent implements OnInit {
  public id: any = localStorage.getItem('i') || '';
  public token: any = localStorage.getItem('token');
  public btnStatus: boolean = false;
  title = 'Dark Mountain - Success';
  public apiHost: any = 'http://localhost:4200/failure';
  statusSubs: any;
  constructor(private userService: UserService, private appService: AppService, private router: Router, private titleService: Title, private spinner: NgxSpinnerService,) {
    titleService.setTitle(this.title);
  }
  ngOnInit(): void {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 3000)
    this.onLogin();
  }
  onLogin() {
    this.userService.getUserRecordById(this.id).subscribe((res: any) => {
      console.log(res, "*****");
      if (res.success == false) {
        // alert("Please Login")
        Swal.fire({
          text: "Please login",
          icon: 'warning',
        });
      }
      if (res.getData[0]?.role == 'dentist') {
        let status = res.getData[0]?.subscription_details.status;
        this.statusSubs = res.getData[0]?.subscription_details.status;
        console.log(status)
        let userInfo = {
          id: this.id,
          role: res.getData[0]?.role,
          subscribed: res.getData[0]?.subscription_details.status,
          token: this.token
        }
        this.spinner.hide();
        localStorage.setItem('userInfo', JSON.stringify(userInfo))
        this.btnStatus = true;
        setTimeout(() => {
          this.router.navigateByUrl('/dashboard');
        }, 3000)
        if (status == true || new Date(res.getData[0].subscription_details.end_date).getTime() > Date.now()) {
          // this.appService.login(result);
        }
        else {
          // localStorage.setItem('userInfo', JSON.stringify(result['userInfo']));
          // localStorage.setItem('id', result.userInfo.id);

          // localStorage.setItem('token', result.userInfo.token);

          // this.router.navigateByUrl("/pricing/" + result.userInfo.id);

          // [routerLink]="'/dentist-profile/'+user._id"
        }

      }
      else {
        // this.appService.login(result);
      }
    })
  }
  handleClick() {
    this.router.navigateByUrl('/dashboard');
  }
}
