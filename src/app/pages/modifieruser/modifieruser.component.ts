import { Component, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../../app.service';
import { User } from '../../User';
import { Observable, map,of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, catchError, take } from 'rxjs/operators';

@Component({
  selector: 'app-modifieruser',
  templateUrl: './modifieruser.component.html',
  styleUrls: ['./modifieruser.component.css']
})
export class ModifieruserComponent implements OnInit {
  form: FormGroup;
  user: User | undefined;
  initialEmail!: string;

  constructor(
    private fb: FormBuilder,
    private service: AppService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      dob: ['', [Validators.required, this.ageValidator]]
    });

  }
  ngOnInit(): void {
    const userId = this.route.snapshot.params['id']; // Récupérez l'ID de l'utilisateur depuis l'URL
    this.service.getUserById(userId).subscribe(
      (user: User) => {
        this.user = user;
        this.initialEmail = user.email; // Stockez l'email initial

        // Initialisation du formulaire avec les données de l'utilisateur
        this.form = this.fb.group({
          name: [user.name, Validators.required],
          lastname: [user.lastname, Validators.required],
          email: [user.email, {
            validators: [Validators.required, Validators.email],
            asyncValidators: [this.emailExistsValidator(this.service, user.email)],
            updateOn: 'blur' // Mettez à jour la validation après la perte de focus du champ email
          }],
          dob: [user.dob, [Validators.required, this.ageValidator]],
          // autres champs du formulaire
        });
      },
      error => {
        console.error('Erreur lors de la récupération de l\'utilisateur:', error);
      }
    );
  }
  ageValidator(control: AbstractControl): ValidationErrors | null {
    const dob = new Date(control.value); // Date of Birth value from the form control
    const today = new Date();
    const minAge = 18;
    
    // Calculate the birthdate that meets the age requirement
    const birthDate = new Date(dob.getFullYear() + minAge, dob.getMonth(), dob.getDate());
    
    // Check if the calculated birthdate is before or on today's date
    return birthDate <= today ? null : { ageRequirement: true };
  }
  
  emailExistsValidator(service: AppService, initialEmail: string): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      // Vérifiez si l'email a changé par rapport à l'email initial
      if (control.value === initialEmail) {
        return of(null); // Si l'email est le même que l'email initial, ne pas valider
      }

      // Continuer avec la validation asynchrone si l'email a changé
      return control.valueChanges.pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap(value =>
          service.checkEmailExists(value).pipe(
            map(exists => (exists ? { emailExists: true } : null)),
            catchError(() => of(null))
          )
        ),
        take(1)
      );
    };
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
  
  onSubmit() {
    // Mettre à jour le User avec les nouvelles valeurs du formulaire
    this.service.updateUser(this.user?.id, this.form.value).subscribe(data => {
      console.log(data);
    });
    this.router.navigate(['/tableuser']);
  }

  goBack() {
    this.router.navigate(['/tableuser']);
  }
}
