import { Component,OnInit} from '@angular/core';
import { FormBuilder,FormGroup,Validators,FormControl } from '@angular/forms' ;
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-dentist-profile',
  templateUrl: './dentist-profile.component.html',
  styleUrls: ['./dentist-profile.component.scss']
})
export class DentistProfileComponent implements OnInit {

  addSuperForm: FormGroup;
  private dentistId :any;
 

   constructor(private formBuilder: FormBuilder,
    private apiService: UserService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute)

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
    this.addSuperForm = this.formBuilder.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      contact: ['', [Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')]],
      email: [
        '',

        [Validators.pattern('^([a-zA-Z0-9\.-]+)@([a-zA-Z0-9-]+).[a-zA-Z]{2,4}$')],

      ],
     address1: ['', [Validators.required]],
    address2: ['', [Validators.required]],
     city: ['', [Validators.required]],
     state: ['', [Validators.required]],
    country: ['', [Validators.required]],
     zip: ['', [Validators.required]],
  
    });
    this.dentistId=this.route.snapshot.paramMap.get('dentist_id');
    console.log("dentist id", this.dentistId)
    if (
      this.dentistId != undefined &&
      this.dentistId != null &&
      this.dentistId != ''
    ) {
      this.editadminame(this.dentistId);
      console.log("errrr",this.dentistId)
    } else {
     // this.addSuperForm.get('status').setValue('active');
    }
  }
  editadminame(id) {
    this.apiService.getUserRecordById(id).subscribe((res: any) => {
      console.log(res,"*****");
      if (res.success) {
        this.addSuperForm.patchValue({
          firstname: res.getData[0].first_name,
        });

        this.addSuperForm.patchValue({
          lastname: res.getData[0].last_name,
        });

        this.addSuperForm.patchValue({
          contact: res.getData[0].contact_number,
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
          zip: res.getData[0].pincode,
        });


      
      }
    });
  }

  }

