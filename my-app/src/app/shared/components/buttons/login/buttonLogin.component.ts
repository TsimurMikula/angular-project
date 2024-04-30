import { Component, Input} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-button-login',
  standalone: true,
  imports: [MatButtonModule, MatDividerModule, MatIconModule],
  templateUrl: './buttonLogin.component.html',
  styleUrl: './buttonLogin.component.scss'
})
export class ButtonLoginComponent {
  @Input() isActiveButton: boolean = true;
  constructor(){}
}
