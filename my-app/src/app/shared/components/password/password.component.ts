import { Component, Input, forwardRef} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {FormControl, FormsModule, ReactiveFormsModule, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import {merge} from 'rxjs';


@Component({
  selector: 'app-password',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, FormsModule, ReactiveFormsModule],
  providers: [{ 
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => PasswordComponent),
    multi: true
   }],
  templateUrl: './password.component.html',
  styleUrl: './password.component.scss'
})

export class PasswordComponent implements ControlValueAccessor {
  @Input() password = new FormControl();
  hide = true;
  errorMessage = '';

  constructor() {
    merge(this.password.statusChanges, this.password.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
  }


  writeValue(value: any) {}
  registerOnChange(fn: any): void {}
  registerOnTouched(fn: any): void {}

  updateErrorMessage() {
    if (this.password.hasError('required')) {
      this.errorMessage = 'Введите пароль (4 цифры)';
    } else if (this.password.hasError('pattern')) {
      this.errorMessage = 'Не правильный пароль';
    } else {
      this.errorMessage = '';
    }
  }
}
