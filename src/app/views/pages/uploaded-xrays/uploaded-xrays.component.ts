import { Component } from '@angular/core';

@Component({
  selector: 'app-uploaded-xrays',
  templateUrl: './uploaded-xrays.component.html',
  styleUrls: ['./uploaded-xrays.component.scss']
})
export class UploadedXraysComponent {

  dtOptions: any = {};
 

  constructor(
    
  ) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
     // dom: 'Bfrtip',
      /*buttons: [ {extends:'copy',
      className: 'btn btn-primary position-relative mt-2',
                  text:'Export' ,
                  style:"position:relative"  
    }]*/
    
    };
   
    
  }
  ngOnDestroy(): void {
  }
}
