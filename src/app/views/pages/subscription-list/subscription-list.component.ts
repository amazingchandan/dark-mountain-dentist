import { Component } from '@angular/core';

@Component({
  selector: 'app-subscription-list',
  templateUrl: './subscription-list.component.html',
  styleUrls: ['./subscription-list.component.scss']
})
export class SubscriptionListComponent {
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
