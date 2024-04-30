import { Component, Input} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-button-logout',
  standalone: true,
  imports: [MatButtonModule, MatDividerModule, MatIconModule],
  templateUrl: './buttonLogout.component.html',
  styleUrl: './buttonLogout.component.scss'
})
export class ButtonLogoutComponent {
  constructor(private router: Router){}

  onLogout() {
    this.router.navigate(['']); 
  }
}
