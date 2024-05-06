import { Component } from '@angular/core';
import { EmailComponent } from '../../shared/components/email/email.component';
import { PasswordComponent } from '../../shared/components/password/password.component';
import { ButtonLoginComponent } from '../../shared/components/buttons/login/buttonLogin.component';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [EmailComponent, PasswordComponent, ButtonLoginComponent, ReactiveFormsModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {
  myForm : FormGroup;
  
  constructor(private router: Router, private readonly api: AuthService){
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
      const user = {
        ...this.myForm.value,
        "token": `${Math.random()}`
      }
      this.api.login(user).subscribe(() => {
        localStorage.setItem("token", user.token);
        this.router.navigate(['board']);
      });
    }  
  }
}
