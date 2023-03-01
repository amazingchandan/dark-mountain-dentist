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

   allData:any;
  constructor( private router: Router,
    private userService: UserService,){

  }
  ngOnInit(){
    this.planList();
  }
  planList() {

    this.userService.getSubscriptionList().subscribe((res: any) => {
      console.log(res, "response")
      if(res.success){
        console.log("plan fetched successfully")
        this.allData=res.getData
      }
      else{
        console.log("plan not fetched successfully")
      
      }
    })

  }

   addMonths(date, months) {
    date.setMonth(date.getMonth() + months);
  
    return date;
  }
  getSubscription(id ,type){
 console.log(id,type)
     if(type=="Monthly"){
      console.log("dateee")
     // const date = Date.now().toLocaleDateString('en-ZA')

      //const newDate = this.addMonths(date, 1);
      
      // September 17, 2022
      //console.log(date,"Date");
     }
    Swal.fire({
      text: "You have successfully subscribed",
      icon: 'success',
    });
    this.router.navigateByUrl("/dashboard")
  }

}
