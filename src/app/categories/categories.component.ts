import { Component } from '@angular/core';
import { DataService } from '../data.service';
import { CategoryAnalysis } from '../interface';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent {
  allAalysis:CategoryAnalysis[]=[];
  numOfCategory:number=0;
  total:number=0;
  avg:Number=0;
  constructor(private _DataService:DataService){}
  ngOnInit(): void {
    sessionStorage.setItem("currentPage",'dashboard/analysis/catrgories')
    this.getCategorytAnalysis();
    
  }
  getCategorytAnalysis()
{
  this._DataService.getCategoryAnalysis().subscribe({
    next:(res)=>{
      console.log(res);
      this.allAalysis=res
      this.numOfCategory=this.allAalysis.length
      this.avg=this.total/this.numOfCategory;
      
    },
    error:(err)=>{
      console.log(err);
      
    }
  })}
  totalRevenue()
{
  for(let i=0;i<this.allAalysis.length;i++)
  {
    this.total+=Number(this.allAalysis[i].sold);
  }
}
}
