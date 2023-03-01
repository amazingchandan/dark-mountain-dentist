import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UserService } from 'src/app/services/user.service';
const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss']
})


export class PricingComponent {

  allData: any;
  userData:any;
  constructor(private router: Router,
    private userService: UserService,) {

  }
  ngOnInit() {
    this.planList();
     console.log(userInfo.id)
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
  getSubscription(id, type) {
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
    this.userData={
      sub_id:id,
      end_date:end_date,
      start_date:Date.now(),
    }
    this.userService.getSubscription( this.userData,userInfo.id ).subscribe((res: any) => {
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
