import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { DataService } from '../data.service';

declare let $:any;


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink,RouterLinkActive,RouterOutlet],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  analysisMenu:boolean=false;
  productMenu:boolean=false;
  navMenu:boolean=false;

constructor(private _DataService:DataService,private _Router:Router){}
  ngOnInit(): void {
    sessionStorage.setItem("currentPage",'dashboard')

    $(".showAnalysis").click(
      ()=>
      {
        if (this.analysisMenu==false) {
          this.analysisMenu=true;
          $(".menuAnalysis").slideDown(1000)
        }
        else if (this.analysisMenu==true) {
          this.analysisMenu=false;
          $(".menuAnalysis").slideUp(1000)
        }
      }
    )
    $(".analysisSelected").click(
      ()=>{
        this.analysisMenu=false;
        $(".menuAnalysis").slideUp(1000)

      }
    )

    $(".showProducts").click(
      ()=>
        {
          if (this.navMenu==false) {
            this.navMenu=true;
            $(".menuProducts").slideDown(1000)
          }
          else if (this.navMenu==true) {
            this.navMenu=false;
            $(".menuProducts").slideUp(1000)
          }
        }
    )
    $(".productSelected").click(
      ()=>{
        this.navMenu=false;
        $(".menuProducts").slideUp(1000)

      }
    )
    $("#showNav").click( ()=> {

      if ($("#nav").css('right')=='-250px') {
        
        $("#nav").animate({right:'0px'},1000)
      }
      else if ($("#nav").css('right')=='0px') {
        
        $("#nav").animate({right:'-250px'},1000)
      }
     // $("#nav").toggle(1000)
        
      
    })
    
  }
  logOut()
  {
    
    localStorage.removeItem("userToken");
    this._DataService.saveUserData();
    this._Router.navigate(['/login']);
  }

}
