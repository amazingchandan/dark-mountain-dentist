import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AppService } from 'src/app/services/app.service';
import { ClassToggleService, HeaderComponent } from '@coreui/angular';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
})
export class DefaultHeaderComponent extends HeaderComponent {

  @Input() sidebarId: string = "sidebar";
  @Output() toggleMenuSidebar: EventEmitter<any> = new EventEmitter<any>();
  toggle: boolean = true;
  public newMessages = new Array(4)
  public newTasks = new Array(5)
  public newNotifications = new Array(5)
  userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
  lName: any;
  fName: any;
  routerTo: any;

  constructor(private classToggler: ClassToggleService,
   private router:Router,
    private appService:AppService,
    private userService :UserService) {
    super();

  }
  ngOnInit(): void {
    this.userfirst();
    //this.admin()
  }

  userfirst() {
    this.userInfo;
    console.log(this.userInfo);
    console.log(this.userInfo)
    let id= this.userInfo.id;
    this.userService.getUserRecordById(id).subscribe((res: any) =>{
      console.log(res,"++++++")
      if(res.success){
  this.fName= res.getData[0]?.first_name;
  this.lName = res.getData[0]?.last_name;
      }
    })
    console.log(this.fName)
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
  myProfile(){
   //this.router.navigateByUrl(`dentist-profile/`+this.userInfo.id)
   this.router.navigateByUrl('/dentist-profile/'+this.userInfo.id);
  // this.router.navigate([ '/dentist-profile' ], { queryParams: {dentist_id:this.userInfo.id } })
  }

  toggleSidebar(): boolean {
    return this.toggle = !this.toggle;
  }
}
