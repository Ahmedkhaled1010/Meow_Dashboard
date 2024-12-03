export interface adminLogin {

    email:string,
    password:string,

}
export interface category
{
    name?:string,
    description?:string,
    id?:string,
}
export interface user
{
    id?:string,
    username:string,
    email:string,
    role?:string,
    phone:string,
    password:string,
    is_verified:boolean
    
}
export interface imgProduct
{
    link:string,
    id:string
}
export interface color
{
    code:string,
    color:string,
    id?:string
}
export interface product 
{
    name:string,
    description:string,
    price:string,
    after_discount_price:string,
    short_description:string,
    categories:category[],
    updated_at?:string,
    created_at?:string,
    id?:string,
    image?:string,
    stock:number
}
export interface variants
{
    id?:string,
    product?:string,
    stock:number,
    color?:string,
    size:string
}
export interface coupon
{
    name:string,
    type:string,
    usageLimit:number,
    amount:number,
    expiryDate:string,
    id?:string
}
export interface Image 
{
    id:string,
    link:string,
    is_main:boolean,
    created_at:string,
    product:product,

}
export interface order
{
    id: string;
  orderNo: number;
  status: string;
  total_price: string;
  beforeDiscount: string;
  discount: string;
  tax: string;
  deliveryService: string;
  address: string;
  postalCode: string;
  city: string;
  zone: string;
  location: string;
  phoneNumber: string;
  user:user;
  order_items:[
    {
        id:string;
        quantity:number,
        price:number
      }
  ]
  created_at: string;
  updated_at: string;
}
export interface ProductAnalysis
{
    "product id" :string,
    "product name":string,
    "total revenue":string,
    "stock":string,

}
export interface CategoryAnalysis
{
    category_id: string,
        category_name: string,
    stock: string,
        sold: string
}
export interface RevenueAnalysis
{
    coupon_count:string,
    "total sales": string,
    taxs: string
}
export interface variationAnalysis
{
    "product id": string,
        "product name": string,
        "not sold": string,
        sold: string,
        total: string
}
