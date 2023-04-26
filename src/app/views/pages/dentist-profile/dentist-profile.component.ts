import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AppService } from 'src/app/services/app.service';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-dentist-profile',
  templateUrl: './dentist-profile.component.html',
  styleUrls: ['./dentist-profile.component.scss']
})
export class DentistProfileComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
  public userID = localStorage.getItem('id') || "";
  addSuperForm: FormGroup;
  public dentistId: any;
  userData: any = {};
  planData: any = {};
  end_date: any;
  date: any;
  month: any;
  year: any;
  xrayData: any = {};
  country: any;
  // userInfo:any;
  role: any;
  age: any;
  all_subData:any=[];
  hiddenFlag:boolean=true;
  hiddenunFlag:boolean=true;
  private isDtInitialized: boolean = false;
  dtTrigger: Subject<any> = new Subject<any>();
  @ViewChild(DataTableDirective, {static: false}) dtElement: DataTableDirective;
  showContent: boolean;
  planDetail: any;
  constructor(private formBuilder: FormBuilder,
    private apiService: UserService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private appService: AppService) {
    this.addSuperForm = this.formBuilder.group({})
  }
  ngOnInit(): void {
    this.addSuperForm = new FormGroup({
      firstname: new FormControl(),
      lastname: new FormControl(),
      contact: new FormControl(),
      email: new FormControl(),
      address1: new FormControl(),
      address2: new FormControl(),
      city: new FormControl(),
      state: new FormControl(),
      country: new FormControl(),
      zip: new FormControl(),
      age: new FormControl(),
      license_no : new FormControl(),

      //user_role: new FormControl(),
    });
    // this.userInfo=userInfo;
    console.log(this.userID);

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      // language: {
      //   search:"",
      //   searchPlaceholder: 'Search ',
      // },
      info: false,
      ordering: false,
      responsive: true,
      searching: false,
      // dom: 'Bfrtip',

    };

    this.addSuperForm = this.formBuilder.group({
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      contact_number: ['', [Validators.pattern('[- +()0-9]{10,12}')]],
      email: [
        '',

        [Validators.pattern('^([a-zA-Z0-9\.-]+)@([a-zA-Z0-9-]+).[a-zA-Z]{2,4}$')],

      ],
      address1: ['', [Validators.required]],
      address2: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      country: ['', [Validators.required]],
      pincode: ['', [Validators.pattern('[- +()0-9]{10,12}')]],
      age: ['', [Validators.required]],
      license_no : ['', [Validators.required]],
    });


    this.addSuperForm.controls['email'].disable();

    this.dentistId = this.route.snapshot.paramMap.get('dentist_id');
    console.log("dentist id", this.dentistId)
    if (
      this.dentistId != undefined &&
      this.dentistId != null &&
      this.dentistId != ''
    ) {
      this.editadmin(this.dentistId);
      console.log("errrr", this.dentistId)
    } else {
      // this.addSuperForm.get('status').setValue('active');
    }

    console.log(this.userInfo)
    let jwt = this.userInfo.token

    let jwtData = jwt.split('.')[1]
    let decodedJwtJsonData = window.atob(jwtData)
    let decodedJwtData = JSON.parse(decodedJwtJsonData);
    this.role = decodedJwtData.role;
    this.myPlanDetail()
  setTimeout(()=>{
    this.flagBtn();
  },1000)
   

     
  }
  flagBtn(){
    let flag = document.getElementById("flag");
let unflag = document.getElementById("unflag");
console.log("00",this.userData.flag)
    
    if(this.userData[0].flag===0){
      this.hiddenFlag=false;
      this.hiddenunFlag=true;
      console.log("0",this.userData[0].flag)

    }
    else if(this.userData[0].flag===1){
      this.hiddenFlag=true;
      this.hiddenunFlag=false
      console.log("1",this.userData.flag)

    }
  }
  handleClick(){
    this.router.navigateByUrl('/registered-dentists');
    console.log(this.role);
  }
  editadmin(id) {
    this.apiService.getUserRecordById(id).subscribe((res: any) => {
      console.log(res, "*****");
      this.userData = res.getData;
      this.end_date = this.userData[0].subscription_details.end_date;
      console.log(this.userData[0].subscription_details.end_date, "***")
      /* if(this.userData[0].subscription_details.end_date!=null)
      {
        let date= this.userData[0].subscription_details.end_date
        this.end_date = new Date(date).toISOString().split('T')[0];
        this.date =  new Date(date).getDate();
        this.month =  new Date(date).getMonth()+1;
        this.year =  new Date(date).getFullYear();
      }
      else{
        this.date =  null;
        this.month =  null;
        this.year =  null;
      }
      this.year =  null;
    }*/
      console.log(this.date, "/", this.month, "/", this.year);

      //Plan-details
      this.apiService.getSubPlanById(this.userData[0].subscription_details.subscription_id).subscribe((res: any) => {
        console.log(res)
        if (res.success) {
          this.planData = res.getData;
          // console.log(this.planData[0].type)
        }
      })

      //--------

      if (res.success) {
        this.addSuperForm.patchValue({
          first_name: res.getData[0].first_name,
        });

        this.addSuperForm.patchValue({
          last_name: res.getData[0].last_name,
        });

        this.addSuperForm.patchValue({
          contact_number: res.getData[0].contact_number,
        });

        this.addSuperForm.patchValue({
          email: res.getData[0].email,
        });

        this.addSuperForm.patchValue({
          address1: res.getData[0].address1,
        });

        this.addSuperForm.patchValue({
          address2: res.getData[0].address2,
        });
        this.addSuperForm.patchValue({
          city: res.getData[0].city,
        });
        this.addSuperForm.patchValue({
          state: res.getData[0].state,
        });
        this.addSuperForm.patchValue({
          country: res.getData[0].country,
        });
        this.addSuperForm.patchValue({
          pincode: res.getData[0].pincode,
        });
        this.addSuperForm.patchValue({
          age: res.getData[0].age
        });
        this.addSuperForm.patchValue({
         license_no: res.getData[0].license_no
        })


      }
    });
     //allSubscriptionDetail Api
   
     this.apiService.getUserAllSubById(id).subscribe((res: any) => {
      console.log(res, "xray");
      this.all_subData=(res.getData.all_subscription_details);
     this.showContent=true
      if (this.isDtInitialized) {
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
         this.dtTrigger.next(undefined);
        });
      } else {
        this.isDtInitialized = true;
        this.dtTrigger.next(undefined);
      }
      console.log(this.all_subData)
    })


    this.apiService.getUserXrayById(id).subscribe((res: any) => {
      console.log(res, "xray");
      this.xrayData = res.getData;
      this.showContent=true
      if (this.isDtInitialized) {
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
         this.dtTrigger.next(undefined);
        });
      } else {
        this.isDtInitialized = true;
        this.dtTrigger.next(undefined);
      }
      console.log(this.xrayData)
    })


  }
  updateUser() {
    console.log("user")
    if (this.dentistId != "" && this.dentistId != undefined && this.dentistId != null) {
      this.apiService.updateUser(this.addSuperForm.value, this.dentistId)
        .subscribe((res: any) => {
          console.log("user1")
          if (res.success) {
            //this.toastr.success(res.message);
            Swal.fire({
              text: res.message,
              icon: 'success',
            });
            //  this.router.navigateByUrl('/registered-dentists');
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
 planDetails(id){
   console.log(id,"idd")
   for(let i=0;i< this.all_subData.length;i++){
    if(this.all_subData[i]._id==id){
      this.planDetail=this.all_subData[i]
    }
    console.log(this.planDetail,"detail")
   }
 }



  cancelSub(event) {

    Swal.fire({
      title: 'Are you sure?',
      text: "You want to cancel subscription!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, cancel subscription!',
    }).then((result) => {
      if (result.isConfirmed) {
        if (this.dentistId != "" && this.dentistId != undefined && this.dentistId != null) {
        this.apiService.cancelUserPlan(this.dentistId)
          .subscribe((res: any) => {
            if (res.success) {
              //this.toastr.success(res.message);
              Swal.fire({
                text: res.message,
                icon: 'success',
              });
              this.apiService.getUserRecordById(this.dentistId).subscribe((res: any) => {
                console.log(res, "*****");
                this.userData = res.getData;
                if (this.userData[0]?.subscription_details.status == false) {
                  this.planData = "";
                  this.end_date = " ";
                }
                console.log(this.end_date, "date")

              })
              event.target.disable = true;
              //  this.router.navigateByUrl('/registered-dentists');
            } else {
              Swal.fire({
                text: res.message,
                icon: 'error',
              });
              //this.toastr.error(res.message);
            }
          });
      }}})


  }
  cancelSubfromUser() {
    Swal.fire({
      title: 'Are you sure?',
      text: "You want to cancel subscription!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, cancel subscription!',
    }).then((result) => {
      if (result.isConfirmed) {

        if (this.dentistId != "" && this.dentistId != undefined && this.dentistId != null) {
          this.apiService.cancelUserPlan(this.dentistId)
            .subscribe((res: any) => {
              if (res.success) {
              /*  Swal.fire({
                  toast: true,
                  position: 'top-end',
                  showConfirmButton: false,
                  timer: 3000,
                  title: 'Success!',
                  text: "You have been log out",
                  icon: 'success',
                });*/
                this.appService.logout();
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







  onlyNumberKey(evt: KeyboardEvent) {
    // Only ASCII character in that range allowed
    let ASCIICode = (evt.which) ? evt.which : evt.keyCode;
    return (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57)) ? false : true;
  }
  resetUser() {
    this.addSuperForm.patchValue({
      first_name: "",
    });
    this.addSuperForm.patchValue({
      last_name: "",
    });

    this.addSuperForm.patchValue({
      contact_number: "",
    });

    /* this.addSuperForm.patchValue({
       email: "",
     });*/


    this.addSuperForm.patchValue({
      address1: "",
    });

    this.addSuperForm.patchValue({
      address2: "",
    });
    this.addSuperForm.patchValue({
      city: "",
    });
    this.addSuperForm.patchValue({
      state: "",
    });
    this.addSuperForm.patchValue({
      country: "",
    });
    this.addSuperForm.patchValue({
      pincode: "",
    });
    this.addSuperForm.patchValue({
      age: '',
    });
    this.addSuperForm.patchValue({
      license_no: '',
    })
     

  }
  flagClick(){
    const flagData={
      id: this.userData[0]?._id,
      flag: 1,
    }
    this.apiService.setFlag(flagData).subscribe((res:any)=>{
      if (res.success){
        console.log("flag set successfully")
        this.hiddenFlag=true;
        this.hiddenunFlag=false;
      }
      else{
        console.log("flag not set successfully")
      }
    })
   
  }
  unflagClick(){
    const flagData={
      id: this.userData[0]?._id,
      flag: 0,
    }
    this.apiService.setFlag(flagData).subscribe((res:any)=>{
      if (res.success){
        console.log("flag set successfully")
        this.hiddenFlag=false;
        this.hiddenunFlag=true;
      }
      else{
        console.log("flag not set successfully")
      }
    })
   
  }
  myPlanDetail(){
    this.apiService.getUserPlanById(this.userInfo.id).subscribe((res:any)=>
    {
      if(res.success){
      // this.planDetail=res.getData;
       console.log("planDetail",this.planDetail)
      }
    })
  }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}

