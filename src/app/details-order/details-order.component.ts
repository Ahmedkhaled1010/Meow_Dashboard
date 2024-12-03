import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import { order } from '../interface';
import { WordService } from '../word.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-details-order',
  standalone: true,
  imports: [],
  templateUrl: './details-order.component.html',
  styleUrl: './details-order.component.scss'
})
export class DetailsOrderComponent {
  productId:string="";
  order?:order;
  status:string="";
  constructor(private _ActivatedRoute:ActivatedRoute,private _DataService:DataService,
    private _WordService:WordService,private _ToastrService:ToastrService
  ){}
  ngOnInit(): void {
   // sessionStorage.setItem("currentPage",'dashboard/Orders/allorder/detailsorder')

    this._ActivatedRoute.params.subscribe(
      (res)=>{
        this.productId=res["id"];
        console.log(this.productId);
        
      })
      this.getOrder();
  }
  getOrder()
  {
    this._DataService.getSpecificOrder(this.productId).subscribe(
      {
        next:(res)=>{
          console.log(res);
          this.order=res;
          
        },
        error:(err)=>{
          console.log(err);
          
        }
      }
    )
  }
  downloadInvoice()
  {
    this._WordService.generateWordFile(this.order!);
  }
  changeOrderStatus(event:any)
  {
      this.status=event.target.value;
  }
  updateOrder()
  {
    this._DataService.updateOrder(this.productId,this.status).subscribe(
      {
      next:(res)=>{
        console.log(res);
        this.getOrder();
          this._ToastrService.success("Successfuly","Update Order")        
      },
      error:(err)=>{
        console.log(err);
        
      }
      }
    )
  }
}
