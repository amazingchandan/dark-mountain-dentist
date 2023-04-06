import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { UserService } from 'src/app/services/user.service';
import { AppService } from 'src/app/services/app.service';
import { NgxSpinnerService } from 'ngx-bootstrap-spinner';
import { DatePipe, Location } from '@angular/common';
import {
  IPayPalConfig,
  ICreateOrderRequest,
  IPayPalButtonStyle
} from 'ngx-paypal';
declare var Razorpay: any;
// declare var Paypal: any;
// declare global {
//   interface Window {
//     paypal:any;
//   }
// }

const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss']
})


export class PricingComponent implements OnInit, AfterViewInit {
  // userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
  public isAuthLoading = false;
  public allData: any = [];
  userData: any;
  userPlanData: any;
  userInfo: any;
  userId: any;
  fname: any;
  lname: any;
  checked: any;
  public monthlyAllData: any = [];
  public yearlyAllData: any = [];
  public monthlyPlan: any = false;
  public yearlyPlan: any = false;
  showSuccess: any;
  showCancel: any;
  showError: any;
  public payPalConfig ? : IPayPalConfig;
  public subsId: any = 0;
  public subsType: any;
  public subsPrice: any;
  public subsTitle: any;
  public paypalView: any = false;
  public payData: any;
  //route: any;
  public customOptions: OwlOptions = {
    center: true,
    // items: 3,
    margin: 15,
    // animateOut: 'fadeOut',
    loop: true,
    // autoWidth: true,
    // autoHeight: true,
    autoplay: false,
    autoplayTimeout: 1000,
    autoplaySpeed: 6000,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 1500,
    navText: ['<i class="fa fa-angle-left left-arrow" aria-hidden="true"></i>', '<i class="fa fa-angle-right right-arrow" aria-hidden="true"></i>'],
    responsive: {
      0: {
        items: 1
      },
      600: {
        items: 2
      },
      950: {
        items: 3
      },
      2400: {
        items: 5
      }
    },
    nav: true,
  }

  private razorPayOptions: any = {
    key: 'rzp_test_llXrMfq95r3LMF', // Enter the test Key ID generated from the Dashboard
    //key: 'rzp_live_bGBd6XL9krEnCa', // Enter the Key live ID generated from the Dashboard
    amount: '',
    currency: 'INR',
    name: 'Dark Mountain',
    description: 'Dark Mountain Subscription payment',
    order_id: 'ORDERID_FROM_BACKEND',
   // image: 'https://digitalpehchan.in/assets/images/DP%20LOGO%20BW.png',
    handler: function (response) {
      console.log('this is the response ', response);
    },
    notes: {
      address: 'Thank you for saving people in need',
    },
    theme: {
      color: '#00d957',
    },
    // http_post: this.userService
  };
  toastr: any;




