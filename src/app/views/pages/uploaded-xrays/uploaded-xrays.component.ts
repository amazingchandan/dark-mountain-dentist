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
  public subsEndDate: any[] = [];
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
      search:true,
      language: {
        search:"",
        searchPlaceholder: 'Search ',
      },
      buttons:[{
        sExtends: 'CSV',
        text: 'Download CSV'
      }],
      paging: true,
      pagingType: 'full_numbers',
      pageLength: 10,
     
      responsive:true,
      dom: 'Bfrtip',
     order :[ [1,"date","desc"]
      
    ],
      "columnDefs": [{
      "targets": [0,2,3],
     
      "orderable": false
      }]


    };
   
    this.xrayList();
  }

  xrayList(){
    this.userService.getXrayList().subscribe((res:any) => {
      console.log(res, "resssssssssssssssssssssssssssssssssssssss")
      this.allData = res.getData;
      console.log(this.allData);

      /*for(let x = 0; x < this.allData.length; x++){
        console.log(this.allData[x].user_id._id);
      }*/
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

  view(id){
    
  }
  ngOnDestroy(): void {
  }
}
