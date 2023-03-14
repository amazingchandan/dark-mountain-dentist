import { Component, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-uploaded-xrays',
  templateUrl: './uploaded-xrays.component.html',
  styleUrls: ['./uploaded-xrays.component.scss']
})
export class UploadedXraysComponent {

  dtOptions: any = {};

  public allData: any;
  public userData : any;

  private isDtInitialized: boolean = false;
   dtTrigger: Subject<any> = new Subject<any>();
   @ViewChild(DataTableDirective) dtElement: DataTableDirective;
  showContent: boolean;
  constructor( private userService : UserService,

  ) { }

  ngOnInit(): void {
    // setTimeout(()=>this.showContent=true, 450);
    this.dtOptions = {
      language: {
        search:"",
        searchPlaceholder: 'Search ',
      },
      pagingType: 'full_numbers',
      pageLength: 10,


      //dom: 'Bfrtip',

    };
    this.xrayList();
  }

  xrayList(){
    this.userService.getXrayList().subscribe((res:any) => {
      console.log(res, "resssssssssssssssssssssssssssssssssssssss")
      this.allData = res.getData;
      this.showContent=true;
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
  ngOnDestroy(): void {
  }
}
