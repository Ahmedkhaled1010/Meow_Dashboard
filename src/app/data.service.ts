import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { adminLogin, category, color, coupon, Image, imgProduct, product, variants, user } from './interface';
import { BehaviorSubject, Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  userToken:BehaviorSubject<any>=new BehaviorSubject(null);
  addCoupon:BehaviorSubject<any>=new BehaviorSubject(null);
  token:string="";
  baseUrl:string='https://testtarekserver.meow-ksa.com/'
  
  constructor(private _HttpClient:HttpClient,private _Router:Router) { 

    if (sessionStorage.getItem("currentPage")) {
        this._Router.navigate([sessionStorage.getItem("currentPage")])
    }
  }

  adminLogin(user:adminLogin):Observable<any>
  {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json' ,
      'Cache-Control': 'no-cache',
      'Host': 'meow-e-commerce-backend.onrender.com',
      'User-Agent': 'PostmanRuntime/7.41.2',
      'Accept':'*/*',
      'Accept-Encoding' : 'gzip, deflate, br',
      'Connection' : 'keep-alive',
    })
    return this._HttpClient.post(`${this.baseUrl}auth/login`,user);
  }

  saveUserData()
  {
    if (sessionStorage.getItem("userToken") != null) {
        this.userToken.next(sessionStorage.getItem("userToken"));
        this.userToken.next(jwtDecode(this.userToken.getValue()))
        this.token!=sessionStorage.getItem("userToken");
        console.log(this.token);
                
        
      
    }
    else
    {
      this.userToken.next(null)
      this.token="";
    }
  }
  
  getUserData()
  {
    const header = new HttpHeaders().set('Authorization',`Bearer ${sessionStorage.getItem("userToken")}`);
  
      return this._HttpClient.get(`${this.baseUrl}auth/me`,{
        headers:header
      })
  }
  createCategory(data:category):Observable<any>
  {
   
    
    const header = new HttpHeaders().set('Authorization',`Bearer ${sessionStorage.getItem("userToken")}`);
    
    
    return this._HttpClient.post(`${this.baseUrl}categories`,data,{
      headers:header
    })
  }
  getAllCategory(page:number,limit:number):Observable<any>
  {
    const header = new HttpHeaders().set('Authorization',`Bearer ${sessionStorage.getItem("userToken")}`);

    return this._HttpClient.get(`${this.baseUrl}categories?page=${page}&limit=10&orderBy=-name,description`,{
      headers:header
    })
  }
  addCategoryToproduct(id:string,ids :string[]):Observable<any>
  {
    const body ={
       "categoryIds":ids
    }
    const header = new HttpHeaders().set('Authorization',`Bearer ${sessionStorage.getItem("userToken")}`);

    return this._HttpClient.post(`${this.baseUrl}products/${id}/add-categories`,body,{
      headers:header
    })
  }
  getAllUser():Observable<any>
  {
    const header = new HttpHeaders().set('Authorization',`Bearer ${sessionStorage.getItem("userToken")}`);

    return this._HttpClient.get(`${this.baseUrl}users`,{
      headers:header
    })
  }
 
  removeCategory(id:string):Observable<any>
  {
    const header = new HttpHeaders().set('Authorization',`Bearer ${sessionStorage.getItem("userToken")}`);
    return this._HttpClient.delete(`${this.baseUrl}categories/${id}`,{
      headers:header
    })
  }
  addColor(data:color):Observable<any>
  {
    const header = new HttpHeaders().set('Authorization',`Bearer ${sessionStorage.getItem("userToken")}`);
    return this._HttpClient.post(`${this.baseUrl}colors`,data,{
      headers:header
    })

  }
  getAllColor(page:number,limit:number):Observable<any>
  {
    const header = new HttpHeaders().set('Authorization',`Bearer ${sessionStorage.getItem("userToken")}`);

    return this._HttpClient.get(`${this.baseUrl}colors?page=${page}&limit=${limit}`,{
      headers:header
    })
  }
  addProduct(data:product):Observable<any>
  {
    const header = new HttpHeaders().set('Authorization',`Bearer ${sessionStorage.getItem("userToken")}`);
    return this._HttpClient.post(`${this.baseUrl}products`,data,{
      headers:header
    })

  }
  getAllProduct(page:number,limit:number):Observable<any>
  {
    const header = new HttpHeaders().set('Authorization',`Bearer ${sessionStorage.getItem("userToken")}`);
    return  this._HttpClient.get(`${this.baseUrl}products?page=${page}&limit=${limit}`,{
      headers:header
    })
  }
  getProductById(id:string):Observable<any>
  {

    const header = new HttpHeaders().set('Authorization',`Bearer ${sessionStorage.getItem("userToken")}`);
    return this._HttpClient.get(`${this.baseUrl}products/${id}`,{
      headers:header
    })

  }
  deleteProduct(id:string):Observable<any>
  {
    const header = new HttpHeaders().set('Authorization',`Bearer ${sessionStorage.getItem("userToken")}`);

    return this._HttpClient.delete(`${this.baseUrl}products/${id}`,{
      headers:header
    })
  }
  updateProduct(id:string,body:string):Observable<any>
  {

    const header = new HttpHeaders().set('Authorization',`Bearer ${sessionStorage.getItem("userToken")}`);

    return this._HttpClient.patch(`${this.baseUrl}products/${id}`,body,{
      headers:header
    })
  }
  //Varient
  addVarient(data:variants[]):Observable<any>
  {
    const header = new HttpHeaders().set('Authorization',`Bearer ${sessionStorage.getItem("userToken")}`);

      return this._HttpClient.post(`${this.baseUrl}product-variants/many`,data,{
        headers:header
      })
  }
  getProductVarients(id:string)
  {
    const header = new HttpHeaders().set('Authorization',`Bearer ${sessionStorage.getItem("userToken")}`);

      return this._HttpClient.get(`${this.baseUrl}product-variants/?product=${id}`,{
        headers:header
      })
  }
  updateVarient(id:string,stock:number)
  {
    const body={
      "stock":Number(stock)
    }
    const header = new HttpHeaders().set('Authorization',`Bearer ${sessionStorage.getItem("userToken")}`);

      return this._HttpClient.patch(`${this.baseUrl}product-variants/${id}`,body,{
        headers:header
      })
  }
    /*
     "email":"ahmed.tarek1244@gmail.com",
    "password":"Aa123456789@"
  */

  createCoupon(coupon:coupon):Observable<any>
  {
    const header = new HttpHeaders().set('Authorization',`Bearer ${sessionStorage.getItem("userToken")}`);

    return this._HttpClient.post(`${this.baseUrl}coupons`,coupon,{
      headers:header
    })
  }
  getAllCoupons():Observable<any>
  {
    const header = new HttpHeaders().set('Authorization',`Bearer ${sessionStorage.getItem("userToken")}`);

    return this._HttpClient.get(`${this.baseUrl}coupons`,{
      headers:header
    })
  }
  deleteCoupon(id:string):Observable<any>
  {

    const header = new HttpHeaders().set('Authorization',`Bearer ${sessionStorage.getItem("userToken")}`);

    return this._HttpClient.delete(`${this.baseUrl}coupons/${id}`,{
      headers:header
    })
  }
  addUser(user:user):Observable<any>
  {
    const header = new HttpHeaders().set('Authorization',`Bearer ${sessionStorage.getItem("userToken")}`);

    return this._HttpClient.post(`${this.baseUrl}auth/signup`,user,{
      headers:header
    })
  }
  deleteUser(id:string):Observable<any>
  {
    const header = new HttpHeaders().set('Authorization',`Bearer ${sessionStorage.getItem("userToken")}`);

    return this._HttpClient.delete(`${this.baseUrl}users/${id}`,{
      headers:header
    })
  }
  /////////////////////ORDER
  getAllOrder():Observable<any>
  {
    const header = new HttpHeaders().set('Authorization',`Bearer ${sessionStorage.getItem("userToken")}`);

   return this._HttpClient.get(`${this.baseUrl}orders`,{
    headers:header
   })
  }
  getSpecificOrder(id:string):Observable<any>
  {
    const header = new HttpHeaders().set('Authorization',`Bearer ${sessionStorage.getItem("userToken")}`);

   return this._HttpClient.get(`${this.baseUrl}orders/${id}`,{
    headers:header
   })
  }
  updateOrder(id:string,status:string):Observable<any>
  {
    const body ={
      "status":status
    }
    const header = new HttpHeaders().set('Authorization',`Bearer ${sessionStorage.getItem("userToken")}`);

    return this._HttpClient.patch(`${this.baseUrl}orders/${id}`,body,{
     headers:header
     
    })
  }
  //Images
  addPhoto(data:FormData):Observable<any>
  {
   
    const header = new HttpHeaders().set('Authorization',`Bearer ${sessionStorage.getItem("userToken")}`);

  return  this._HttpClient.post(`${this.baseUrl}photos`,data,{
    headers:header
  })
  }
  assignMainPhoto(data:FormData):Observable<any>
  {
   
    const header = new HttpHeaders().set('Authorization',`Bearer ${sessionStorage.getItem("userToken")}`);

  return  this._HttpClient.post(`${this.baseUrl}photos/main`,data,{
    headers:header
  })
  }
  getMainImages(id:string):Observable<any>
  {
    return this._HttpClient.get(`${this.baseUrl}photos?product=${id}&is_main=true`)
  }
  getAllImage(page:number,limit:number):Observable<any>
  {
    return this._HttpClient.get(`${this.baseUrl}photos/?page=${page}&limit=${limit}`)
  }
  deleteIamge(id:string):Observable<any>
  {
    const header = new HttpHeaders().set('Authorization',`Bearer ${sessionStorage.getItem("userToken")}`);

    return this._HttpClient.delete(`${this.baseUrl}photos/${id}`,{
      headers:header
     })
  }
  getImageProduct(id:string)
  {
    const header = new HttpHeaders().set('Authorization',`Bearer ${sessionStorage.getItem("userToken")}`);

    return this._HttpClient.get(`${this.baseUrl}photos?is_main=false&product=${id}`,{
      headers:header
     })
  }
  //Analysis
  getProductAnalysis():Observable<any>
  {
    return this._HttpClient.get(`${this.baseUrl}analytics/product-analytics`)
  }
  getCategoryAnalysis():Observable<any>
  {
    return this._HttpClient.get(`${this.baseUrl}analytics/category-analytics`)
  }
  getRevenueAnalysis():Observable<any>
  {
    return this._HttpClient.get(`${this.baseUrl}analytics/revenue-analytics`)
  }
  getVariationAnalysis():Observable<any>
  {
    return this._HttpClient.get(`${this.baseUrl}analytics/variation-analytics`)
  }
}
