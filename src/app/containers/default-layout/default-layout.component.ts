import { Component, Input } from '@angular/core';
import { AppService } from 'src/app/services/app.service';
import Swal from 'sweetalert2';
import { ActivatedRoute ,Router} from '@angular/router';

import { navItems ,navItemsUser } from './_nav';


@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
})

export class DefaultLayoutComponent {
 userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
  public isVisible: boolean = true
  public userDetail= this.userInfo;
  public navItems = navItems;
  public navItemsUser = navItemsUser;
  public role :string;
  public URL: string;
  public changeUrl: boolean = false;

  public perfectScrollbarConfig = {
    suppressScrollX: true,
  };

  constructor( private appService:AppService, private router: Router, private route: ActivatedRoute) {
    this.URL = this.router.url.split('/')[0]
  }
  ngOnInit(){
    this.appService.currentUrl.subscribe((url: boolean) => {
      this.changeUrl = url
    })
    console.log(this.userDetail, this.changeUrl, "URL")
    let jwt = this.userDetail.token
    console.log(this.router.url.split('/')[0])
let jwtData = jwt.split('.')[1]
let decodedJwtJsonData = window.atob(jwtData)
let decodedJwtData = JSON.parse(decodedJwtJsonData);

this.role=decodedJwtData.role;
  }

 receiveMessage(event: boolean) {
  this.isVisible = event;
  // console.log(this.isVisible);
}
dashboardFn(e: any){
  // this.router.navigateByUrl("/dashboard")
  console.log(this.router.url, this.changeUrl)
  if(this.changeUrl){
    Swal.fire({
      title: 'Are you sure?',
      text: "Your progress will be lost!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirm',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          title: 'Success!',
          text: 'You Have Discarded The Image Successfully',
          icon: 'success',
        });
        if(e == 'dashboard'){
          this.appService.updateGetUrl(false)
          this.router.navigateByUrl('/dashboard');
        } else if (e == 'upload-xray/0') {
          this.appService.updateGetUrl(false)
          this.router.navigateByUrl('/upload-xray/0');
        } else if (e == 'logout') {
          this.appService.updateGetUrl(false)
          this.appService.logout()
        }

        // this.userService.deleteXrayByID(id, {name: name}).subscribe((res: any) => {
        //   console.log(res)
        //   if(res.success){
        //     this.router.navigateByUrl('/upload-xray/0');
        //   } else {
        //     Swal.fire({
        //       text: "Internal server error, image can't be deleted.",
        //       icon: 'error',
        //     });
        //   }
        // })
      }
    });
  }
}
  logout(){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be Logout!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, logout!',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          title: 'Success!',
          text: 'You Have Been Successfully Logged-out',
          icon: 'success',
        });
        this.appService.logout();
      }
    });
  }
}
