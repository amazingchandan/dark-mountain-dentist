import { HttpClient } from '@angular/common/http';
import { Component ,OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import {
  IPayPalConfig,
  
  ICreateOrderRequest,
  IPayPalButtonStyle
} from 'ngx-paypal';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-renew-sub',
  templateUrl: './renew-sub.component.html',
  styleUrls: ['./renew-sub.component.scss']
})
export class RenewSubComponent implements OnInit {
  public monthlyAllData: any = [];
  public yearlyAllData: any = [];
  public monthlyPlan: any = false;
  public yearlyPlan: any = false;
 allData=[]
  subsId: any=0;
  subsType: any="";
  subsTitle: any = "";
  subsPrice: any= "";
  ipAddress: any;
  country: any;
  IsmodelShow: boolean=false;
  public payPalConfig ? : IPayPalConfig;
  userId: string;
  userData: any;
  curPlanDetail: any;
  preEnd_date: any;
  preStart_date: any;
  showSuccess: any;
  showCancel: any;
  showError: any;
  selected: boolean = false;

  constructor(private router: Router,
    private userService: UserService,
    private http:HttpClient,
    private route: ActivatedRoute,){}
  
    ngOnInit(): void {

    this.userId = this.route.snapshot.paramMap.get('dentist_id');
 
 this.getIPAddress();
 
 this.myPlanDetail();
 setTimeout(()=>{
  this.planList();
},1000)
 
 this.initConfig();
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
  myPlanDetail(){
    this.userService.getUserPlanById(this.userId).subscribe((res:any)=>
    {
      console.log("myPlan")
      if(res.success){
        console.log("myPlan1",res.getData)
       this.curPlanDetail=res.getData;
    //    this.subsType= this.curPlanDetail?.subscription_details.subscription_id.type
    // this.subsPrice = this.curPlanDetail?.subscription_details.subscription_id.amount;
    // this.subsId= this.curPlanDetail?.subscription_details.subscription_id._id;
    this.preStart_date=this.curPlanDetail?.subscription_details.start_date;
    this.preEnd_date=this.curPlanDetail?.subscription_details.end_date;
     

   console.log("***",this.preEnd_date)
       console.log("planDetail",res)
      }
      else{
        console.log(res,"error")
      }
    })
  }
  getIPAddress()
  {
    this.http.get("https://ipgeolocation.abstractapi.com/v1/?api_key=57a0cd43f17f4cf1a1dfa5e126095364").subscribe((res:any)=>{
      const data = res;
      this.ipAddress= data.IPv4
      this.country =data.country;
      console.log(this.country,"ipAddress",data)
    });
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
  getSubscription(id, type,pricing_amount, title) {
    console.log(id, type, pricing_amount);
    this.subsId = id;
    this.subsType = type;
    this.subsPrice = pricing_amount;
    this.subsTitle = title;
    this.selected= true
  }
  private initConfig(): void {
    //(<HTMLImageElement>document.querySelector(".paypal-logo")).src="";
    // var modal= document.getElementById("launch_ad");
    // modal.style.display = "none";
    
    this.payPalConfig = {
        currency: 'USD',
        clientId: 'sb',
        // ! for orders on client side
  
        createOrderOnClient: (data) => < ICreateOrderRequest > {

            intent: 'CAPTURE',
            purchase_units: [{
              amount: {
                  currency_code: 'USD',
                  value: `${this.subsPrice}`,
                  breakdown: {
                      item_total: {
                          currency_code: 'USD',
                          value: `${this.subsPrice}`
                      }
                  }
              },
              items: [{
                  name: 'Dark Mountain',
                  quantity: '1',
                  category: 'DIGITAL_GOODS',
                  unit_amount: {
                      currency_code: 'USD',
                      value: `${this.subsPrice}`,
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
              console.log('onApprove - you can get full order details inside onApprove: ', details),
             

    //my code
    this.userService.getUserRecordById(this.userId).subscribe((res: any) => {
         console.log(res, "resssssssssssssssssssssssssssssssssssssss")
         this.userData = res.getData;
         console.log(this.userData)

         if (res.success) {
          

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
             const userPlanData = {
                       sub_id: this.subsId,
                       type:this.subsType,
                       pre_start_date:this.preStart_date,
                       pre_end_date:this.preEnd_date
                     }
            
                     this.userService.getSubscriptionRenew(userPlanData, this.userId).subscribe((res: any) => {
                       console.log(res)

                       if (res.success) {
                         //this.toastr.success(res.message);
                         this.IsmodelShow = false
                         console.log(this.IsmodelShow);
                         ($("#myModal")as any).modal("hide");
                        //  this.handleClick();
                        // <HTMLElement>document.getElementById('myModal').modal("hide")

                         Swal.fire({
                           text: "You subscription has renewed",
                           icon: 'success',
                         });
                        /*var modal= document.getElementById("launch_ad");
                         modal.style.display = "none";*/
                        
                       
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
    document.getElementById("launch_ad")?.click();
    console.log("THIS IS RESET FOR PAYPAL");
    console.log(this.subsPrice.toString(), this.subsType);
  }


  logout(){

  }
  checkoutBtn(){
    this.IsmodelShow = true;
  }
  errmsg(){
    Swal.fire({
      text: "Please select a plan",
      icon: 'warning',
    });
  }
}
