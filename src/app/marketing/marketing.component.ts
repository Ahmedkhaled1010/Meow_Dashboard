import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { DataService } from '../data.service';
import { coupon } from '../interface';



@Component({
  selector: 'app-marketing',
  standalone: true,
  imports: [RouterLinkActive,RouterLink,RouterOutlet],
  templateUrl: './marketing.component.html',
  styleUrl: './marketing.component.scss'
})
export class MarketingComponent {
  allCoupon:coupon[]=[]
  allCouponId:string[]=[]
  constructor(private _DataService:DataService){

  }
  ngOnInit(): void {
          
        sessionStorage.setItem("currentPage",'dashboard/Marketing/cupon');
       this.getAllcoupon();
       this._DataService.addCoupon.subscribe((res)=>{
        if(res ==true)
        {
          this.getAllcoupon();
        }
        console.log(res);
        
       })

  }
  getAllcoupon()
  {
    this._DataService.getAllCoupons().subscribe({
      error:(err)=>
      {
        console.log(err);
        
      },
      next:(res)=>
      {
        this.allCoupon=res.items;
        console.log(this.allCoupon);
        
        
      }
    })
  }
  change(event:any)
  {
    const isChecked = (event.target as HTMLInputElement).checked;
      if(isChecked)
      {
        this.allCouponId.push(event.target.value);

      }
      
        event.target.value="";
    
  

  }
  deleteCoupon()
  {
    for(let i=0;i<=this.allCouponId.length;i++)
    {
      this._DataService.deleteCoupon(this.allCouponId[i]).subscribe({
        next:(res)=>{
          console.log(res);
          this.getAllcoupon()
          ;
        },  
        error:(err)=>
        {
          console.log(err);
          
        }
      })
    }
    this.allCouponId=[]
  }

}
