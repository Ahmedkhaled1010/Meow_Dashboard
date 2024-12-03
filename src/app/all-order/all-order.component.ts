import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DataService } from '../data.service';
import { order } from '../interface';
import { subscribe } from 'node:diagnostics_channel';

@Component({
  selector: 'app-all-order',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './all-order.component.html',
  styleUrl: './all-order.component.scss'
})
export class AllOrderComponent {
  allorder:order[]=[]
  orders:number=0;
  Gross_Revenue:number=0;
  Average_order_value:number=0;


  constructor(private _DataService:DataService){}
  ngOnInit(): void {
    sessionStorage.setItem("currentPage",'dashboard/Orders/allorder')
    this._DataService.getAllOrder().subscribe(
      {
        next:(res)=>{
          this.orders=res.meta.totalItems;
          for(let i=0;i<=res.items.length;i++)
          {
            this._DataService.getSpecificOrder(res.items[i].id).subscribe(
              { 
                next:(res)=>
                {
                  this.allorder.push(res)
                  this.checkAnalysis()
                },
                error:(err)=>{
                  console.log(err);
                  
                }
              }
            )
          }
          
        },
        error:(err)=>{
          console.log(err);
          
        }
      }
    )

    
  }
checkAnalysis()
{
  for(let i=0;i<this.allorder.length;i++)
  {
    this.Gross_Revenue+=Number(this.allorder[i].total_price);
  }
  this.Average_order_value=this.Gross_Revenue/this.orders
}
}
