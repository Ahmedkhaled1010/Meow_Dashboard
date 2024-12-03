import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DataService } from '../data.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adduser',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './adduser.component.html',
  styleUrl: './adduser.component.scss'
})
export class AdduserComponent {

  newUser:FormGroup=new FormGroup(
    {
      username:new FormControl(null),
      email:new FormControl(null),
      password:new FormControl(null),
      
      phone:new FormControl(null),
      
      
    }
  )
  constructor(private _DataService:DataService,private _ToastrService:ToastrService,private _Router:Router){}
  ngOnInit(): void {
    sessionStorage.setItem("currentPage",'dashboard/user/alluser/adduser')
  }
  addUser()
  {
   // this.newUser.get('phone')?.setValue('+966'+this.newUser.get('phone')?.value);
    console.log(this.newUser.value);
    this._DataService.addUser(this.newUser.value).subscribe({
      next:(res)=>{
        console.log(res);
        this._ToastrService.success('Success','Add New User');
        this._Router.navigate(['dashboard/user/alluser'])
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
    
  }

}
