import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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

@Component({
  selector: 'app-subscription-list',
  templateUrl: './subscription-list.component.html',
  styleUrls: ['./subscription-list.component.scss']
})
export class SubscriptionListComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  addPriceingForm: FormGroup;
  private pricingId: any;
  private status: any;
  plan_name: string;
  minimum:string;
  maximum:string;
  amount:number;
  type:string;
  defaultType = "-Select-";

  allData: any;
  private isDtInitialized: boolean = false;
  dtTrigger: Subject<any> = new Subject<any>();
  @ViewChild(DataTableDirective) dtElement: DataTableDirective;
  @ViewChild('close') close: ElementRef;

  showContent: boolean;
  country: any;
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    setTimeout(() => this.showContent = true, 250);
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      language: {
        search:"",
        searchPlaceholder: 'Search ',
      },
      info:false,
      //dom: 'Bfrtip',

    };
    this.planList();

    this.addPriceingForm = new FormGroup({
      plan_name: new FormControl(),
      amount: new FormControl(),
      maximum: new FormControl(),
      minimum: new FormControl(),
      type: new FormControl(),
      country: new FormControl(),
    });
    this.addPriceingForm = this.formBuilder.group({
      plan_name: ['', [Validators.required]],
      amount: ['', [Validators.required]],
      maximum: ['', [Validators.required]],
      minimum: ['', [Validators.required]],
      type: ['', [Validators.required]],
      country: ['', [Validators.required]],
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
        text: 'Please enter Plan name',
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
    if (
      this.addPriceingForm.value.minimum == undefined ||
      this.addPriceingForm.value.minimum == ''
    ) {
      Swal.fire({
        text: 'Please enter minimum',
        icon: 'warning'
      });
      return false;
      // this.toastr.error('Please enter subscription days');
      // return false;
    }
    if (
      this.addPriceingForm.value.maximum == undefined ||
      this.addPriceingForm.value.maximum == ''
    ) {
      Swal.fire({
        text: 'Please enter maximum',
        icon: 'warning'
      });
      return false;
      // this.toastr.error('Please enter subscription days');
      // return false;
    }
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
      this.pricingId != undefined &&
      this.pricingId != null &&
      this.pricingId != ''
    ) {
      console.log("update mode",this.pricingId)
      this.updatePlan(this.pricingId);
    }
     else {
      this.userService
        .addPrice(this.addPriceingForm.value)
        .subscribe((res: any) => {
          console.log(res);
          if (res.success) {
            //this.toastr.success(res.message);
            // Swal.fire({ toast: true, position: 'top-end', showConfirmButton: false, timer: 3000, title: 'Success!', text: 'Subscripition Of this user ', icon: 'success', });

            Swal.fire({
              text: res.message,
              icon: 'success',
            });
            //this.router.navigateByUrl('/subscription-list');
            document.getElementById('launch_ad')?.click();
            this.planList();

          } else {
            Swal.fire({
              text: res.message,
              icon: 'error',
            });
            //this.toastr.error(res.message);
          }
        });
    }
  }
  planList() {

    this.userService.getSubscriptionList().subscribe((res: any) => {
      console.log(res, "response")
      this.allData = res.getData;
      if (this.isDtInitialized) {
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
          // this.dtTrigger.next();
        });
      } else {
        this.isDtInitialized = true;
        //this.dtTrigger.next();
      }
    })

  }

  openModal(id) {
    console.log(id, "plan id")
    for (let i = 0; i < this.allData.length; i++) {
      if (this.allData[i]._id === id) {
        console.log(this.allData[i])
        this.pricingId=id;
        this.addPriceingForm.patchValue({
          plan_name: this.allData[i].plan_name,
        });

        this.addPriceingForm.patchValue({
          minimum: this.allData[i].minimum,
        });
        this.addPriceingForm.patchValue({
          maximum: this.allData[i].maximum,
        });
        this.addPriceingForm.patchValue({
          type: this.allData[i].type,
        });
        this.addPriceingForm.patchValue({
          amount: this.allData[i].amount,
        });
        this.addPriceingForm.patchValue({
          country: this.allData[i].country,
        });

      }
    }
  }
  updatePlan(id) {

    this.userService.updatePlan(this.addPriceingForm.value, id)
      .subscribe((res: any) => {
        console.log(res)
        if (res.success) {
          //this.toastr.success(res.message);
          Swal.fire({
            text: res.message,
            icon: 'success',
          });
          document.getElementById('launch_ad')?.click();
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


  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}
