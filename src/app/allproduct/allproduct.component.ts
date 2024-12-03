import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DataService } from '../data.service';
import { product, variants } from '../interface';
import { SearchPipe } from '../search.pipe';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-allproduct',
  standalone: true,
  imports: [RouterLink,SearchPipe,FormsModule],
  templateUrl: './allproduct.component.html',
  styleUrl: './allproduct.component.scss'
})
export class AllproductComponent {
  allProduct:product[]=[];
  numPage?:number;
  allVarient:variants[]=[];
  searchWord:string="";
  currentPage:number=1;
  row:number=10;
  duplicate?:product;
  allId:string[]=[];
  baseUrl:string='https://testtarekserver.meow-ksa.com/'

constructor(private _DataService:DataService){

}

 ngOnInit(): void {
  sessionStorage.setItem("currentPage",'dashboard/Products/allproduct')
    this.getAllProduct();
   
  }
  getAllProduct()
  {
    this._DataService.getAllProduct(1,this.row).subscribe({
      next:(res)=>
      {

        this.allProduct=res.items;
        this.getMainImage();
        this.numPage=res.meta.totalPages;
        this.currentPage=res.meta.currentPage;
        console.log(this.allProduct);
        
      this.getProductVarient();
          
        
      },
      error:(err)=>
      {
        console.log(err);
        
      }
    });

    
  }
  getProductVarient()
  {
    for(let i=0;i<this.allProduct.length;i++)
    {
      
      this.allProduct[i].stock=0;
        this._DataService.getProductVarients(this.allProduct[i].id!).subscribe(
          {
            next:(res)=>{
              const data = res as { items: any[] };
              this.allVarient=data.items;
              
              for(let j=0;j<this.allVarient.length;j++)
                {
                if (this.allVarient[j].stock !=undefined) {
                  this.allProduct[i].stock+=Number(this.allVarient[j].stock)

                }

              }
            },
            error:(err)=>
            {
              console.log(err);
              
            }
          }
        )

      }

     
          
          
    
  }
  getMainImage()
  {
    for(let i=0;i<=this.allProduct.length;i++)
      {
        this._DataService.getMainImages(this.allProduct[i]?.id!).subscribe(
          {
            next:(res)=>{
            
              
              this.allProduct[i].image=res.items[0].link
      
              
            }
          }
        )
      }
  }
  nextPage()
  {
    if (this.currentPage !=this.numPage) {
      this._DataService.getAllProduct(this.currentPage+1,this.row).subscribe(
        {
          next:(res)=>{
  
            this.allProduct=res.items;
            this.currentPage+=1;
            this.getMainImage();

    
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
      this._DataService.getAllProduct(this.currentPage-1,this.row).subscribe(
        {
          next:(res)=>{
  
            this.allProduct=res.items;
            this.currentPage-=1;
            this.getMainImage();

    
          },
          error:(err)=>
          {
            console.log(err);
            
          }
        }
       )
    }
  }
  rowPerPage(row:any)
  {
    this.row=row.target.value;
    this._DataService.getAllProduct(1,this.row).subscribe({
      next:(res)=>
      {
        this.allProduct=res.items;
        this.numPage=res.meta.totalPages;
        this.currentPage=res.meta.currentPage;
        this.getMainImage();

        
        
      },
      error:(err)=>
      {
        console.log(err);
        
      }
    })
    
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
    this._DataService.getAllProduct(this.currentPage,this.row).subscribe({
      next:(res)=>
      {
        this.allProduct=res.items;
        this.numPage=res.meta.totalPages;
        this.currentPage=res.meta.currentPage;
        this.getMainImage();


        
        
      },
      error:(err)=>
      {
        console.log(err);
        
      }
    })
  }
  deleteProduct(id:string){
    this._DataService.deleteProduct(id).subscribe(
      {
        next:(res)=>
        {
          console.log(res);
          this.getAllProduct();
          
        },
        error:(err)=>
        {
          console.log(err);
          
        }
      }
    )
  }
  duplicateProduct(id:string)
  {
    console.log(id);
    
    this._DataService.getProductById(id).subscribe(
      {
        next:(res)=>
        {
          this.duplicate=res;
          delete this.duplicate?.updated_at;
          delete this.duplicate?.id;
          delete this.duplicate?.created_at;
          delete this.duplicate?.categories[0].name;
          delete this.duplicate?.categories[0].description;



          console.log( this.duplicate);
          this._DataService.addProduct(this.duplicate!).subscribe(
            {
              next:(res)=>
              {
                console.log(res);
                this.getAllProduct()
                
              }
            }
          )
          
        },
        error:(err)=>
        {
          console.log(err);
          
        }
      }
    )

  }

  change(event:any)
  {
    const isChecked = (event.target as HTMLInputElement).checked;
    if(isChecked)
    {

      this.allId.push(event.target.value);
    }
    event.target.value="";
    console.log(this.allId);
    
  }
  deleteAll()
  {
    for(let i=0;i<=this.allId.length;i++)
      {

        this.deleteProduct(this.allId[i])
      }
  }
}
