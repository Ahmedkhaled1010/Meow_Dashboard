import { Component } from '@angular/core';
import {MatSlideToggleModule} from '@angular/material/slide-toggle'


@Component({
  selector: 'app-setting',
  standalone: true,
  imports: [MatSlideToggleModule],
  templateUrl: './setting.component.html',
  styleUrl: './setting.component.scss'
})
export class SettingComponent {

}
