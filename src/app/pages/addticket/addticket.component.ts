import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from '../../app.service';

@Component({
  selector: 'app-addticket',
  templateUrl: './addticket.component.html',
  styleUrls: ['./addticket.component.css']
})
export class AddticketComponent implements OnInit {
  form: FormGroup;
  users: any[] = [];  // Array to store users

  constructor(private router: Router, private service: AppService) {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      date: new FormControl('', [Validators.required]),
      assigned: new FormControl('', [Validators.required]), // Single field for assigned user
      status: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
    this.getUsers();  // Fetch users on component initialization
  }
  goBack() {
    this.router.navigate(['/tabletickets']); // Navigate back to the tickets table page
  }
  getUsers(): void {
    this.service.getUsers().subscribe(
      (response: any) => {
        this.users = response;  // Assign response to users array
      },
      (error: any) => {
        console.error('Error fetching users:', error);
      }
    );
  }
  
  onSubmit(): void {
    if (this.form.valid) {
      const data = this.form.value;
      // Trouver l'utilisateur assigné dans la liste des utilisateurs
      const assignedUser = this.users.find(user => user.id.toString() === data.assigned.toString());
      if (assignedUser) {
        // Si l'utilisateur assigné est trouvé, mettre à jour la valeur de 'assigned' avec le nom de l'utilisateur
        data.assigned = assignedUser;
        // Afficher les données du formulaire
        console.log('Form data before sending:', data);
        // Appeler le service pour ajouter le ticket
        this.service.addTicket(data).subscribe(
          (response: any) => {
            console.log('Response from server:', response);
            this.router.navigate(['/tabletickets']);
          },
          (error: any) => {
            console.error('Error:', error);
          }
        );
      } else {
        console.error('Assigned user not found');
      }
    } else {
      console.log('Form is invalid');
    }
  }
  
  
}
