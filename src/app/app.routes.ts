import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AnalysisComponent } from './analysis/analysis.component';
import { OrderComponent } from './order/order.component';
import { MediaComponent } from './media/media.component';
import { ProductComponent } from './product/product.component';
import { PaymentComponent } from './payment/payment.component';
import { MarketingComponent } from './marketing/marketing.component';
import { CommentComponent } from './comment/comment.component';
import { RefundComponent } from './refund/refund.component';
import { UserComponent } from './user/user.component';
import { SettingComponent } from './setting/setting.component';
import { AllOrderComponent } from './all-order/all-order.component';
import { DetailsOrderComponent } from './details-order/details-order.component';
import { RevenueComponent } from './revenue/revenue.component';
import { VariationComponent } from './variation/variation.component';
import { CategoriesComponent } from './categories/categories.component';
import { CuponComponent } from './cupon/cupon.component';
import { BasketComponent } from './basket/basket.component';
import { RefunddetailsComponent } from './refunddetails/refunddetails.component';
import { AllrefundComponent } from './allrefund/allrefund.component';
import { AlluserComponent } from './alluser/alluser.component';
import { AdduserComponent } from './adduser/adduser.component';
import { ProductsComponent } from './products/products.component';
import { AllproductComponent } from './allproduct/allproduct.component';
import { AddproductComponent } from './addproduct/addproduct.component';
import { CategoryComponent } from './category/category.component';
import { authguardGuard } from './authguard.guard';
import { AddDescriptionComponent } from './add-description/add-description.component';
import { AddVaritionComponent } from './add-varition/add-varition.component';
import { AddColorComponent } from './add-color/add-color.component';

export const routes: Routes = [
    {path:"",redirectTo:"login",pathMatch:"full"},
    {path:"login",component:LoginComponent},
    {path:"dashboard",component:DashboardComponent,canActivate:[authguardGuard],children:[
        {path:"",redirectTo:"analysis",pathMatch:"full"},
        {
            path:"analysis",component:AnalysisComponent,canActivate:[authguardGuard],children:[
                {path:"",redirectTo:"product",pathMatch:"full"},
                {path:"product",component:ProductComponent,canActivate:[authguardGuard]},
                {path:"revenue",component:RevenueComponent,canActivate:[authguardGuard]},
                {path:"variation",component:VariationComponent,canActivate:[authguardGuard]},
                {path:"catrgories",component:CategoriesComponent,canActivate:[authguardGuard]}
            ]
        },
        {
            path:"Orders",component:OrderComponent,canActivate:[authguardGuard],children:[
                {path:"",redirectTo:"allorder",pathMatch:"full"},
                {
                    path:"allorder",component:AllOrderComponent,canActivate:[authguardGuard]
                },
                {
                    path:"allorder/detailsorder/:id",component:DetailsOrderComponent,canActivate:[authguardGuard]
                }
            ]
        },
        {
            path:"Media",component:MediaComponent,canActivate:[authguardGuard]
        },
        {path:"Products",component:ProductsComponent,canActivate:[authguardGuard],
            children:[
                {
                    path:"",redirectTo:"allproduct",pathMatch:"full"
                },
                {
                    path:"allproduct",component:AllproductComponent,canActivate:[authguardGuard]
                },
                {
                    path:"allproduct/addVarition/:id",component:AddVaritionComponent,canActivate:[authguardGuard]
                },
                {
                    path:"category",component:CategoryComponent,canActivate:[authguardGuard]
                },
                {
                    path:"color",component:AddColorComponent,canActivate:[authguardGuard]
                },
                {
                    path:"allproduct/addproduct",component:AddproductComponent,canActivate:[authguardGuard],children:
                    [   {
                        path:"",redirectTo:"addDescription",pathMatch:"full"
                    },
                        {
                            path:"addDescription",component:AddDescriptionComponent,canActivate:[authguardGuard]
                        },
                        {
                            path:"addDescription/:id",component:AddDescriptionComponent,canActivate:[authguardGuard]
                        },
                        
                    ]
                }
            ]
        },
        {path:"Payment",component:PaymentComponent,canActivate:[authguardGuard]},
        {path:"Marketing",component:MarketingComponent,canActivate:[authguardGuard],children:[
            {
                path:"",redirectTo:"cupon",pathMatch:"full"
            },
            {
                path:"cupon",component:CuponComponent,canActivate:[authguardGuard]
            },
            {
                path:"basket",component:BasketComponent,canActivate:[authguardGuard]
            }
        ]},
        {path:"Comments",component:CommentComponent,canActivate:[authguardGuard]},
        {path:"Refund",component:RefundComponent,canActivate:[authguardGuard],children:[
            {path:"",redirectTo:"allrefund",pathMatch:"full"},
            {path:"allrefund",component:AllrefundComponent,canActivate:[authguardGuard]},
            {path:"allrefund/refundDetails",component:RefunddetailsComponent,canActivate:[authguardGuard]}

        ]},
        {path:"user",component:UserComponent,canActivate:[authguardGuard],children:[
            {
                path:"",redirectTo:"alluser",pathMatch:"full"
            },
            {
                path:"alluser",component:AlluserComponent,canActivate:[authguardGuard]
            },
            {
                path:"alluser/adduser",component:AdduserComponent,canActivate:[authguardGuard]
            }
        ]},
        {path:"settings",component:SettingComponent,canActivate:[authguardGuard]},
    ]},
];
