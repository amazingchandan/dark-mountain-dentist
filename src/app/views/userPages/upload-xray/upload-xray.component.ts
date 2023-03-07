import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-upload-xray',
  templateUrl: './upload-xray.component.html',
  styleUrls: ['./upload-xray.component.scss']
})
export class UploadXrayComponent {
  constructor(private userService:UserService){}
  userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
  fileToUpload: File | null = null;
  user=this.userInfo;
  url: any; 
	msg = "";
  hidden=true;

  uploadFile(event:any) {
    console.log('files', event.target.files)
    var formData = new FormData();
     formData.append('xray_image', event.target.files[0]);
     formData.append('user_id', this.userInfo.id);
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

    if(!event.target.files[0] || event.target.files[0].length == 0) {
			this.msg = 'You must select an image';
			return;
		}
		
		var mimeType = event.target.files[0].type;
		
		if (mimeType.match(/image\/*/) == null) {
			this.msg = "Only images are supported";
			return;
		}
		
		var reader = new FileReader();
		reader.readAsDataURL(event.target.files[0]);
		
		reader.onload = (_event) => {
			this.msg = "";
			this.url = reader.result; 
		}
    this.hidden=false;
	}
  }

