import { Component, ElementRef, OnInit, ViewChild, AfterViewChecked } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Subject } from 'rxjs';
import { type } from 'jquery';
import { DataTableDirective } from 'angular-datatables';
import { environment } from '../../../../environments/environment';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-subscription-list',
  templateUrl: './subscription-list.component.html',
  styleUrls: ['./subscription-list.component.scss']
})
export class SubscriptionListComponent implements OnInit {
  title = 'ARTI - Subscription List';
  dtOptions: any = {};
  addPriceingForm: FormGroup;
  private pricingId: any;
  status: any;
  plan_name: string;
  minimum: string;
  maximum: string;
  amount: number;
  type: string;
  public prod_id: any = environment.PROD_ID;
  // status: any;
  public showDelete: boolean = false;
  public deleteSubsId: any;
  public planStatus: any;
  public allUser: any;
  public subscribers: Array<any>;

  allData: any;
  private isDtInitialized: boolean = false;
  dtTrigger: Subject<any> = new Subject<any>();
  @ViewChild(DataTableDirective) dtElement: DataTableDirective;

  // @ViewChild(DataTableDirective, {static: false}) dtElement: DataTableDirective;
  @ViewChild('close') close: ElementRef;

  showContent: boolean;
  country: any;
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private titleService: Title,
  ) {
    titleService.setTitle(this.title);
  }

  ngOnInit(): void {
    // setTimeout(() => this.showContent = true, 350);
    this.dtOptions = {
      language: {
        search: "",
        searchPlaceholder: 'Search ',
      },
      buttons: [{
        extend: 'csv',
        text: 'Download CSV'
      }],
      info: true,
      ordering: false,
      responsive: true,
      search: true,
      paging: true,
      pagingType: 'full_numbers',
      pageLength: 10,
      dom: 'Bfrtip',

    };
    this.planList();
    console.log(this.prod_id)
    this.addPriceingForm = new FormGroup({
      plan_name: new FormControl(),
      amount: new FormControl(),
      // maximum: new FormControl(),
      // minimum: new FormControl(),
      type: new FormControl(),
      country: new FormControl(),
      status: new FormControl(),
    });
    this.addPriceingForm = this.formBuilder.group({
      plan_name: ['', [Validators.required]],
      amount: ['', [Validators.required]],
      // maximum: ['', [Validators.required]],
      // minimum: ['', [Validators.required]],
      type: ['', [Validators.required]],
      country: ['', [Validators.required]],
      status: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });
    this.pricingId = this.route.snapshot.paramMap.get('pricing_id');
    if (
      this.pricingId != undefined &&
      this.pricingId != null &&
      this.pricingId != ''
    ) {
      //this.editPricing(this.pricingId);
    } else {
      //this.plandesc();
      // this.addPriceingForm.get('status').setValue('active');

    }
  }
  /*  plandesc() {
      this.userService.getPlanActive().subscribe((res: any) => {
        // console.log(res)
        // this.allData = res.getData;
        res.getData.forEach((ele) => {
          this.planDescription.push({
            plan_description: ele.plan_description,
            plan_status: 'Tick',
          });
        });
        this.allData = this.planDescription;
      });
    }*/
  setPrice() {
    console.log(this.addPriceingForm.value)
    if (
      this.addPriceingForm.value.plan_name == undefined ||
      this.addPriceingForm.value.plan_name.trim() == ''
    ) {
      Swal.fire({
        text: 'Please enter plan name',
        icon: 'warning'
      });
      return false;
      // this.toastr.error('Please enter plan name');
      // return false;
    }

    if (
      this.addPriceingForm.value.amount == undefined ||
      this.addPriceingForm.value.amount == ''
    ) {
      Swal.fire({
        text: 'Please enter pricing amount',
        icon: 'warning'
      });
      return false;
      // this.toastr.error('Please enter priceing amount');
      // return false;
    }
    // if (
    //   this.addPriceingForm.value.minimum == undefined ||
    //   this.addPriceingForm.value.minimum == ''
    // ) {
    //   Swal.fire({
    //     text: 'Please enter minimum',
    //     icon: 'warning'
    //   });
    //   return false;
    //   // this.toastr.error('Please enter subscription days');
    //   // return false;
    // }
    // if (
    //   this.addPriceingForm.value.maximum == undefined ||
    //   this.addPriceingForm.value.maximum == ''
    // ) {
    //   Swal.fire({
    //     text: 'Please enter maximum',
    //     icon: 'warning'
    //   });
    //   return false;
    //   // this.toastr.error('Please enter subscription days');
    //   // return false;
    // }
    if (
      this.addPriceingForm.value.type == undefined ||
      this.addPriceingForm.value.type == ''
    ) {
      Swal.fire({
        text: 'Please select type',
        icon: 'warning'
      });
      return false;
      // this.toastr.error('Please enter subscription days');
      // return false;
    }
    if (
      this.addPriceingForm.value.status == undefined ||
      this.addPriceingForm.value.status == ''
    ) {
      Swal.fire({
        text: 'Please select status',
        icon: 'warning'
      });
      return false;
      // this.toastr.error('Please enter subscription days');
      // return false;
    }
    if (
      this.addPriceingForm.value.country == undefined ||
      this.addPriceingForm.value.country == ''
    ) {
      Swal.fire({
        text: 'Please enter country',
        icon: 'warning'
      });
      return false;
      // this.toastr.error('Please enter subscription days');
      // return false;
    }
    if (
      this.addPriceingForm.value.description == undefined ||
      this.addPriceingForm.value.description == ''
    ) {
      Swal.fire({
        text: 'Please enter description',
        icon: 'warning'
      });
      return false;
      // this.toastr.error('Please enter subscription days');
      // return false;
    }
    if (
      this.pricingId != undefined &&
      this.pricingId != null &&
      this.pricingId != ''
    ) {
      console.log("update mode", this.pricingId)
      this.updatePlan(this.pricingId);
    }
    else {
      // let p_data = {
      //   token: 'A21AAIkrNT4uw6k5IbT5mFWZT0Fefx_kDg767QqDDf9hP-L1hkAiINAtTtAgC6B6yu-KHHMu3_Ovs4pDRtONOYULiY9ggR2Mg',
      //   prod_id: 'PROD-2SV05090KF783042A'
      // }
      // localStorage.setItem('p-data', JSON.stringify(p_data))
      console.log(this.addPriceingForm.value, this.addPriceingForm.value.description.split(','));
      // return;
      let data = {
        "product_id": `${this.prod_id}`,
        "name": this.addPriceingForm.value.plan_name,
        "billing_cycles": [
          {
            "tenure_type": "REGULAR",
            "sequence": 1,
            "total_cycles": 999,
            "frequency": {
              "interval_unit": this.addPriceingForm.value.type == 'Monthly' ? 'MONTH' : 'DAY' // DAY, WEEK, MONTH, YEAR
            },
            "pricing_scheme": {
              "fixed_price": {
                "value": `${this.addPriceingForm.value.amount}`,
                "currency_code": "USD"
              }
            }
          }
        ],
        "payment_preferences": {
          "auto_bill_outstanding": true,
          "setup_fee_failure_action": "CONTINUE",
          "setup_fee": {
            "currency_code": "USD",
            "value": 0
          }
        },
        "taxes": {
          "percentage": "1.5",
          "inclusive": true
        }
      }
      // console.log(data)
      // return;
      let token = JSON.parse(localStorage.getItem('p-data')).token;
      this.userService.paypalCreatePlan(data, token).subscribe((res: any) => {
        console.log(res)
        if (res.id) {
          let planData = { ...this.addPriceingForm.value, paypalID: res.id, description: this.addPriceingForm.value.description.split(',')}
          console.log(planData)
          // return;
          this.userService.addPrice(planData).subscribe((res: any) => {
            console.log(res);
            if (res.success) {
              Swal.fire({
                text: res.message,
                //icon: 'success',
                imageUrl: '../../../../assets/images/success.png',
              });
              document.getElementById('launch_ad')?.click();
              this.isDtInitialized = false;
              this.planList();
            }else{
              Swal.fire({
                text: res.message,
                //icon: 'success',
                imageUrl: '../../../../assets/images/success.png',
              });
            }
          });
        }
      })
    }
  }
  planList() {
        this.userService.getSubscriptionList().subscribe((res: any) => {
          console.log(res, "response")
          this.allData = res.getData1;
          // console.log(this.allData)
          this.showContent = true;
          if (this.isDtInitialized) {
            this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
              dtInstance.destroy();
              //  this.dtTrigger.next(undefined);
            });
          } else {
            this.isDtInitialized = true;
            // this.dtTrigger.next(undefined);
          }
        })

      }

  openModal(id) {
        console.log(id, "plan id")
    if(id!= null && id != undefined && id != ''){
        this.showDelete = true;
        this.deleteSubsId = id;
        for (let i = 0; i < this.allData.length; i++) {
          if (this.allData[i]._id === id) {
            console.log(this.allData[i])
            this.planStatus = this.allData[i].status
            this.pricingId = id;
            this.addPriceingForm.patchValue({
              plan_name: this.allData[i].plan_name.trim(),
            });

            // this.addPriceingForm.patchValue({
            //   minimum: this.allData[i].minimum,
            // });
            // this.addPriceingForm.patchValue({
            //   maximum: this.allData[i].maximum,
            // });
            this.addPriceingForm.patchValue({
              type: this.allData[i].type,
            });
            this.addPriceingForm.patchValue({
              amount: this.allData[i].amount,
            });
            this.addPriceingForm.patchValue({
              country: this.allData[i].country,
            });
            this.addPriceingForm.patchValue({
              status: this.allData[i].status,
            });
            this.addPriceingForm.patchValue({
              description: this.allData[i].description.join(','),
            });
            console.log(this.planStatus)
          }
        }
      }
    else {
        this.showDelete = false;
        console.log("no id")
        this.addPriceingForm.patchValue({
          plan_name: '',
        });

        // this.addPriceingForm.patchValue({
        //   minimum: '',
        // });
        // this.addPriceingForm.patchValue({
        //   maximum: '',
        // });
        this.addPriceingForm.patchValue({
          type: '',
        });
        this.addPriceingForm.patchValue({
          amount: '',
        });
        this.addPriceingForm.patchValue({
          country: '',
        });
        this.addPriceingForm.patchValue({
          status: '',
        });
        this.addPriceingForm.patchValue({
          description: '',
        });
        this.pricingId = null;
      }
    }
    onClickInactive(){
      console.log(this.deleteSubsId)
      Swal.fire({
        title: 'Are you sure?',
        text: "Do you want to deactivate the plan?",
        //icon: 'warning',
        imageUrl: '../../../../assets/images/warning.png',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Confirm <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M12 3c-4.625 0-8.442 3.507-8.941 8.001H10v-3l5 4-5 4v-3H3.06C3.56 17.494 7.376 21 12 21c4.963 0 9-4.037 9-9s-4.037-9-9-9z"></path></svg>',
      }).then((result) => {
        if (result.isConfirmed) {
          this.userService.deleteSubsById({ id: this.deleteSubsId }).subscribe((res: any) => {
            console.log(res)
            // this.router.navigateByUrl('/subscription-list');
            window.location.reload();
          })
        }
      });

    }
    onClickActive(){
      console.log(this.deleteSubsId)
      Swal.fire({
        title: 'Are you sure?',
        text: "Do you want to activate the plan?",
        //icon: 'warning',
        imageUrl: '../../../../assets/images/warning.png',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Confirm <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M12 3c-4.625 0-8.442 3.507-8.941 8.001H10v-3l5 4-5 4v-3H3.06C3.56 17.494 7.376 21 12 21c4.963 0 9-4.037 9-9s-4.037-9-9-9z"></path></svg>',
      }).then((result) => {
        if (result.isConfirmed) {
          this.userService.activeSubsID({ id: this.deleteSubsId }).subscribe((res: any) => {
            console.log(res)
            // this.router.navigateByUrl('/subscription-list');
            window.location.reload();
          })
        }
      });
    }
    updatePlan(id){

      this.userService.updatePlan(this.addPriceingForm.value, id)
        .subscribe((res: any) => {
          console.log(res)
          if (res.success) {
            //this.toastr.success(res.message);
            Swal.fire({
              text: res.message,
              //icon: 'success',
              imageUrl: '../../../../assets/images/success.png',
            });
            document.getElementById('launch_ad')?.click();
            this.isDtInitialized = false;
            this.planList();
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
    openModal1(){
      console.log("helo")
    }

    //  ngAfterViewChecked(): void {
    //   // this.setPrice();
    //  }
    onlyNumberKey(evt: KeyboardEvent) {
      // Only ASCII character in that range allowed
      let ASCIICode = (evt.which) ? evt.which : evt.keyCode;
      return (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57)) ? false : true;
    }

    ngOnDestroy(): void {
      // this.planList();
      this.dtTrigger.unsubscribe();
    }
}
