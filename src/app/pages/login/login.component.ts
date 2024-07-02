import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../../app.service';
import { ReactiveFormsModule,FormGroup,FormBuilder, Validators,AbstractControl, ValidationErrors, ValidatorFn  } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { Observable, map } from 'rxjs';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  registerForm: FormGroup;
  loginForm: FormGroup;
  isSignDivVisiable: boolean = true;

  signUpObj: SignUpModel = new SignUpModel();
  loginObj: LoginModel = new LoginModel();
  errorMessage: string = '';
  minLength= 6;

  constructor(private router: Router,private service: AppService,private fb: FormBuilder,private authService: AuthService) { this.registerForm = this.fb.group({
     name: ['', Validators.required],
     lastname: ['', Validators.required],
     dob: ['', [Validators.required,this.ageValidator]],
     email: ['', {
      validators: [Validators.required, Validators.email],
      asyncValidators: [this.emailExistsValidator.bind(this)],
      updateOn: 'blur'
    }],
      password: ['', [Validators.required, Validators.minLength(this.minLength),this.passwordComplexityValidator()]]
   });
  this.loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });}
  emailExistsValidator(control: AbstractControl): Observable<ValidationErrors | null> {
    return this.service.checkEmailExists(control.value).pipe(
      map(exists => exists ? { emailExists: true } : null)
    );
  }
  checkEmailExists() {
    const email = this.loginForm.get('email')?.value;
    this.service.checkEmailExists(email).subscribe(
      exists => {
        if (exists) {
          // Email exists handling
          console.log('Email exists');
        } else {
          // Email does not exist handling
          console.log('Email does not exist');
        }
      },
      error => {
        console.error('Error checking email:', error);
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
  ageValidator(control: AbstractControl): ValidationErrors | null {
    const dob = new Date(control.value);
    const today = new Date();
    const minAge = 18;
    const birthDate = new Date(dob.getFullYear() + minAge, dob.getMonth(), dob.getDate());
    
    return birthDate <= today ? null : { ageRequirement: { requiredAge: minAge } };
  }
  onRegister() {
    if (this.registerForm.valid) {
      this.service.registerUser(this.registerForm.value).subscribe(
        (response: any) => {
          console.log('Registration success:', response);
          this.router.navigate(['/dashboard']);
        },
        (error: any) => {
          if (error.status === 201 || error.status === 200) {
            // Treat 201 Created as success
            console.log('Registration success:', error);
            this.router.navigate(['/dashboard']);
          } else {
            console.error('Registration error:', error);
            this.errorMessage = error.error.message || 'Registration failed. Please try again.';
          }
        }
      );
    }
  }
  
  
  onLogin() {
    if (this.loginForm.valid) {
      const email = this.loginForm.get('email')?.value;
      const password = this.loginForm.get('password')?.value;

      this.authService.login(email, password).subscribe(
        response => {
          if (response.token) {
            console.log('Login successful', response);
            // Save token in local storage or cookie
            localStorage.setItem('authToken', response.token);
            // Navigate to a different page
            this.router.navigate(['/dashboard']);
          } else {
            console.error('Login failed');
            this.errorMessage = 'Invalid email or password';
          }
        },
        error => {
          console.error('Login error', error);
          this.errorMessage = 'Failed to login. Please try again.';
        }
      );
    } else {
      console.error('Form is invalid');
    }
  }

}

export class SignUpModel {
  name: string;
  lastname: string;
  email: string;
  password: string;
  dob: Date;

  constructor() {
    this.email = "";
    this.name = "";
    this.password = "";
    this.lastname= "";
    this.dob = new Date;
  }
}

export class LoginModel {
  email: string;
  password: string;

  constructor() {
    this.email = "";
    this.password = ""
  }
}
