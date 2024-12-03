import { Component } from '@angular/core';

@Component({
  selector: 'app-refunddetails',
  standalone: true,
  imports: [],
  templateUrl: './refunddetails.component.html',
  styleUrl: './refunddetails.component.scss'
})
export class RefunddetailsComponent {
  ngOnInit(): void {
    sessionStorage.setItem("currentPage",'dashboard/Refund/allrefund/refundDetails')
      
    }

}
