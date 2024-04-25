import { Component, Input, forwardRef} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {FormControl, FormsModule, ReactiveFormsModule, ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {merge} from 'rxjs';

@Component({
  selector: 'app-email',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule],
  providers: [{ 
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => EmailComponent),
    multi: true
   }],
  templateUrl: './email.component.html',
  styleUrl: './email.component.scss'
})

export class EmailComponent implements ControlValueAccessor {
  @Input() email = new FormControl();
  errorMessage = '';

  constructor() {
    merge(this.email.statusChanges, this.email.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
  }

  writeValue(value: any) {}
  registerOnChange(fn: any): void {}
  registerOnTouched(fn: any): void {}

  updateErrorMessage() {
    if (this.email.hasError('required')) {
      this.errorMessage = 'Введите почту';
    } else if (this.email.hasError('email')) {
      this.errorMessage = 'Не правильная почта';
    } else {
      this.errorMessage = '';
    }
  }
}
