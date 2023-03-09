import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss']
})


export class PricingComponent {
 // userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
  allData: any;
  userData: any;
  userPlanData: any;
  userInfo:any;
  constructor(private router: Router,
    private userService: UserService,) {

      this.userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
  }
  ngOnInit() {

    
    this.planList();
    console.log(this.userInfo.id)
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
      this.userService.getUserRecordById(this.userInfo.id).subscribe((res: any) =>
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
        this.userService.getSubscription(this.userPlanData, this.userInfo.id).subscribe((res: any) => {
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


  


