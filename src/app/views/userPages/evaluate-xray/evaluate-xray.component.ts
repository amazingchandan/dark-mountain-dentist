import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-evaluate-xray',
  templateUrl: './evaluate-xray.component.html',
  styleUrls: ['./evaluate-xray.component.scss']
})
export class EvaluateXrayComponent {
// is equal to default value of input range
constructor(private route: ActivatedRoute,
  private userService : UserService){

}

valInput = '25';
leftPos = `25%`;
marker:any=[];
xRayData:any=[];
userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
baseLink: string = environment.API_HOST;
id:any;


onRangeChange(event: any){
  this.valInput = (<HTMLInputElement>event.target).value.trim();
  this.leftPos = `${+(<HTMLInputElement>event.target).value.trim() - 5}%`
}

ngOnInit(){
   this.id = this.route.snapshot.paramMap.get('xray_id');
  this.getXray(this.id);

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
    user_id: this.xRayData[0]?.user_id,
    marker:this.marker,
    accuracy_per: this.valInput,
     
  }
  console.log(xray_info)
  this.userService.addEvalData(xray_info).subscribe((res:any)=>{
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
    return '../assets/images/no-image.jpg';
  }
}
}
