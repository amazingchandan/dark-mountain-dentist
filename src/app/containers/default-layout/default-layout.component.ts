import { Component, Input } from '@angular/core';

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

  constructor() {}
 ngOnInit(){
  console.log(this.userDetail)
  // console.log(navItems[4]);

 }

 receiveMessage(event: boolean) {
  this.isVisible = event;
  // console.log(this.isVisible);
}
}
