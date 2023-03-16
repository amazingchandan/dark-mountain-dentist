import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { DataTableDirective } from 'angular-datatables';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
// import { NgxSpinnerService } from 'ngx-bootstrap-spinner';


@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent {
  dtOptions: DataTables.Settings = {};
  private category: string;
  public allData: any;
  public editCatRoute: string;
  public addLanName: string;
  public addLanRoute: string;

  id: any;

  private isDtInitialized: boolean = false;

  dtTrigger: Subject<any> = new Subject<any>();
  @ViewChild(DataTableDirective) dtElement: DataTableDirective;


  constructor(
    private router: Router,
    private apiService: UserService,
    private toastr: ToastrService,
    // private spinner: NgxSpinnerService,
  ) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      dom: 'Bfrtip',
    };

    this.User();


  }

  User() {
    // console.log(this.addLanguageListForm.value)
    // this.spinner.show();
    this.apiService.allWebUser().subscribe((resp: any) => {
      console.log(resp);
      this.allData = resp.getData;
      if (this.isDtInitialized) {
        // this.spinner.hide();
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
          // this.dtTrigger.next();

        });
      } else {
        // this.spinner.hide();
        this.isDtInitialized = true;
        // this.dtTrigger.next();
      }
    });
  }

  async Weblist(id, status) {
    console.log(this.id, 'hiiiiiiiiiii');

    if (id == undefined || id == '') {
      //this.toastr.error(' Id is Invalid');
      Swal.fire({
        text: 'Id is Invalid',
        icon: 'error',
      });
      return false;
    }

    Swal.fire({
      title: 'Are you sure?',
      text: 'Are you sure, you want to change status?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
        let getStatus = {};
        getStatus =
          status === 'active' ? { status: 'inactive' } : { status: 'active' };
        // this.apiService
        //   .WebsiteUserStatus(id, JSON.stringify(getStatus))
        //   .subscribe((result: any) => {
        //     if (result.success) {
        //       Swal.fire({
        //         text: result.message,
        //         icon: 'success',
        //       });
        //       //this.toastr.success(result.message);
        //       this.User();
        //     } else {
        //       Swal.fire({
        //         text: result.message,
        //         icon: 'error',
        //       });
        //       //this.toastr.error(result.message);
        //     }
        //   });
      }
    });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }



}
