import { Component } from '@angular/core';
import { DataService } from '../data.service';
import { color } from '../interface';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-add-color',
  standalone: true,
  imports: [ReactiveFormsModule,
    ],
  templateUrl: './add-color.component.html',
  styleUrl: './add-color.component.scss'
})


export class AddColorComponent {

  numPage?:number;
  currentPage:number=1;
  allColor:color[]=[]
  existColor:boolean =false;

  addColor:FormGroup=new FormGroup({
    color:new FormControl(null),
    code:new FormControl(null)
  })
  constructor(private _DataService:DataService){

  }
 ngOnInit(): void {
  sessionStorage.setItem("currentPage",'dashboard/Products/color')
    this.getAllColor();
 }
  createColor()
  {
    this.existColor=false;
    console.log(this.existColor);
    console.log(this.allColor.length);
    
    console.log(this.addColor.get("code")?.value);
    if (this.allColor.length >0) {
      for(let i=0 ;i<=this.allColor.length;i++)
        {
          if(this.allColor[i]?.code ==this.addColor.get("code")?.value   )
          {
            console.log(this.existColor);
            
            this.existColor=true;
            console.log(this.existColor);
          }
        }
    }
    
  if (this.existColor==false) {
    
    this._DataService.addColor(this.addColor.value).subscribe({
      next:(res)=>{
        console.log(res);
        this.getAllColor()
        this.addColor.get("color")?.setValue("");
        this.addColor.get("code")?.setValue("");
        
      },
      error:(err)=>
      {
        console.log(err);
        
      }
    })
   }
   else
   {
    console.log("not add");
    
   }
  }
  getAllColor()
  {
    this._DataService.getAllColor(this.currentPage,10).subscribe(
      {
        next:(res)=>
        {
          console.log(res);
          this.allColor=res.items;

          this.numPage=res.meta.totalPages;
          this.currentPage=res.meta.currentPage;
  
          
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
      this._DataService.getAllColor(this.currentPage+1,10).subscribe(
        {
          next:(res)=>{
  
            this.allColor=res.items;
            this.currentPage+=1;
    
          },
          error:(err)=>
          {
            console.log(err);
            
          }
        }
       )
    }
  }
  backPage()
  {
    if (this.currentPage >1) {
      this._DataService.getAllColor(this.currentPage-1,10).subscribe(
        {
          next:(res)=>{
  
            this.allColor=res.items;
            this.currentPage-=1;
    
          },
          error:(err)=>
          {
            console.log(err);
            
          }
        }
       )
    }
  }
}
