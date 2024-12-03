import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-allrefund',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './allrefund.component.html',
  styleUrl: './allrefund.component.scss'
})
export class AllrefundComponent {
  ngOnInit(): void {
    sessionStorage.setItem("currentPage",'dashboard/Refund/allrefund')
    }
}
