import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PasswordResetService } from '../../password-reset.service';
import { SharedService } from '../../shared.service';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit {

  resetPasswordForm: FormGroup;
  minLength = 6;
  oldPassword: string = ''; // Ensure oldPassword is declared

  constructor(
    private fb: FormBuilder,
    private passwordResetService: PasswordResetService,
    private router: Router,
    private route: ActivatedRoute,
    private sharedService: SharedService
  ) {
    this.resetPasswordForm = this.fb.group({
      email: [{ value: '', disabled: true }, [Validators.required, Validators.email]],
      newPassword: ['', [Validators.required, Validators.minLength(6), this.newPasswordValidator(),this.passwordComplexityValidator()]]
    });
  }

  ngOnInit() {
    const email = this.sharedService.getEmail();
    if (email) {
      this.resetPasswordForm.patchValue({ email: email });
      this.fetchOldPassword(email); // Fetch the old password when the component initializes
    } else {
      this.route.queryParams.subscribe(params => {
        const emailFromQuery = params['email'];
        if (emailFromQuery) {
          this.sharedService.setEmail(emailFromQuery);
          this.resetPasswordForm.patchValue({ email: emailFromQuery });
          this.fetchOldPassword(emailFromQuery); // Fetch the old password when the component initializes
        }
      });
    }
  }

  fetchOldPassword(email: string) {
    this.passwordResetService.getPasswordByEmail(email).subscribe(
      (response: any) => {
        this.oldPassword = response.password; // Update this line to correctly read the password from JSON response
        this.triggerNewPasswordValidation(); // Re-trigger validation after fetching the old password
      },
      error => {
        console.error('Error fetching password from server:', error);
        alert('Error fetching password from server.');
      }
    );
  }
  passwordComplexityValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value) {
        return null; // Return null if the control value is empty
      }

      const hasLetters = /[a-zA-Z]/.test(value);
      const hasNumbers = /\d/.test(value);
      const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(value);

      const passwordValid = hasLetters && (hasNumbers || hasSpecialChars);

      return !passwordValid ? { passwordComplexity: true } : null;
    };
  }
  newPasswordValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!this.resetPasswordForm) {
        return null; // Handle gracefully if form is not initialized
      }

      const newPassword = control.value;
      if (newPassword === this.oldPassword) {
        return { sameAsOldPassword: true };
      }
      return null;
    };
  }

  triggerNewPasswordValidation() {
    const newPasswordControl = this.resetPasswordForm.get('newPassword');
    newPasswordControl?.updateValueAndValidity(); // Re-trigger the validation
  }

  resetPassword() {
    if (this.resetPasswordForm.valid) {
      const email = this.resetPasswordForm.get('email')?.value;
      const newPassword = this.resetPasswordForm.get('newPassword')?.value;

      this.passwordResetService.resetPassword(email, newPassword).subscribe(
        (response: any) => {
          console.log('Password reset successfully:', response);
          this.router.navigateByUrl('/dashboard');
        },
        error => {
          console.error('Error resetting password:', error);
          alert('Error resetting password.');
        }
      );
    } else {
      alert('Please enter the required information.');
    }
  }

  goBack() {
    this.router.navigate(['/verify']); // Navigate back to the verify page
  }
}
