import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-mark-xray',
  templateUrl: './mark-xray.component.html',
  styleUrls: ['./mark-xray.component.scss']
})
export class MarkXrayComponent {
  xRayData: any=[];
  id: string;
  markData :any =[];
  userMark:any;
  constructor(private route: ActivatedRoute,
    private userService : UserService){
  
  }
  

  // is equal to default value of input range
  valInput = '25';
  leftPos = `25%`;
  marker:any=[];
  baseLink: string = environment.API_HOST;
  userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');

 

  ngOnInit(){
    this.id = this.route.snapshot.paramMap.get('xray_id');
    this.getXray(this.id);
    this.getMark(this.id);
  }
  onRangeChange(event: any){
    this.valInput = (<HTMLInputElement>event.target).value.trim();
    this.leftPos = `${+(<HTMLInputElement>event.target).value.trim() - 5}%`
    console.log(this.valInput,this.leftPos)
  }

  getXray(id){
    this.userService.getXray(id).subscribe((res:any)=>{
      if(res.success)
      {
        this.xRayData =res.getData;
        console.log(this.xRayData[0]?.xray_image.path)
      }
      else{
        return res.messages;
      }
    })
   }
getMark(id){
  this.userService.getEvalById(id).subscribe((res:any)=>{
    if(res.success)
    {
this.markData=res.getData;
console.log(this.markData.dentist_correction)
this.userMark = this.markData.dentist_correction
    }
  })
}

  save(){
    Swal.fire({
      title: "",
      html: '<span> Accuracy    &nbsp<input type="range" min="0" max="100" value="50" style="width:50%;margin-left:0.5rem"></span><br>'+
        '<br><span class="mt-2">Tag  &nbsp &nbsp &nbsp &nbsp &nbsp<input type="text" style="width:52%;margin-left:0.5rem"></span>',
      confirmButtonText: "Save",
      confirmButtonColor: '#321FDB',
    });
  }
  addMarker(event: MouseEvent) {
    const position = {
        x: event.offsetX,
        y: event.offsetY
    };
    this.marker.push(position);
    console.log(this.marker,"---")
   
  
  }
  saveMarks(){
 

    const xray_info={
      xray_id: this.id,
      user_id: this.userInfo.id,
      marker:this.marker,
      accuracy_per: this.valInput,
       
    }
    console.log(xray_info)
    this.userService.addEvalDataFromAdmin(xray_info).subscribe((res:any)=>{
      if(res.success){
        Swal.fire({
          text: res.message,
          icon: 'success',
        });
  
      } else {
        Swal.fire({
          text: res.message,
          icon: 'error',
        });
      
      }
      
    })
  }
  renderImage(img: string) {
    if (img) {
      return this.baseLink + img;
    } else {
      return '../assets/images/edit.png';
    }
  }
}
