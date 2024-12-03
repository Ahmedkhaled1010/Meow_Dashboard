import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DataService } from '../data.service';
import { color, Image, imgProduct, variants } from '../interface';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-add-varition',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule,CommonModule],
  templateUrl: './add-varition.component.html',
  styleUrl: './add-varition.component.scss'
})
export class AddVaritionComponent {
  ismain:boolean=false;
  variant?:variants;
  baseUrl:string='https://testtarekserver.meow-ksa.com';
  imageSelcted:imgProduct[]=[];
  selectedFiles:File[]=[];
  selectedMainFiles?:imgProduct;
  result:any;
  selectedColor: string = '#000000';
  hexColor: string = '#000000'; 
  sizes:variants[] = [
    { size: 'XS', stock: 0 },
    { size: 'S', stock: 0 },
    { size: 'M', stock: 0 },
    { size: 'L', stock: 0 },
    { size: 'XL', stock: 0 },
    { size: 'XXL', stock: 0 }
  ];
  updateSize:variants[]=[]
  updatenewSize:string="";
  updateIdSize:string="";
  updateStockSize:number=0;
  selectedSizes: boolean[] = new Array(this.sizes.length).fill(false); 
  selectedSize:string |null=null;
  quantity:number=0;
  productId:string="";
  allColor:color[]=[]
  colorId:string="";
  formDataDisplay: File[] =[];
  varient:variants[]=[]
  updateVariants:variants[]=[]
  stock:boolean=true;
  new:boolean=true;
  checkUpdate:boolean=false;
  //photos:Image ={photos:"",productId:""};

  colorDetails:FormGroup=new FormGroup({
    color:new FormControl(null,[Validators.required]),
    code:new FormControl(null,[Validators.required])
  })
  constructor(private _DataService:DataService,private _ActivatedRoute:ActivatedRoute,private _Router:Router,private _ToastrService:ToastrService){

  }
  ngOnInit(): void {

    this._ActivatedRoute.params.subscribe(
      (res)=>{
        this.productId=res["id"];
        console.log(this.productId);
        
      }
    );
    this.getAllColor();
    this.getProductVarient();
    this._DataService.getImageProduct(this.productId).subscribe(
      {
       next:(res)=>
       {
         
           const data = res as { items: any[] }; // Replace `any[]` with the actual type if known

         this.imageSelcted=data.items

         
         
        
       },
       error:(err)=>

         {
           console.log(err);
           
         }

      }
       
     )
     this._DataService.getMainImages(this.productId).subscribe(
      {
       next:(res)=>
       {
        //
        const data = res as { items: any[] }; // Replace `any[]` with the actual type if known

         
        this.selectedMainFiles=data.items[0];
        if (this.selectedMainFiles?.link!=null) {
          this.ismain=true;
        }

         
         
        
       },
       error:(err)=>

         {
           console.log(err);
           
         }

      }
       
     )
    
  }
  getProductVarient()
  {
    this._DataService.getProductVarients(this.productId).subscribe(
      {
        next:(res)=>{
          const data = res as { items: any[] }; // Replace `any[]` with the actual type if known

          console.log(res);
          this.varient=data.items;
          if (data.items.length>0) {
            this.new=false
          }
         this.updateSize=this.varient;
         console.log(this.updateSize);
         
          
        },
        error:(err)=>
        {
          console.log(err);
          
        }
      }
    )
  }
 
  onFileSelected(event: any): void {
    if (event.target.files.length > 0) {
      this.selectedFiles = Array.from(event.target.files);
      
    }
    this.uploadFiles();
  }
  onFileMainSelected(event: any): void {
   console.log(event.target.files[0]);
   
      const formData = new FormData();
      formData.append('photo',event.target.files[0])
      formData.append('productId',this.productId);
this._DataService.assignMainPhoto(formData).subscribe(
  {
    next:(res)=>
    {
      console.log(res);
      this.selectedMainFiles=res;
      this.ismain=true;
      this._ToastrService.success("Done","Assign Main Image to Product")

      
    },
    error:(err)=>
    {
      console.log(err);
      
    }
  }
)
    
   // this.uploadFiles();
  }