  constructor(private router: Router,
    private userService: UserService,
    private appService: AppService,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService) {

    this.userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
  }
  // @ViewChild('paypalRef',{static: true}) public paypalRef: ElementRef;
  ngOnInit(): void {
    console.log(this.checked, this.subsId);
    // console.log(window.paypal);

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

    // console.log(this.appService.currentApprovalStageMessage.source['_value'], "------------");
    // this.planList();
    setTimeout(() => {
      console.log(this.allData)
    }, 1000)
    this.userId = this.route.snapshot.paramMap.get('dentist_id');
    this.userService.getUserRecordById(this.userId).subscribe((res: any) => {
      // console.log(res.getData[0].first_name, res.getData[0].last_name);
      this.fname = res.getData[0].first_name;
      this.lname = res.getData[0].last_name;
    })
    this.monthlyPlan= true;
    this.yearlyPlan = false;
    if(this.monthlyPlan){
      setTimeout(() => {
        this.monthlyAllData = this.allData.filter(elem => elem.type === "Monthly");
      }, 1000)
    }
    this.initConfig();
  }
  ngAfterViewInit(): void {
    // if(this.checked && this.subsId != 0){
    //   console.log(this.paypalRef.nativeElement);

    //   window.paypal.Buttons(
    //     {
    //       style: {
    //         layout: "vertical"
    //       }
    //     }
    //   ).render(this.paypalRef.nativeElement)
    // }
  }
  private initConfig(): void {

    this.payPalConfig = {
        currency: 'USD',
        clientId: 'sb',
        // ! for orders on client side
        createOrderOnClient: (data) => < ICreateOrderRequest > {

            intent: 'CAPTURE',
            purchase_units: [{
              amount: {
                  currency_code: 'USD',
                  value: '9.99',
                  breakdown: {
                      item_total: {
                          currency_code: 'USD',
                          value: '9.99'
                      }
                  }
              },
              items: [{
                  name: 'Enterprise Subscription',
                  quantity: '1',
                  category: 'DIGITAL_GOODS',
                  unit_amount: {
                      currency_code: 'USD',
                      value: '9.99',
                  },
              }]
            }]
        },
        advanced: {
            commit: 'true',
        },
        style: {
          layout: 'horizontal',
          tagline: false,
          shape: 'pill',
          color: 'white',
        },
        onApprove: (data, actions) => {
          console.log('onApprove - transaction was approved, but not authorized', data, actions);
          actions.order.get().then(details => {
              console.log('onApprove - you can get full order details inside onApprove: ', details);


    //my code
    this.userService.getUserRecordById(this.userId).subscribe((res: any) => {
         console.log(res, "resssssssssssssssssssssssssssssssssssssss")
         this.userData = res.getData;
         console.log(this.userData, this.userInfo,this.userInfo.token)

         if (res.success) {
           if (this.userData[0].subscription_details.status == true) {
             Swal.fire({
               text: "You have already subscribed",
               icon: 'error',
             });
             return false;
           }

           else {

             var end_date;
             var now = new Date();
             console.log( this.subsType)
             if (this.subsType == "Monthly") {


               end_date = new Date(now.setMonth(now.getMonth() + 1));
               end_date = new Date(now.setMinutes(now.getMinutes() + 5));
               console.log(end_date, "Date", new Date());

             }
             else if (this.subsType === "Yearly") {


               end_date = new Date(now.setMonth(now.getMonth() + 12));

               console.log(end_date, "Date", new Date());

             }
           }
          }
             this.userPlanData = {
                       sub_id: this.subsId,
                       end_date: end_date,
                       start_date: Date.now(),
                     }
                     this.userService.getSubscription(this.userPlanData, this.userId).subscribe((res: any) => {
                       console.log(res)
                       if (res.success) {
                         //this.toastr.success(res.message);
                         Swal.fire({
                           text: "You have successfully subscribed",
                           icon: 'success',
                         });
                         if(this.userInfo.token!=null&& this.userInfo.token!=undefined&& this.userInfo.token!='' )
                         {console.log("iff")
                           this.router.navigateByUrl("/dashboard")
                       }
                       else{
                         console.log("elseee")
                         this.router.navigateByUrl("/login")
                       }
                        }
                        })

                      })
          });
        },
        // ! for orders on server side
        // createOrderOnServer: (data) => fetch('/my-server/create-paypal-transaction')
        //         .then((res) => res.json())
        //         .then((order) => order.orderID),
        //     onApprove: (data, actions) => {
        //         console.log('onApprove - transaction was approved, but not authorized', data, actions);
        //         actions.order.get().then(details => {
        //             console.log('onApprove - you can get full order details inside onApprove: ', details);
        //         });

        // },
        onClientAuthorization: (data) => {
            console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
            this.showSuccess = true;
        },
        onCancel: (data, actions) => {
            console.log('OnCancel', data, actions);
            // this.checked = false;
            this.showCancel = true;
        },
        onError: err => {
            console.log('OnError', err);
            this.showError = true;
        },
        onClick: (data, actions) => {
            console.log('onClick', data, actions);
            this.resetStatus();
        }
    };
  }
  resetStatus(){
    console.log("THIS IS RESET FOR PAYPAL");
    console.log(this.subsPrice.toString(), this.subsTitle, this.subsType);
  }
  handleClose(){
    // this.checked = false;
  }
  checking(event){
    this.checked = event.target.checked
    console.log(event.target.checked, this.checked);
  }
  Logout() {
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

  monthly(){
    this.monthlyAllData = this.allData.filter(elem => elem.type === "Monthly")
    this.yearlyAllData = []
    this.monthlyPlan= true;
    this.yearlyPlan = false;
    console.log(this.allData, this.yearlyAllData, this.monthlyAllData, this.subsId);
  }

  yearly(){
    this.yearlyAllData = this.allData.filter(elem => elem.type === "Yearly")
    this.monthlyAllData = [];
    this.monthlyPlan= false;
    this.yearlyPlan = true;
    console.log(this.allData, this.yearlyAllData, this.monthlyAllData, this.monthlyPlan, this.subsId);
  }

  addMonths(date, months) {
    date.setMonth(date.getMonth() + months);

    return date;
  }

  getSubscription(id, type,pricing_amount, title) {
    console.log(id, type, pricing_amount);
    this.subsId = id;
    this.subsType = type;
    this.subsPrice = pricing_amount;
    this.subsTitle = title;
    // if(!this.checked){
    //   return Swal.fire({
    //     text: "Please accept the terms and conditions.",
    //     icon: 'error',
    //   });
    // }
    // this.userService.getUserRecordById(this.userId).subscribe((res: any) => {
    //   //console.log(res, "resssssssssssssssssssssssssssssssssssssss")
    //   this.userData = res.getData;
    //   console.log(this.userData, this.userInfo,this.userInfo.token)

    //   if (res.success) {
    //     if (this.userData[0].subscription_details.status == true) {
    //       Swal.fire({
    //         text: "You have already subscribed",
    //         icon: 'error',
    //       });
    //       return false;
    //     }

    //     else {

    //       var end_date;
    //       var now = new Date();
    //       console.log(id, type)
    //       if (type == "Monthly") {


    //         end_date = new Date(now.setMonth(now.getMonth() + 1));
    //         //end_date = new Date(now.setMinutes(now.getMinutes() + 5));
    //         console.log(end_date, "Date", new Date());

    //       }
    //       else if (type === "Yearly") {


    //         end_date = new Date(now.setMonth(now.getMonth() + 12));

    //         console.log(end_date, "Date", new Date());

    //       }

    //      //razorpay code

    //      const subscriptiondetails = {
    //       amount: pricing_amount * 100,
    //       user_id: this.userId,
    //       receipt: 'Receipt #' + (Math.floor(Math.random() * 10000000) + 1),
    //     };
    //     console.log(subscriptiondetails);
    //     this.spinner.show();
    //     this.userService.order(subscriptiondetails).subscribe(
    //       (response: any) => {
    //         this.spinner.hide();
    //         if(response.success){

    //         }else{
    //           Swal.fire({
    //             title: 'Error!',
    //             width: 400,
    //             text: response.message,
    //             icon: 'error',
    //             confirmButtonText: 'Ok',
    //           });
    //           return false;
    //         }
    //         //console.log(response, 'iiiiiiii');
    //         console.error('response for purchase ', response);
    //         let order = response?.order;
    //         this.razorPayOptions.order_id = order?.id;
    //         this.razorPayOptions.amount = order?.amount_due;
    //         const that = this;
    //         this.razorPayOptions.handler = (response: any, error: any) => {
    //           console.error(response);
    //           // console.error(error);
    //           if (!error) {
    //             const allVarificationData = {
    //               sub_id: id,
    //               end_date: end_date,
    //               start_date: Date.now(),
    //               user_id: this.userId,
    //               pricing_plan_id:id,
    //               razorpay_order_id: response.razorpay_order_id,
    //               razorpay_payment_id: response.razorpay_payment_id,
    //               razorpay_signature: response.razorpay_signature,
    //             };
    //             console.log(allVarificationData, 'hiiiiiii');
    //             //return;
    //             let startDate= new DatePipe('en-US').transform(Date.now(), 'dd-MM-yyyy hh:mm a');
    //             let endDate = new DatePipe('en-US').transform(end_date, 'dd-MM-yyyy hh:mm a')
    //             this.spinner.show();
    //             that.userService
    //               .ordercomplete(allVarificationData)
    //               .subscribe((res: any) => {
    //                 if (res.success) {
    //                   this.spinner.hide();
    //                   Swal.fire({
    //                     title: 'Thank You for subscribe',
    //                     width: 400,
    //                     text: 'Thank You for subscription',
    //                     html:'<strong>Your subscription details are :</strong><br><br>'
    //                     +"<strong>Start Date : </strong>"+startDate+ '<br>'
    //                     +'<strong>End Date : </strong>'+endDate+'<br>'
    //                     +'<strong>Order Id : </strong>'+response.razorpay_order_id+'<br>'
    //                     +'<strong>Transaction Id : </strong>'+response.razorpay_payment_id+'<br>',
    //                     icon: 'success',
    //                     confirmButtonText: 'Ok',
    //                   });
    //                   if(this.userInfo.token!=null&& this.userInfo.token!=undefined&& this.userInfo.token!='' )
    //                   {console.log("iff")
    //                     this.router.navigateByUrl("/dashboard")
    //                 }
    //                 else{
    //                   console.log("elseee")
    //                   this.router.navigateByUrl("/login")
    //                 }
    //              }
    //              else
    //               {
    //                   this.spinner.hide();
    //                   Swal.fire({
    //                     title: 'Error!',
    //                     width: 400,
    //                     text: 'Payment unsuccessful, please try again',
    //                     icon: 'error',
    //                     confirmButtonText: 'Ok',
    //                   });
    //                   console.error(res.message);
    //                   // this.router.navigate(['/profile']);
    //                 }
    //               });
    //           }
    //         };
    //         console.error('op', this.razorPayOptions);

    //         let rzp1 = new Razorpay(this.razorPayOptions);
    //         rzp1.open();
    //         console.error('opened');
    //       },
    //       (error) => {
    //         console.error('error', error);
    //       }
    //     );
    //       //razorpay code ends

    //   /*  this.userPlanData = {
    //         sub_id: id,
    //         end_date: end_date,
    //         start_date: Date.now(),
    //       }
    //       this.userService.getSubscription(this.userPlanData, this.userId).subscribe((res: any) => {
    //         console.log(res)
    //         if (res.success) {
    //           //this.toastr.success(res.message);
    //           Swal.fire({
    //             text: "You have successfully subscribed",
    //             icon: 'success',
    //           });
    //           //! changed here
    //          /* this.userService.onLogin(this.appService.currentApprovalStageMessage.source['_value']).subscribe((result: any) => {
    //             console.log(result.userInfo.id);
    //             let id= result.userInfo.id;
    //             if (result.success) {
    //               this.userService.getUserRecordById(id).subscribe((res: any) => {
    //                 console.log(res,"*****");
    //                  if(res.getData[0]?.role=='dentist'){
    //                 let status = res.getData[0]?.subscription_details.status;
    //                  console.log(status)
    //                    if(status==true){
    //                     this.appService.login(result);
    //                    }
    //                    else
    //                    {
    //                     this.router.navigateByUrl("/pricing/"+result.userInfo.id);
    //                    // [routerLink]="'/dentist-profile/'+user._id"
    //                    }

    //               }
    //               else{
    //                 this.appService.login(result);
    //               }

    //               })

    //               //this.toastr.success(result.message);
    //             //
    //             }

    //             else {
    //               this.isAuthLoading = false;
    //               //this.toastr.error(result.message);
    //               Swal.fire({
    //                 text: result.message,
    //                 icon: 'error',
    //               });
    //             }
    //           });*/
    //        /* if(this.userInfo.token!=null&& this.userInfo.token!=undefined&& this.userInfo.token!='' )
    //           {this.router.navigateByUrl("/dashboard")
    //         }
    //         else{
    //           this.router.navigateByUrl("/login")
    //         }
    //       }
    //         else {
    //           Swal.fire({
    //             text: res.message,
    //             icon: 'error',
    //           });
    //           //this.toastr.error(res.message);
    //         }
    //       });*/

    //     }
    //   }
    // })

  }

  handleClick(){
    // if(!this.checked){
    //   this.displayStyle = "none"
    //   return Swal.fire({
    //     text: "Please accept the terms and conditions.",
    //     icon: 'warning',
    //   });
    // }
    // else if(!this.subsId || this.subsId == 0){
    //   this.displayStyle = "none"
    //   return Swal.fire({
    //     text: "Please choose a plan.",
    //     icon: 'warning',
    //   });
    // }
  }
  payView(){
    this.payData = {
      price: this.subsPrice
    }
    this.userService.paypalOrderReq(this.payData).subscribe((res: any) => {
      console.log(res, location);
      location.href = res.link;
      // this.router.navigateByUrl(res.link)
    })
  }

}





