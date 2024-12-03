import { DataService } from './../data.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-cupon',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './cupon.component.html',
  styleUrl: './cupon.component.scss'
})
export class CuponComponent {
  date:string="";
  type:string="";

  couponForm:FormGroup= new FormGroup(
    {
      name:new FormControl(null,[Validators.required]),
      type:new FormControl(null,[Validators.required]),
      usageLimit:new FormControl(null,[Validators.required]),
      amount:new FormControl(null,[Validators.required]),
      expiryDate:new FormControl(null,[Validators.required]),

    }
  )
  constructor(private _DataService:DataService){}
  ngOnInit(): void {
    
    sessionStorage.setItem("currentPage",'dashboard/Marketing/cupon')
  }

  addCoupon()
  {
    this.couponForm.get("type")?.setValue(this.type);
    this.couponForm.get("expiryDate")?.setValue(this.date);
    this.couponForm.get("usageLimit")?.setValue(Number(this.couponForm.get("usageLimit")?.value));
    this.couponForm.get("amount")?.setValue(Number(this.couponForm.get("amount")?.value));

    console.log(this.couponForm.value);
    this._DataService.createCoupon(this.couponForm.value).subscribe(
      {
        error:(err)=>
        {
          console.log(err);
          
        },
        next:(res)=>
        {
          this._DataService.addCoupon.next(true)

          console.log(res);
          
        }
      }
    )
    
    
  }
  selectDate(event:any)
  {
    this.date=event.target.value;

  }
  selectType(event:any)
  {
    this.type=event.target.value;
    

  }
}
