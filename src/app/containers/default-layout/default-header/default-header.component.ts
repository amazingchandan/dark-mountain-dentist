import { Component, EventEmitter, Input, Output, Pipe } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AppService } from 'src/app/services/app.service';
import { ClassToggleService, HeaderComponent } from '@coreui/angular';
import Swal from 'sweetalert2';
import { NavigationEnd, Router } from '@angular/router';
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
  public _router: any = "";
  public changeUrl: boolean = false;

  constructor(private classToggler: ClassToggleService,
   private router:Router,
    private appService:AppService,
    private userService :UserService) {
    super();
    this._router = this.router.url
  }
  ngOnInit(): void {
    this.userfirst();
    this.appService.currentUrl.subscribe((url: boolean) => {
      this.changeUrl = url
    })
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
  dashboardFn(e: any){
    // this.router.navigateByUrl("/dashboard")
    console.log(this.router.url, this.changeUrl)
    if(this.changeUrl){
      Swal.fire({
        title: 'Are you sure?',
        text: "Your progress will be lost!",
        //icon: 'warning',
        imageUrl: '../../../../assets/images/warning.png',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Confirm <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M12 3c-4.625 0-8.442 3.507-8.941 8.001H10v-3l5 4-5 4v-3H3.06C3.56 17.494 7.376 21 12 21c4.963 0 9-4.037 9-9s-4.037-9-9-9z"></path></svg>',
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            title: 'Success!',
            text: 'You Have Discarded The Image Successfully',
            //icon: 'success',
            imageUrl: '../../../../assets/images/success.png',
          });
          if(e == true){
            console.log(this.userInfo.id, 'dentist-profile')
            this.appService.updateGetUrl(false)
            this.router.navigateByUrl(`/dentist-profile/${this.userInfo.id}`);
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
  Logout(){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be Logout!",
      //icon: 'warning',
      imageUrl: '../../../../assets/images/warning.png',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, logout! <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M12 3c-4.625 0-8.442 3.507-8.941 8.001H10v-3l5 4-5 4v-3H3.06C3.56 17.494 7.376 21 12 21c4.963 0 9-4.037 9-9s-4.037-9-9-9z"></path></svg>',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          title: 'Success!',
          text: 'You Have Been Successfully Logged-out',
          //icon: 'success',
          imageUrl: '../../../../assets/images/success.png',
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
