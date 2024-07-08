import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PasswordResetService } from '../../password-reset.service';
import { catchError, map, of } from 'rxjs';
import { SharedService } from '../../shared.service';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrl: './verify.component.css'
})
export class VerifyComponent {
  verifyCodeForm: FormGroup;
  errorMessage: string | null = null;
  resendErrorMessage: string | null = null;
  resendCodeClicked: boolean = false;

  constructor(
    private fb: FormBuilder,
    private passwordResetService: PasswordResetService,
    private router: Router,
    private route: ActivatedRoute,
    private sharedService: SharedService


  ) {
    this.verifyCodeForm = this.fb.group({
      email: [{ value: '', disabled: true }, [Validators.required, Validators.email]],
      resetCode: ['', Validators.required]
    });
    const email = this.sharedService.getEmail();
    if (email) {
      this.verifyCodeForm.patchValue({ email: email });
    } else {
      this.route.queryParams.subscribe(params => {
        const emailFromQuery = params['email'];
        if (emailFromQuery) {
          this.sharedService.setEmail(emailFromQuery);
          this.verifyCodeForm.patchValue({ email: emailFromQuery });
        }
      });
    }
  }

  verifyCode() {
    if (this.verifyCodeForm.valid) {
      const email = this.verifyCodeForm.get('email')?.value;
      const resetCode = this.verifyCodeForm.get('resetCode')?.value;

      this.passwordResetService.verifyResetCode(email, resetCode).subscribe(
        response => {
          console.log('Reset code verified successfully:', response);
          //this.router.navigateByUrl('/reset');
          this.sharedService.setEmail(email);
          
          this.sharedService.setOldPassword(email, response.oldPassword);
          this.router.navigate(['/reset'], { queryParams: { email: email } });
        },
        error => {
          console.error('Error verifying reset code:', error);
          this.errorMessage = error;
          this.verifyCodeForm.get('resetCode')?.setErrors({ invalidResetCode: true });
        }
      );
    } else {
      alert('Please enter the required information.');
    }
  }
  emailExistsValidator(control: AbstractControl) {
    const email = control.value;
    return this.passwordResetService.checkEmailExists(email).pipe(
      map(exists => {
        return exists ? null : { emailDoesNotExist: true };
      }),
      catchError(() => of({ emailDoesNotExist: true })) // Handle HTTP errors
    );
  }
  resendCode(): void {
    this.resendErrorMessage = null; // Clear previous error messages
    this.resendCodeClicked = true; // Flag to indicate resend code button clicked
    const email = this.verifyCodeForm.get('email')?.value;
    if (email) {
      this.passwordResetService.sendPasswordResetEmail(email).subscribe(
        response => {
          console.log('Verification email sent to:', email);
          alert('Verification code resent to your email.');
        },
        error => {
          console.error('Error resending verification email:', error);
          this.resendErrorMessage = 'Error resending verification email. Please try again later.';
        }
      );
    } else {
      this.verifyCodeForm.get('email')?.markAsTouched(); // Mark email field as touched to show validation error
    }
  }
  goBack() {
    this.router.navigate(['/password-reset']); // Navigate back to the login page
  }
}
