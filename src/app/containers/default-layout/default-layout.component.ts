import { Component, Input } from '@angular/core';
import { AppService } from 'src/app/services/app.service';
import Swal from 'sweetalert2';

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

  public perfectScrollbarConfig = {
    suppressScrollX: true,
  };

  constructor( private appService:AppService) {}
  ngOnInit(){
    console.log(this.userDetail)
  }

 receiveMessage(event: boolean) {
  this.isVisible = event;
  // console.log(this.isVisible);
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
