import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatSlideToggleModule} from '@angular/material/slide-toggle'

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [MatSlideToggleModule,ReactiveFormsModule,FormsModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss'
})
export class PaymentComponent {
  freeShipping:boolean=true;
  freeTax:boolean=false;
  check:string="Free Shipping";
  shippingForm:FormGroup=new FormGroup(
    {
      type:new FormControl(null)
    }
  )
  ngOnInit(): void {
    
    sessionStorage.setItem("currentPage",'dashboard/Payment')

    console.log(this.check);
    
  }
}
