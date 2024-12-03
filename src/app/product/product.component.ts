import { Component } from '@angular/core';
import { DataService } from '../data.service';
import { ProductAnalysis } from '../interface';
@Component({
  selector: 'app-product',
  standalone: true,
  imports: [],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {
  allAalysis:ProductAnalysis[]=[];
  numOfBroduct:number=0;
  total:number=0;
  avg:Number=0;
  constructor(private _DataService:DataService){}
  ngOnInit(): void {
    this.getProductAnalysis();

    sessionStorage.setItem("currentPage",'dashboard/analysis/product')
  }
  getProductAnalysis()
{
  this._DataService.getProductAnalysis().subscribe({
    next:(res)=>{
      console.log(res);
      this.allAalysis=res
      this.numOfBroduct=this.allAalysis.length
      this.totalRevenue();
      this.avg=this.total/this.numOfBroduct;
      
    },
    error:(err)=>{
      console.log(err);
      
    }
  })
}
totalRevenue()
{
  for(let i=0;i<this.allAalysis.length;i++)
  {
    this.total+=Number(this.allAalysis[i]['total revenue']);
  }
}
}
