import { Component, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-registered-dentists',
  templateUrl: './registered-dentists.component.html',
  styleUrls: ['./registered-dentists.component.scss']
})
export class RegisteredDentistsComponent {
  //dtOptions: DataTables.Settings = {};
  dtOptions: any = {};
 
 public allData: any;
 public userCount: Array<any> = [];

 private isDtInitialized: boolean = false;
  dtTrigger: Subject<any> = new Subject<any>();
  @ViewChild(DataTableDirective) dtElement: DataTableDirective;
  showContent: boolean;
  xrayData: any;
  count: any;

  constructor(
    private router: Router,
    private apiService: UserService,
  ) { }

  ngOnInit(): void {
    console.log($.fn['dataTable'].ext);

    // $.fn['dataTable'].ext.search.push((settings, data, dataIndex) => {
      // const id = parseFloat(data[0]) || 0; // use data for the id column
      // if ((isNaN(this.min) && isNaN(this.max)) ||
      //   (isNaN(this.min) && id <= this.max) ||
      //   (this.min <= id && isNaN(this.max)) ||
      //   (this.min <= id && id <= this.max)) {
      //   return true;
      // }
    //   return false;
    // });
    // setTimeout(()=>this.showContent=true, 450);
    this.dtOptions = {
      // order: [[0, "asc"]],
     
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
      ordering: false,
      responsive:true,
      dom: 'Bfrtip',
      



    };

    this.admin()

    // this.filterById()

  }

  // filterById(): void {
  //   this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
  //     dtInstance.draw();
  //   });
  // }

  admin() {

    this.apiService.getUserList().subscribe((res:any) => {
      console.log(res, "resssssssssssssssssssssssssssssssssssssss")
      this.allData = res.getData;
      // this.count= res.xrayCount
      // console.log(this.allData,"count",this.count)
      // for(let i=0;i<=this.allData.length;i++){
      //   for(let i=0;i<=this.count.length;i++){
           
      //   }
      // }
      // console.log(this.allData, this.count)
      
      this.showContent=true
         if (this.isDtInitialized) {
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
        //  this.dtTrigger.next(this.allData);

        //  this.isDtInitialized = true;
        // var p = document.getElementsByClassName("paginate_button current").length;
        // console.log(p,"ppp")
        });
      } else {

        this.isDtInitialized = true;
      //  var p = document.getElementsByClassName("paginate_button current");
       // console.log(p,"ppp")
        //this.dtTrigger.next();
      }
    })
    setTimeout(() => {
      console.log(this.userCount)
    }, 500)
  }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }


}
