import { Component } from '@angular/core';

import { navItems ,navItemsUser } from './_nav';

const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
})

export class DefaultLayoutComponent {


  public userDetail= userInfo;
  public navItems = navItems;
  public navItemsUser = navItemsUser;

  public perfectScrollbarConfig = {
    suppressScrollX: true,
  };

  constructor() {}
 ngOnInit(){
  console.log(this.userDetail.role)
 }
}