  uploadFiles(): void {

    const formData = new FormData();
    this.selectedFiles.forEach((file) => {
      console.log(file.name);
      formData.append('photos',file)
        this.formDataDisplay.push(file)

    });

    
    
    formData.append('productId',this.productId);

   

 
      this._DataService.addPhoto(formData).subscribe(
      {
        next:(res)=>{
          
          this.imageSelcted.push(...res)
          this._ToastrService.success("Done","add Image to Product")
          
        },
        error:(err)=>
        {
          console.log(err);
          this._ToastrService.success("Error","Please Try Again")

        }
      }
    )  
 
  }
  deleteImage(id:string,main:boolean)

  {
    console.log(id);
    
    this._DataService.deleteIamge(id).subscribe(
      {
        next:(res)=>
        {
          this._DataService.getImageProduct(this.productId).subscribe(
           {
            next:(res)=>
            {
              if (main ==false) {
                const data = res as { items: any[] }; // Replace `any[]` with the actual type if known

              this.imageSelcted=data.items

              }
              else if (main==true)
              {
                this.ismain=false
              }
              this._ToastrService.success("Done","delete Image from Product")

            },
            error:(err)=>

              {
                console.log(err);
                
              }

           }
            
          )
          
        },
        error:(err)=>{
          console.log(err);
          
        }
      }
    )
  }
  
  updateHexColor(event: any) {
    this.hexColor = event.target.value;
  }
  selectSize(size: number): void {
    this.selectedSizes[size] = true;
  }
  addColor()
  {
    this.colorDetails.get("code")?.setValue(this.hexColor)
    this._DataService.addColor(this.colorDetails.value).subscribe(
      {
        next:(res)=>
        {
          console.log(res);
          
        },
        error:(err)=>
        {
          console.log(err);
          
        }
      }
    )    
  }
  getAllColor()
  {
    this._DataService.getAllColor(1,100).subscribe(
      {
        next:(res)=>
        {
          console.log(res);
          this.allColor=res.items;

          
          
        },
        error:(err)=>
        {
          console.log(err);
          
        }
      }
    )
  }
  changeColor(color:any)
  {
    console.log(color.target.value);
    this.colorId=color.target.value;
  }
  allSize()
  {
    
    this.sizes.forEach(size => {
      
      size.product = this.productId; 
      // إضافة الخاصية الجديدة
    });
   


 
   this._DataService.addVarient(this.sizes).subscribe({
    next:(res)=>{
      console.log(res);
      this._ToastrService.success("Done","add Varient to Product")

      this._Router.navigate(['/dashboard/Products/allproduct'])
      
    },
    error:(err)=>
    {
      this._ToastrService.error(err.error.errordetails,"Error")

      console.log(err);
      
    }
  })  
   
 

  }
  /**
   updateSize(event:any)
  {
  
    this.variant?.id!=event.target.id;
    this.variant?.stock!=event.target.value
    console.log(event.target.value);
    console.log(event.target.id);
    
    this.updateVariants.push(this.variant!)
    console.log(this.updateVariants);
    
  }
   */
  changeSize(event:any)
  {
   
    
    this.updatenewSize=event.target.value.split(",",2)[0];
    this.updateIdSize=event.target.value.split(",",2)[1];
    
    
    
  }
  update()
  {
    console.log(this.updateIdSize);
    console.log(this.updateStockSize);
    console.log(this.updatenewSize);
    this._DataService.updateVarient(this.updateIdSize,this.updateStockSize).subscribe(
      {
        next:(res)=>{
          console.log(res);
          this.checkUpdate=true;
          this._ToastrService.success("Done",` Varient has Updated
             Size:${this.updatenewSize} Stock:${this.updateStockSize}`)

        },
        error:(err)=>{
          console.log(err);
          
        }
      }
    )
    
    
  }
  finish()
  {
    this._Router.navigate(['/dashboard/Products/allproduct'])
    if (this.checkUpdate==true) {
      this._ToastrService.success("Done"," Varient has Updated")

    }
    else
    {
      this._ToastrService.info("INFO"," Varient has not Changed")

    }
  }
}