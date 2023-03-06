import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
@Component({
  selector: 'app-upload-xray',
  templateUrl: './upload-xray.component.html',
  styleUrls: ['./upload-xray.component.scss']
})
export class UploadXrayComponent {
  constructor(private userService:UserService){}
  fileToUpload: File | null = null;
  user=userInfo;

  uploadFile(event:any) {
    console.log('files', event.target.files)
    var formData = new FormData();
     formData.append('xray_image', event.target.files[0]);
     formData.append('user_id', userInfo.id);
  //  const formData={
  //    xray_image:event.target.files[0]
  //  }
  console.log(event.target.files[0],formData)
    this.userService.addXray(formData)
    .subscribe((res: any) => {
      if (res.success) {
        //this.toastr.success(res.message);
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
  }
}
