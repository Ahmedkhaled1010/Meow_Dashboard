import { Component } from '@angular/core';
import { variationAnalysis } from '../interface';
import { DataService } from '../data.service';

@Component({
  selector: 'app-variation',
  standalone: true,
  imports: [],
  templateUrl: './variation.component.html',
  styleUrl: './variation.component.scss'
})
export class VariationComponent {
  allAalysis:variationAnalysis[]=[];
  numOfBroduct:number=0;
  total:number=0;
  avg:Number=0;
  constructor(private _DataService:DataService){}
  ngOnInit(): void {
    sessionStorage.setItem("currentPage",'dashboard/analysis/variation')
this.getVariationAnalysis();
    
  }
  getVariationAnalysis()
  {
    this._DataService.getVariationAnalysis().subscribe({
      next:(res)=>{
        console.log(res);
        this.allAalysis=res
        this.numOfBroduct=this.allAalysis.length
       
        this.avg=this.total/this.numOfBroduct;
        
      },
      error:(err)=>{
        console.log(err);
        
      }
    })}
}
