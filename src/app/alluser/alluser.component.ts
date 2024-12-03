import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DataService } from '../data.service';
import { user } from '../interface';


@Component({
  selector: 'app-alluser',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './alluser.component.html',
  styleUrl: './alluser.component.scss'
})
export class AlluserComponent {
  allUser:user[]=[];
  numPage?:number;
  currentPage:number=1;
  itemPerPage:number=10;
  constructor(private _DataService:DataService){}
  ngOnInit(): void {
    sessionStorage.setItem("currentPage",'dashboard/user/alluser')
this.getAllUser()
   
  }
  getAllUser()
  {
    this._DataService.getAllUser().subscribe(
      {
        next:(res)=>
        {
          
          this.allUser=res.items;
          this.numPage=res.meta.totalPages;
          this.currentPage=res.meta.currentPage;

          console.log(this.allUser);
          
        },
        error:(err)=>
        {
          console.log(err );
          
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
  
            this.allUser=res.items;
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
  
            this.allUser=res.items;
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
  deleteUser(id:string)
  {
    this._DataService.deleteUser(id).subscribe(
      {
        next:(res)=>
        {
          console.log(res);
          this.getAllUser()
          
        },
        error:(err)=>
        {
          console.log(err);
          
        }
      }
    )
  }
}
