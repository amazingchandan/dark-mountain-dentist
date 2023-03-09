import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UserService } from 'src/app/services/user.service';
import { AppService } from 'src/app/services/app.service';

const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss']
})


export class PricingComponent {

  allData: any;
  userData: any;
  userPlanData: any;
  constructor(private router: Router,
    private userService: UserService,
    private appService:AppService) {

  }
  ngOnInit() {
    this.planList();
    console.log(userInfo.id)
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
  planList() {

    this.userService.getSubscriptionList().subscribe((res: any) => {
      console.log(res, "response")
      if (res.success) {
        console.log("plan fetched successfully")
        this.allData = res.getData
      }
      else {
        console.log("plan not fetched successfully")

      }
    })

  }

  addMonths(date, months) {
    date.setMonth(date.getMonth() + months);

    return date;
      }
  getSubscription(id, type)

  {
      this.userService.getUserRecordById(userInfo.id).subscribe((res: any) =>
 {
      //console.log(res, "resssssssssssssssssssssssssssssssssssssss")
      this.userData = res.getData;
      console.log(this.userData)
      if (res.success)
   {
        if (this.userData[0].subscription_details.status == true)
        {  Swal.fire({
            text: "You have already subscribed",
            icon: 'error',
          });
        return false;
      }

      else
      {

        var end_date;
        var now = new Date();
        console.log(id, type)
        if (type == "Monthly") {


          end_date = new Date(now.setMonth(now.getMonth() + 1));
          //end_date = new Date(now.setMinutes(now.getMinutes() + 5));
          console.log(end_date, "Date", new Date());

         }
        else if (type === "Yearly") {


          end_date = new Date(now.setMonth(now.getMonth() + 12));

          console.log(end_date, "Date", new Date());

          }
        this.userPlanData = {
          sub_id: id,
          end_date: end_date,
          start_date: Date.now(),
        }
        this.userService.getSubscription(this.userPlanData, userInfo.id).subscribe((res: any) => {
          console.log(res)
          if (res.success) {
            //this.toastr.success(res.message);
            Swal.fire({
              text: "You have successfully subscribed",
              icon: 'success',
            });
            this.router.navigateByUrl("/dashboard")
           }
          else {
            Swal.fire({
              text: res.message,
              icon: 'error',
            });
            //this.toastr.error(res.message);
          }
        });

      }
    }
    })

  }

}





