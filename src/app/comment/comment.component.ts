import { Component } from '@angular/core';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss'
})
export class CommentComponent {
  ngOnInit(): void {
    
    sessionStorage.setItem("currentPage",'dashboard/Comments')
  }
}
