import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AppService } from 'src/app/services/app.service';
import { ClassToggleService, HeaderComponent } from '@coreui/angular';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
})
export class DefaultHeaderComponent extends HeaderComponent {

  @Input() sidebarId: string = "sidebar";
  @Output() toggleMenuSidebar: EventEmitter<any> = new EventEmitter<any>();
  public newMessages = new Array(4)
  public newTasks = new Array(5)
  public newNotifications = new Array(5)
  userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
  constructor(private classToggler: ClassToggleService,
    private appService:AppService) {
    super();
    
  }
  ngOnInit(): void {
    this.userfirst();
    //this.admin()
  }

  userfirst() {
    this.userInfo;
    console.log(this.userInfo);
  }
  Logout(){
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
