import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-registered-dentists',
  templateUrl: './registered-dentists.component.html',
  styleUrls: ['./registered-dentists.component.scss']
})
export class RegisteredDentistsComponent {
  dtOptions: DataTables.Settings = {};
 

  constructor(
    
  ) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      //dom: 'Bfrtip',
    
    };
   
    
  }
  ngOnDestroy(): void {
  }


}
