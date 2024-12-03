import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DataService } from '../data.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { category, imgProduct, product } from '../interface';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-description',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink,FormsModule,CommonModule],
  templateUrl: './add-description.component.html',
  styleUrl: './add-description.component.scss'
})
export class AddDescriptionComponent {
  selectedFiles:File[]=[];
  category:category[]=[];
  newCategory:category[]=[];
  isNew:boolean=false;
  selctedCategory:string[]=[];
  selected:string="";
  baseUrl:string='https://meow-e-commerce-backend.onrender.com';
  imageSelcted:imgProduct[]=[];
  errors:string[]=[];
  new:boolean=true;
  productId:string="";
  product?:product;
  updateData?:any;
  toaster:string=""
  NewCategory:FormGroup =new FormGroup(
    {
      name:new FormControl(null),
      description:new FormControl(null)
    }
  )
  newProduct:FormGroup=new FormGroup(
    {
      name:new FormControl(null,[Validators.required]),
      description:new FormControl(null,[Validators.required]),
      short_description:new FormControl(null,[Validators.required]),
      price:new FormControl(null,[Validators.required]),
      after_discount_price:new FormControl(null,[Validators.required]),
      categories:new FormControl(null,[Validators.required]),
    }
  )
  constructor(private _DataService:DataService,private _Router:Router,private _ToastrService:ToastrService,
    private _ActivatedRoute:ActivatedRoute
  )
  {}
  ngOnInit(): void {
  //  sessionStorage.setItem("currentPage",'dashboard/Products/allproduct/addproduct/addDescription')
    this._ActivatedRoute.params.subscribe(
      
        (res)=>{
          this.productId=res["id"];
          if (this.productId==undefined) {
            this.new=true;
            console.log(this.new);
            console.log(this.productId);
            
            

          }
          else if (this.productId!="")
          {
            this.getProduct()
            this.new=false;
            console.log(this.new);
            console.log(this.productId);

          }
          console.log(this.productId);
        }
      
    )
    this._DataService.getAllCategory(1,100).subscribe({
      next:(res)=>{
        
        this.category=res.items;
        
      },
      error:(err)=>
      {
        console.log(err);
        
      }
      
    })
   
    
  }
  /*
    onFileSelected(event: any): void {
    if (event.target.files.length > 0) {
      this.selectedFiles = Array.from(event.target.files);
    }
    this.uploadFiles();
  }

  uploadFiles(): void {
    const formData = new FormData();
    this.selectedFiles.forEach((file) => {
      formData.append('photos',  file);
    });
    formData.append('productId',"0610609d-f71a-45f9-82a4-800bfe4510cc")
    console.log(formData.getAll('photos'));
   

    this._DataService.addPhoto(formData).subscribe(
      {
        next:(res)=>{
          console.log(res.link);
          this.imageSelcted=res;
          console.log(this.imageSelcted);
          
          
        },
        error:(err)=>
        {
          console.log(err);
          
        }
      }
    )
  }
  */
  getProduct()
  {
    this._DataService.getProductById(this.productId).subscribe({
      next:(res)=>{
        console.log(res);
          this.product=res;
          this.newCategory=res.categories
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }
  addproduct()
  {
    this.newProduct.get("categories")?.setValue(this.selctedCategory);
    this.newProduct.get("price")?.setValue(Number(this.newProduct.get("price")?.value));
    this.newProduct.get("after_discount_price")?.setValue(Number(this.newProduct.get("after_discount_price")?.value));
    console.log(this.newProduct.value);
    
    this._DataService.addProduct(this.newProduct.value).subscribe(
      {
        next:(res)=>
        {
          console.log(res);
          this._ToastrService.success('The Product Has Added', 'Successfully');

          this._Router.navigate(['/dashboard/Products/allproduct'])
        },
        error:(err)=>
        {
          this._ToastrService.error(err.error.errorDetails, 'Error When Add Product');

          if (this.selctedCategory.length==0) {
            this._ToastrService.info("Please Click add Category ","Category Not Added")
          }
                  
          
        }
      }
    )
    
    
  }
  updateProduct(type:string)
  {
    if (type=="name") {
      this.toaster="name";
      this.updateData=
      {
        "name":this.newProduct.get("name")?.value
      }
      
    }
    else if (type=="short_description") {
      this.toaster="Short Description";

      this.updateData=
      { 
        "short_description":this.newProduct.get("short_description")?.value
      }
    }
    else if (type=="description") {
      this.toaster="Description"
      this.updateData=
      {
        "description":this.newProduct.get("description")?.value
      }
    }
    else if (type=="price") {
      this.toaster="Base Pricing"
      this.updateData=
      {
        "price":Number(this.newProduct.get("price")?.value)
      }
    }
    else if (type=="after_discount_price") {
      this.toaster="Sale Pricing"
      this.updateData=
      {
        "after_discount_price":Number(this.newProduct.get("after_discount_price")?.value)
      }
    }
      console.log(this.updateData);
      
    this._DataService.updateProduct(this.productId,this.updateData).subscribe(
      {
        next:(res)=>{
          console.log(res);
          this.getProduct();
          this._ToastrService.success(`The ${this.toaster}  Has Updated`, 'Successfully');

        },
        error:(err)=>{
          console.log(err);
          
        }
      }
    )

  }
  addNewCategory()
  {
    this.isNew=true;
  }
  addCategory()
  {
    this.NewCategory.get("description")?.setValue("")

    this._DataService.createCategory(this.NewCategory.value).subscribe(
      {
        next:(res)=>
        {
          console.log(res);
          this.newCategory.push(res);
          this.selctedCategory.push(res.id)
          this.NewCategory.get("name")?.setValue("")

          
        },
        error:(err)=>
        {
          console.log(err);
         
        }
      }
    )
    
  }
  change(e:any)
  {
      this.selected=e.target.value;    
      console.log(this.selected);

      
  }
  addAllCategory()
  {
    if (this.selected !="") {
      this.selctedCategory.push(this.selected);
      
    }
   
  }
  deleteCategory(id:string)
  {
    this.newCategory =this.newCategory.filter(item=>item.id!=id);
    this._DataService.removeCategory(id).subscribe(
      {
        next:(res)=>{
          console.log(res);
          
        },
        error:(err)=>
        {
          console.log(err);
          
        }
      }
    )
    console.log(this.newCategory);
    
  }
  updateCategory()
  {
    if (this.selected !="") {
      this.selctedCategory.push(this.selected);
      
    }
    console.log(this.selctedCategory);
    
    this._DataService.addCategoryToproduct(this.productId,this.selctedCategory).subscribe(
      {
        next:(res)=>{
          console.log(res);
          this._ToastrService.success(`The Category Has Updated`, 'Successfully');

          this.getProduct()
        },
        error:(err)=>{
          console.log(err);
          
        }
      }
    )
  }
}
