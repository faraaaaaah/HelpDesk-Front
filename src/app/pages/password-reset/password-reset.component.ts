import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrl: './password-reset.component.css'
})
export class PasswordResetComponent {
  passwordResetObj: PasswordResetModel = new PasswordResetModel();

  constructor(private router: Router) { }

  sendVerificationEmail(): void {
    if (this.passwordResetObj.email) {
      // Implement logic to send verification email
      console.log('Verification email sent to:', this.passwordResetObj.email);
      // You can also navigate to a confirmation page after sending the email
      this.router.navigateByUrl('/verification-sent');
    } else {
      alert('Please enter a valid email address.');
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