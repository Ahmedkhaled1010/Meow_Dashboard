import { Component } from '@angular/core';

@Component({
  selector: 'app-basket',
  standalone: true,
  imports: [],
  templateUrl: './basket.component.html',
  styleUrl: './basket.component.scss'
})
export class BasketComponent {
  ngOnInit(): void {
    
    sessionStorage.setItem("currentPage",'dashboard/Marketing/basket')
  }
}
