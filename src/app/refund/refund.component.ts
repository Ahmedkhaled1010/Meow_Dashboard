import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';



@Component({
  selector: 'app-refund',
  standalone: true,
  imports: [RouterLink,RouterOutlet],
  templateUrl: './refund.component.html',
  styleUrl: './refund.component.scss'
})
export class RefundComponent {

}
