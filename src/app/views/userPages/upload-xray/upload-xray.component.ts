import { Component, ViewChild } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { DataTableDirective } from 'angular-datatables';
import { Observable, Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upload-xray',
  templateUrl: './upload-xray.component.html',
  styleUrls: ['./upload-xray.component.scss']
})
export class UploadXrayComponent {
  public allData: Array<any> = [];
  dtOptions: DataTables.Settings = {};
  private isDtInitialized: boolean = false;
  dtTrigger: Subject<any> = new Subject<any>();
  @ViewChild(DataTableDirective) dtElement: DataTableDirective;
  showContent: boolean;

  constructor(private userService:UserService,
  public router : Router){}

  userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
  fileToUpload: File | null = null;
  user=this.userInfo;
  url: any;
	msg = "";
  hidden=true;
 fileStyle={
  color:"black",
 };

 xRayData:any=[];

 ngOnInit(): void {
  this.dtOptions = {
    search: false,
    searching: false,
    language: {
      search:"",
      searchPlaceholder: 'Search ',
    },
    paging: true,
    pagingType: 'full_numbers',
    pageLength: 10,
    ordering: false,
    responsive:true,
    // dom: 'Bfrtip',
  };
  this.showContent = true;
  this.allData = [
    {

    },
    {

    }
  ]
}
openModal(){

  }
  uploadFile(event:any) {
    console.log('files', event.target.files)
    console.log(event.target.files[0].name.split(".")[1],"type")
    let allImages: Array<string> = ['png', 'jpg', 'jpeg', 'gif', 'JPG', 'PNG', 'JPEG'];

    if (allImages.indexOf(event.target.files[0].name.split(".")[1]) === -1) {

      Swal.fire({
        text: 'Only images are allowed',
        icon: 'warning'
      });
      this.fileStyle={
         color:"transparent",

      }
      return false;

    }else{
      this.fileStyle={
        color:"black",

     }
    var formData = new FormData();
     formData.append('xray_image', event.target.files[0]);
     formData.append('user_id', this.userInfo.id);
  //  const formData={
  //    xray_image:event.target.files[0]
  //  }
  console.log(event.target.files[0],formData)
    this.userService.addXray(formData)
    .subscribe((res: any) => {
      console.log(res)
      if (res.success) {
        //this.toastr.success(res.message);
        this.xRayData=res.getData;
        Swal.fire({
          text: res.message,
          icon: 'success',
        });

      } else {
        Swal.fire({
          text: res.message,
          icon: 'error',
        });
        //this.toastr.error(res.message);
      }
    });

   /* if(!event.target.files[0] || event.target.files[0].length == 0) {
      // Swal.fire({
      //   text: "You must select an image",
      //   icon: 'error',
      // });
			this.msg = 'You must select an image';
			return;
		}

    var mimeType = event.target.files[0].type;

		if (mimeType.match(/image\/*///) == null) {
      // Swal.fire({
      //   text: "Only images are supported",
      //   icon: 'error',
      // });
		/*	this.msg = "Only images are supported";
			return;
		}
*/
		var reader = new FileReader();
		reader.readAsDataURL(event.target.files[0]);

		reader.onload = (_event) => {
			this.msg = "";
			this.url = reader.result;
		}
    this.hidden=false;
	}

}
evaluate(){
 // [routerLink]="'/evaluate-x-ray'"
 console.log(this.xRayData._id)
 let id =this.xRayData._id
 this.router.navigateByUrl('/evaluate-x-ray/' + id);
}


}
