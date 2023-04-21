import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { DataTableDirective } from 'angular-datatables';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-bootstrap-spinner';
@Component({
  selector: 'app-upload-xray',
  templateUrl: './upload-xray.component.html',
  styleUrls: ['./upload-xray.component.scss']
})
export class UploadXrayComponent implements OnInit {
  public allData: Array<any> = [];
 // dtOptions: DataTables.Settings = {};
 dtOptions: any = {};
  private isDtInitialized: boolean = false;
  dtTrigger: Subject<any> = new Subject<any>();
  @ViewChild(DataTableDirective) dtElement: DataTableDirective;
  showModalBox: boolean = false;
  showContent: boolean;
  public display: any = false;
  baseLink: string = environment.API_HOST;
  public uploadedXray: any;
  myFormData: any;
  myFiles: any;
  apiData: any={};

  constructor(private userService: UserService,
    private spinner: NgxSpinnerService,
    public router: Router) { }

  userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
  fileToUpload: File | null = null;
  user = this.userInfo;
  url: any;
  msg = "";
  hidden: boolean;
  fileStyle = {
    color: "black",
  };

  xRayData: any = [];

  public ngOnInit() {
    
    this.dtOptions = {
      search: false,
      searching: false,
      language: {
        search: "",
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
      responsive: true,
      // dom: 'Bfrtip',
    };

    this.getAllXrayOfUserById()
    //this.evalBtn();

     
  }
/*  evalBtn(){
    let evaluate = document.getElementById("eval");
let view = document.getElementById("view");

    let flagged=0;
    if(flagged==0){
      this.hiddenFlag=false;
      this.hiddenunFlag=true;

    }
    else if(flagged==1){
      this.hiddenFlag=true;
      this.hiddenunFlag=false

    }
  }*/
  public open() {
    if (0) {
      // Dont open the modal
      this.showModalBox = false;
    } else {
      // Open the modal
      this.showModalBox = true;
    }

  }
  openModal() {

  }
  backdropModal() {
    this.display = false;
  }
  uploadFile(event: any) {
    console.log('files', event.target.files)
    console.log(event.target.files[0].name.split(".")[1], "type")
    let allImages: Array<string> = ['png', 'jpg', 'jpeg', 'gif', 'JPG', 'PNG', 'JPEG'];

    if (allImages.indexOf(event.target.files[0].name.split(".")[1]) === -1) {

      Swal.fire({
        text: 'Only images are allowed',
        icon: 'warning'
      });
      this.fileStyle = {
        color: "transparent",

      }
      return false;

    } else {
      this.fileStyle = {
        color: "black",

      }
      var formData = new FormData();
      formData.append('xray_image', event.target.files[0]);
      formData.append('user_id', this.userInfo.id);

      console.log(event.target.files[0], formData)
      this.myFormData = formData
      this.myFiles = event.target.files[0]
      //  const formData={
      //    xray_image:event.target.files[0]
      //  }
      console.log(this.myFiles, this.myFormData)
      // let reader = new FileReader();
      //   if(event.target.files && event.target.files.length > 0) {
      //     let file = event.target.files[0];
      //     reader.readAsDataURL(file);
      //     reader.onload = () => {
      //       this.uploadedXray = reader.result;
      //     };
      //   }

      // this.uploadedXray = event.target.files[0].name
      // this.userService.addXray(formData)
      // .subscribe((res: any) => {
      //   console.log(res)
      //   if (res.success) {
      //     //this.toastr.success(res.message);
      //     this.xRayData=res.getData;
      //     // const show = document.getElementById('exampleModalCenter')
      //     // console.log("WORKED", show);
      //     // show.addEventListener('hidden.bs.modal', function(res: any){
      //     //   console.log("WORKED");
      //     // })
      //     // Swal.fire({
      //     //   text: res.message,
      //     //   icon: 'success',
      //     // });
      //     // this.uploadedXray = res.getData.xray_image.path
      //     console.log("WORKED", this.display);

      //   } else {
      //     Swal.fire({
      //       text: res.message,
      //       icon: 'error',
      //     });
      //     //this.toastr.error(res.message);
      //   }
      // });

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
      this.hidden = false;
      this.display = true;

    }
     /* var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer my-secret-auth-token");
    myHeaders.append('Access-Control-Allow-Origin', "*");
    myHeaders.append('Access-Control-Allow-Headers', "*");
    myHeaders.append('Access-Control-Allow-Origin', 'http://localhost:4200');
    var formdata = new FormData();
    formdata.append("image",this.myFiles);
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    };
    
    fetch("https://admin-scm.blahworks.tech/upload/image", {
      method: 'POST',
    
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    })
      .then(response => response.text())
      .then(result =>{ console.log(JSON.parse(result));
        this.apiData= result;
        console.log(this.apiData)
      })
      .catch(error => console.log('error', error));
    */

  }
  handleSave() {
    var formData = new FormData();
    formData.append('xray_image', this.myFiles);
    formData.append('user_id', this.userInfo.id);
    this.userService.addXray(formData)
      .subscribe((res: any) => {
        console.log(res)
        if (res.success) {
          //this.toastr.success(res.message);
          this.xRayData = res.getData;
          // const show = document.getElementById('exampleModalCenter')
          // console.log("WORKED", show);
          // show.addEventListener('hidden.bs.modal', function(res: any){
          //   console.log("WORKED");
          // })
          // Swal.fire({
          //   text: res.message,
          //   icon: 'success',
          // });
          // this.uploadedXray = res.getData.xray_image.path
          // console.log("WORKED", this.display);
          this.display = false;
          this.hidden = false;
          this.isDtInitialized= false;
          this.getAllXrayOfUserById()
        } else {
          Swal.fire({
            text: res.message,
            icon: 'error',
          });
          this.display = true;
          //this.toastr.error(res.message);
        }
      });
  }
  getAllXrayOfUserById() {
    this.userService.getUserXrayById(this.userInfo.id).subscribe((res: any) => {
      console.log(res, "!!!!!!!!!!!!!!!!!!!!!!");
      this.allData = res.getData
      this.showContent = true;
  
      if (this.isDtInitialized) {
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
          //  this.dtTrigger.next(this.allData);
          //  this.isDtInitialized = true;
          // var p = document.getElementsByClassName("paginate_button current").length;
          // console.log(p,"ppp")
          this.dtTrigger.next(undefined);
        });
      } else {
        this.isDtInitialized = true;
        this.dtTrigger.next(undefined);
        //  var p = document.getElementsByClassName("paginate_button current");
        // console.log(p,"ppp")
        //this.dtTrigger.next();
      }
    })
  }
  renderImage(img: any) {
    if (img) {
      console.log(img, this.baseLink);
      return this.baseLink + img;
    } else {
      return '../assets/images/no-image.jpg';
    }
  }
  evaluate(id) {
    // [routerLink]="'/evaluate-x-ray'"
    console.log(this.xRayData._id, id)
    // let id = this.xRayData._id
    this.router.navigateByUrl('/evaluate-x-ray/' + id);
    this.hidden = true;
  }
  view(id){
    this.router.navigateByUrl('/view-x-ray/' + id)
  }
  // evaluate(){
  //   // [routerLink]="'/evaluate-x-ray'"
  //   console.log(this.xRayData._id)
  //   let id =this.xRayData._id
  //   this.router.navigateByUrl('/evaluate-x-ray/' + id);
  //  }

 saveNdEval(){
  var formData = new FormData();
    formData.append('xray_image', this.myFiles);
    formData.append('user_id', this.userInfo.id);
    this.userService.addXray(formData)
      .subscribe((res: any) => {
        console.log(res)
        if (res.success) {
          //this.toastr.success(res.message);
          this.xRayData = res.getData;
          
          this.display = false;
          this.hidden = false;
          this.isDtInitialized= false;
          this.getAllXrayOfUserById()
         this.evaluate(this.xRayData._id)
          console.log(this.xRayData)
        } else {
          Swal.fire({
            text: res.message,
            icon: 'error',
          });
          this.display = true;
          //this.toastr.error(res.message);
        }
      });
 }


}
