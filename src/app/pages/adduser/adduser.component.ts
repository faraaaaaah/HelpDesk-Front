import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from '../../app.service';
import { AuthService } from '../../auth.service';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent implements OnInit {
  form: FormGroup;
  minLength= 6;

  constructor(private router: Router, private service: AppService,private fb: FormBuilder,private authService: AuthService) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', {
        validators: [Validators.required, Validators.email],
        asyncValidators: [this.emailExistsValidator.bind(this)],
        updateOn: 'blur'
      }],
      dob: ['', [Validators.required, this.ageValidator]],
      password: ['', [Validators.required, Validators.minLength(this.minLength),this.passwordComplexityValidator()]]

    });
  }

  ngOnInit(): void {}
  goBack() {
    this.router.navigate(['/tableuser']); // Navigate back to the tickets table page
  }
  ageValidator(control: AbstractControl): ValidationErrors | null {
    const dob = new Date(control.value);
    const today = new Date();
    const minAge = 18;
    const birthDate = new Date(dob.getFullYear() + minAge, dob.getMonth(), dob.getDate());
    
    return birthDate <= today ? null : { ageRequirement: { requiredAge: minAge } };
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
  emailExistsValidator(control: AbstractControl): Observable<ValidationErrors | null> {
    return this.service.checkEmailExists(control.value).pipe(
      map(exists => exists ? { emailExists: true } : null)
    );
  }
  checkEmailExists() {
    const email = this.form.get('email')?.value;
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
  onSubmit(): void {
    if (this.form.valid) {
      const data = this.form.value;
      console.log('Form data:', data);
      this.service.addUser(data).subscribe(
        (response: any) => {
          console.log('Response from server:', response);
          this.router.navigate(['/tableuser']);
        },
        (error: any) => {
          console.error('Error:', error);
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }
}
