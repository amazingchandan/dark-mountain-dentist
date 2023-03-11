import { Component,OnInit} from '@angular/core';
import { FormBuilder,FormGroup,Validators,FormControl } from '@angular/forms' ;
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-dentist-profile',
  templateUrl: './dentist-profile.component.html',
  styleUrls: ['./dentist-profile.component.scss']
})
export class DentistProfileComponent implements OnInit {
  userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
  addSuperForm: FormGroup;
  private dentistId :any;
  userData:any={};
  planData:any = {};
  end_date:any;
  date:any;
  month:any;
  year:any;
  xrayData:any ={};
  country:any;
 // userInfo:any;
  defaultType = "-Select-";
  role: any;

   constructor(private formBuilder: FormBuilder,
    private apiService: UserService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private appService :AppService)

    {
    this.addSuperForm=this.formBuilder.group({})
    }
   ngOnInit(): void {
    this.addSuperForm = new FormGroup({
      firstname: new FormControl(),
      lastname: new FormControl(),
      contact: new FormControl(),
      email: new FormControl(),
      address1: new FormControl(),
      address2: new FormControl(),
      city:new FormControl(),
      state:new FormControl(),
      country:new FormControl(),
      zip:new FormControl(),

      //user_role: new FormControl(),
    });
   // this.userInfo=userInfo;
    this.addSuperForm = this.formBuilder.group({
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      contact_number: ['',[Validators.pattern('[- +()0-9]{10,12}')]],
      email: [
        '',

        [Validators.pattern('^([a-zA-Z0-9\.-]+)@([a-zA-Z0-9-]+).[a-zA-Z]{2,4}$')],

      ],
     address1: ['', [Validators.required]],
    address2: ['', [Validators.required]],
     city: ['', [Validators.required]],
     state: ['', [Validators.required]],
    country: ['', [Validators.required]],
     pincode: ['', [Validators.required]],

    });


    this.addSuperForm.controls['email'].disable();

    this.dentistId=this.route.snapshot.paramMap.get('dentist_id');
    console.log("dentist id", this.dentistId)
    if (
      this.dentistId != undefined &&
      this.dentistId != null &&
      this.dentistId != ''
      ) {
        this.editadmin(this.dentistId);
        console.log("errrr",this.dentistId)
      } else {
        // this.addSuperForm.get('status').setValue('active');
      }

      console.log(this.userInfo)
      let jwt = this.userInfo.token

      let jwtData = jwt.split('.')[1]
      let decodedJwtJsonData = window.atob(jwtData)
      let decodedJwtData = JSON.parse(decodedJwtJsonData);
      this.role=decodedJwtData.role;


    }
    editadmin(id) {
      this.apiService.getUserRecordById(id).subscribe((res: any) => {
        console.log(res,"*****");
        this.userData = res.getData;
        this.end_date=this.userData[0].subscription_details.end_date;
        console.log(this.userData[0].subscription_details.end_date,"***")
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
      console.log(this.date,"/",this.month,"/",this.year);

      //Plan-details
      this.apiService.getSubPlanById(this.userData[0].subscription_details.subscription_id).subscribe((res:any)=>{
        console.log(res)
        if(res.success){
          this.planData = res.getData;
          console.log(this.planData[0].type)
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



      }
    });
    this.apiService.getUserXrayById(id).subscribe((res: any) => {
      console.log(res,"xray");
      this.xrayData=res.getData;

      console.log(this.xrayData)
    })
  }
  updateUser(){
    if(this.dentistId!="" && this.dentistId!= undefined && this.dentistId != null){
      this.apiService.updateUser(this.addSuperForm.value ,this.dentistId)
      .subscribe((res: any) => {
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

  cancelSub(event){

    if(this.dentistId!="" && this.dentistId!= undefined && this.dentistId != null){
      this.apiService.cancelUserPlan(this.dentistId)
      .subscribe((res: any) => {
        if (res.success) {
          //this.toastr.success(res.message);
          Swal.fire({
            text: res.message,
            icon: 'success',
          });
          this.apiService.getUserRecordById(this.dentistId).subscribe((res: any) => {
            console.log(res,"*****");
            this.userData = res.getData;
              if(this.userData[0]?.subscription_details.status==false){
                this.planData="";
                this.end_date= " ";
              }
              console.log(this.end_date,"date")
            
          })
          event.target.disable=true;
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
cancelSubfromUser(){

  if(this.dentistId!="" && this.dentistId!= undefined && this.dentistId != null){
    this.apiService.cancelUserPlan(this.dentistId)
    .subscribe((res: any) => {
      if (res.success) {
        //this.toastr.success(res.message);
        Swal.fire({
          text: res.message,
          icon: 'success',
        });
       //this.router.navigateByUrl('/registered-dentists');
       this.appService.logout();
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



  onlyNumberKey(evt: KeyboardEvent) {
    // Only ASCII character in that range allowed
    let ASCIICode = (evt.which) ? evt.which : evt.keyCode;
    return (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57)) ? false : true;
  }
  resetUser(){
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
      address1:"",
    });

    this.addSuperForm.patchValue({
      address2:"",
    });
    this.addSuperForm.patchValue({
      city: "",
    });
    this.addSuperForm.patchValue({
      state:"",
    });
    this.addSuperForm.patchValue({
      country: "",
    });
    this.addSuperForm.patchValue({
      pincode: "",
    });


  }

  }

