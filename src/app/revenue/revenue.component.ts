import { Component } from '@angular/core';
import { RevenueAnalysis } from '../interface';
import { DataService } from '../data.service';

@Component({
  selector: 'app-revenue',
  standalone: true,
  imports: [],
  templateUrl: './revenue.component.html',
  styleUrl: './revenue.component.scss'
})
export class RevenueComponent {
  allAalysis?:RevenueAnalysis
  
  constructor(private _DataService:DataService){}

  ngOnInit(): void {
    sessionStorage.setItem("currentPage",'dashboard/analysis/revenue')
this.getRevenueAnalysis();
    
  }
  getRevenueAnalysis()
  {
    this._DataService.getRevenueAnalysis().subscribe({
      next:(res)=>{
        console.log(res);
        this.allAalysis=res
       
        
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }
}
