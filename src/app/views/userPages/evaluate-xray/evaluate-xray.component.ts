import { Component } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-evaluate-xray',
  templateUrl: './evaluate-xray.component.html',
  styleUrls: ['./evaluate-xray.component.scss']
})
export class EvaluateXrayComponent {
// is equal to default value of input range
valInput = '25';
leftPos = `25%`;

onRangeChange(event: any){
  this.valInput = (<HTMLInputElement>event.target).value.trim();
  this.leftPos = `${+(<HTMLInputElement>event.target).value.trim() - 5}%`
}

ngOnInit(){

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

}
