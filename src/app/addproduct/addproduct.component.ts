import { Component } from '@angular/core';

import { RouterLink, RouterOutlet } from '@angular/router';

declare let $:any;

@Component({
  selector: 'app-addproduct',
  standalone: true,
  imports: [RouterOutlet,RouterLink],
  templateUrl: './addproduct.component.html',
  styleUrl: './addproduct.component.scss'
})
export class AddproductComponent {

  constructor(){

  }
  ngOnInit(): void {
    sessionStorage.setItem("currentPage",'dashboard/Products/allproduct')

    
  }
  
}
