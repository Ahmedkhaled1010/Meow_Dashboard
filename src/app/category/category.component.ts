import { Component } from '@angular/core';
import { DataService } from '../data.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { category } from '../interface';
@Component({
  selector: 'app-category',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent {
  existCategory:boolean=false;
  checked:string="";
  allCategory:category[]=[]
  numPage?:number;
  currentPage:number=1;
  ngOnInit(): void {
   this.getAll();
  }
  addCategoryForm:FormGroup=new FormGroup(
    {
      name:new FormControl(null,[Validators.required]),
      description:new FormControl(null,[Validators.required]),
    }
  );
  checkboxDelete:FormGroup=new FormGroup(
    {
      category:new FormControl(null)
    }
  )
  
  constructor(private _DataService:DataService){}
  createCategory()
  {
    this.existCategory=false;
    console.log(this.existCategory);
    
    if(this.allCategory.length>0)
    {
      console.log(this.existCategory);
      for(let i=0;i<=this.allCategory.length;i++)
      {
        if(this.allCategory[i]?.name ==this.addCategoryForm.get("name")?.value)
        {
          console.log(this.existCategory);

          this.existCategory=true
          console.log(this.existCategory);

        }
      }
    }
   if (this.existCategory==false) {
    this._DataService.createCategory(this.addCategoryForm.value).subscribe(
      {
        next:(res)=>
        {
          console.log(res);
          this.getAll();

          
        },
        error:(err)=>
        {
          console.log(err);
          
        }
      }
    )
    this.addCategoryForm.get("name")?.setValue("");
    this.addCategoryForm.get("description")?.setValue("");
   }
   else
   {
    console.log("not Add");
    
   }
    
  }
  getAll()
  {
    this._DataService.getAllCategory(this.currentPage,10).subscribe(
      {
        next:(res)=>{
          this.allCategory=res.items;
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
      this._DataService.getAllCategory(this.currentPage+1,10).subscribe(
        {
          next:(res)=>{
  
            this.allCategory=res.items;
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
      this._DataService.getAllCategory(this.currentPage-1,10).subscribe(
        {
          next:(res)=>{
  
            this.allCategory=res.items;
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
  
  delete()
  {
    
    
    
  }
  checkedValue(x:any)
  {
    console.log(x);
    
    
  }
}
