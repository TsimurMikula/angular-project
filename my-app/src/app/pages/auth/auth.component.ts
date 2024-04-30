import { Component } from '@angular/core';
import { EmailComponent } from '../../shared/components/email/email.component';
import { PasswordComponent } from '../../shared/components/password/password.component';
import { ButtonLoginComponent } from '../../shared/components/buttons/login/buttonLogin.component';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [EmailComponent, PasswordComponent, ButtonLoginComponent, ReactiveFormsModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {
  myForm : FormGroup;
  title = "Добро пожаловать";
  description = "Для получения доступа введите данные!";
  
  constructor(private router: Router){
      this.myForm = new FormGroup({
          "email": new FormControl("", [
                              Validators.required, 
                              Validators.email 
                          ]),
          "password": new FormControl("", Validators.pattern("[0-9]{4}")) 
      });
  }

  onLogin(isActiveButton: boolean){
    if(isActiveButton) {
      this.router.navigate(['board']);

    }  
  }
}
