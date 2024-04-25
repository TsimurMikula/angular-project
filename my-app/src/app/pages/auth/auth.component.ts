import { Component } from '@angular/core';
import { EmailComponent } from '../../shared/components/email/email.component';
import { PasswordComponent } from '../../shared/components/password/password.component';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [EmailComponent, PasswordComponent, ButtonComponent, ReactiveFormsModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {
  myForm : FormGroup;
  
  constructor(){
      this.myForm = new FormGroup({
          "email": new FormControl("", [
                              Validators.required, 
                              Validators.email 
                          ]),
          "password": new FormControl("", Validators.pattern("[0-9]{4}")) 
      });
  }
}
