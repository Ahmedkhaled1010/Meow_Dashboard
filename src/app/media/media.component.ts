import { Component } from '@angular/core';
import { DataService } from '../data.service';
import { Image } from '../interface';
//import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-media',
  standalone: true,
  imports: [],
  templateUrl: './media.component.html',
  styleUrl: './media.component.scss'
})
export class MediaComponent {
  baseUrl:string='https://testtarekserver.meow-ksa.com/';
  currentPage:number=1;
  row:number=10;
  numPage?:number;
  allId:string[]=[]

  allImage:Image[]=[];
  constructor(private _DataService:DataService){}
  ngOnInit(): void {
   // this._NgxSpinnerService.show();
      sessionStorage.setItem("currentPage",'dashboard/Media');
      this.getAllImage(this.currentPage,this.row)
  
  }
  getAllImage(page:number,limit:number)
  {
    this._DataService.getAllImage(page,limit).subscribe(
      {
        next:(res)=>{
          console.log(res);
          this.allImage=res.items;
          this.numPage=res.meta.totalPages;
        this.currentPage=res.meta.currentPage;
        console.log(this.currentPage);

          
        },
        error:(err)=>
        {
          console.log(err);
          
        }
      }
    )
  }
  nextPage()
  {
    
    if (this.currentPage !=this.numPage) {
      this.getAllImage(this.currentPage+1,this.row);
      console.log(this.currentPage);

    }
    
  }
  backPage()
  {

    if (this.currentPage >1) 
      {
        this.getAllImage(this.currentPage-1,this.row);
        console.log(this.currentPage);

      }
  }
  rowPerPage(row:any)
  {
    this.row=row.target.value;+
    this.getAllImage(1,this.row);

  }
  goToPage(page:any)
  {
    if (page.target.value>this.numPage!) {
      this.currentPage=this.numPage!;
    }
    else 
    {
      this.currentPage=page.target.value;

    }
    this.getAllImage(this.currentPage,this.row);

  }
  change(event:any)
  {
    const isChecked = (event.target as HTMLInputElement).checked;
    if(isChecked)
    {

      this.allId.push(event.target.value);
    }
    event.target.value="";
  }
  deleteImage()
  {
    for(let i=0;i<this.allId.length;i++)
    {
      this._DataService.deleteIamge(this.allId[i]);
    }
  }
}
