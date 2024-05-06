import { Component, Input} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-button-logout',
  standalone: true,
  imports: [MatButtonModule, MatDividerModule, MatIconModule],
  templateUrl: './buttonLogout.component.html',
  styleUrl: './buttonLogout.component.scss'
})
export class ButtonLogoutComponent {
  constructor(private router: Router, private readonly api: AuthService){}

  onLogout() {
    const user = {
      "email": "",
      "password": "",
      "token": ""
    }
    this.api.login(user).subscribe(() => {
      localStorage.setItem("token", "");
      this.router.navigate(['']); 
    });
  }
}
