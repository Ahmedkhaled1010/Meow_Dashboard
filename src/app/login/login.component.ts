import { user } from './../interface';
import { Component, Inject, inject, PLATFORM_ID } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { log } from 'node:console';

import { ToastrService } from 'ngx-toastr';
//import { user } from '../interface';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,HttpClientModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  logError:string="";
  error:boolean=false;
  userdata:user|undefined
  constructor(private _Router:Router,private _DataService:DataService,@Inject (PLATFORM_ID) private x:object,
private _ToastrService:ToastrService){}
  login:FormGroup=new FormGroup(
    {
      email:new FormControl(null,[Validators.email,Validators.required]),
      password:new FormControl(null,[Validators.required]),
    }
  )

  checkLogin()
  {
   
    
    
      this._DataService.adminLogin(this.login.value).subscribe(
        {
          error:(err)=>{
            console.log(err);
            
            this._ToastrService.error(`${err.error.errorDetails.message}`, 'Error!');

           // this.logError=err.error.errorDetails.message;
          //  this.error=true;

            
          },
          next:(res)=>{
            console.log(res.access_token);

              if (res.access_token != null) {
               
                if (isPlatformBrowser(this.x)) {
                  sessionStorage.setItem("userToken",res.access_token);
                  this._DataService.saveUserData();
                  this._DataService.getUserData().subscribe(
                    {
                      next:(res)=>{
                        const data = res as user; // Replace `any[]` with the actual type if known
                        console.log(res);
                        this.userdata!=res
                        console.log(this.userdata);
                        if (data.role=="admin") {
                          if (data.is_verified==true) {+
                            this._ToastrService.success('Welcome Back', 'Log In Done');

                            this._Router.navigate(["dashboard"]);

                          }
                          else
                          { 
                            this._ToastrService.error('error', 'You are not verified');

                          }

                        }
                        else
                        {
                          this._ToastrService.error('error', 'Your are not have permission to enter this site ');

                        }
                        
                        
                      },
                      error:(err)=>{
                        console.log(err);
                        
                      }
                    }
                  )

                }
                
                
              }            
          }
        }
      )    
    
  }


}
