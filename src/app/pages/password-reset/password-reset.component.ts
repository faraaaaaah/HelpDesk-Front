import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PasswordResetService } from '../../password-reset.service';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrl: './password-reset.component.css'
})
export class PasswordResetComponent {
  passwordResetForm: FormGroup;

  constructor(private router: Router,private fb: FormBuilder,
    private passwordResetService: PasswordResetService) {this.passwordResetForm = this.fb.group({
      email: ['', {
        validators: [Validators.required, Validators.email],
        asyncValidators: [this.emailExistsValidator.bind(this)],
        updateOn: 'blur'
      }],
    }); }

    emailExistsValidator(control: AbstractControl) {
      const email = control.value;
      return this.passwordResetService.checkEmailExists(email).pipe(
        map(exists => {
          return exists ? null : { emailDoesNotExist: true };
        }),
        catchError(() => of({ emailDoesNotExist: true })) // Handle HTTP errors
      );
    }

    sendVerificationEmail() {
      if (this.passwordResetForm.valid) {
        const email = this.passwordResetForm.get('email')?.value;
    
        this.passwordResetService.sendPasswordResetEmail(email).subscribe(
          // Success handler
          response => {console.log('Verification email sent to:', email);
            //this.router.navigateByUrl('/verify');
            this.router.navigate(['/verify'], { queryParams: { email: email } });
            
          },
          // Error handler
          error => {
            console.error('Error sending verification email:', error);
        alert(error);
          }
        );
      } 
    }
    
    
  goBack() {
    this.router.navigate(['/login']); // Navigate back to the login page
  }
}

export class PasswordResetModel {
  email: string;

  constructor() {
    this.email = ""
  }
}
  


