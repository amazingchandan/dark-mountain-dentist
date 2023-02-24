import { Component, OnInit, ViewChild } from '@angular/core';
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
import { max, min } from 'rxjs';
import { type } from 'jquery';

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
  allData: any;

  constructor(
    private formBuilder :FormBuilder,
    private userService:UserService,
    private router :Router,
    private route : ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      //dom: 'Bfrtip',
    
    };

    this.addPriceingForm =new FormGroup({
      planName : new FormControl(),
      amount :new FormControl(),
      max:new FormControl(),
      min:new FormControl(),
      type:new FormControl(),
      country:new FormControl(),
    });
    this.addPriceingForm=this.formBuilder.group({
      planName: ['',[Validators.required]],
      amount:['',[Validators.required]],
      max:['',[Validators.required]],
      min:['',[Validators.required]],
      type:['',[Validators.required]],
      country:['',[Validators.required]],
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
    if (
      this.addPriceingForm.value.planName == undefined ||
      this.addPriceingForm.value.planName.trim() == ''
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
    if (
      this.addPriceingForm.value.min == undefined ||
      this.addPriceingForm.value.min == ''
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
      this.addPriceingForm.value.max == undefined ||
      this.addPriceingForm.value.max == ''
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
      //this.updatePricing(this.pricingId);
    } else {
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
            this.router.navigateByUrl('/subscription-list');
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
    
  
  ngOnDestroy(): void {
  }
}
