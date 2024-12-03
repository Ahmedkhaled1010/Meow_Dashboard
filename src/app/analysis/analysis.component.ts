import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';


declare let $:any;
@Component({
  selector: 'app-analysis',
  standalone: true,
  imports: [ReactiveFormsModule,RouterOutlet],
  templateUrl: './analysis.component.html',
  styleUrl: './analysis.component.scss'
})
export class AnalysisComponent {
 
  ngOnInit(): void {
   /*
     $("#productDate").datepicker({
      showAnim: "slideDown",
      dateFormat: "dd-mm-yy",
      showButtonPanel: true
    });
   */
    
  }

  
  productDate:FormGroup=new FormGroup(
    {
      date:new FormControl(null)
    }
  )

}
