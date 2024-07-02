import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../../app.service';
import { Ticket } from '../../Ticket';
import { User } from '../../User';

@Component({
  selector: 'app-modifierticket',
  templateUrl: './modifierticket.component.html',
  styleUrls: ['./modifierticket.component.css']
})
export class ModifierticketComponent implements OnInit {
  form: FormGroup;
  ticket: Ticket | undefined;
  users: User[] = []; // Assuming User is your user model

  constructor(
    private fb: FormBuilder,
    private service: AppService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      assigned: ['', Validators.required], // Change to assigned user ID
      date: ['', Validators.required],
      status: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Fetch ticket details
    this.route.paramMap.subscribe(params => {
        const ticketId = params.get('id');
        if (ticketId !== null) {
            this.service.getTicketById(ticketId).subscribe(
                (ticket: Ticket) => {
                    this.ticket = ticket;
                    console.log('Ticket assigned:', this.ticket.assigned); // Ajout du log ici
                    // Patch form values with ticket details
                    this.form.patchValue({
                        name: this.ticket.name,
                        assigned: this.ticket.assigned?.id, // Assuming assigned is user ID
                        date: this.ticket.date,
                        status: this.ticket.status
                    });
                },
                error => {
                    console.error('Error fetching ticket:', error);
                }
            );
        } else {
            console.error('Ticket ID is undefined');
        }
    });

    // Fetch list of users
    this.service.getUsers().subscribe(
        (users: User[]) => {
            this.users = users;
        },
        error => {
            console.error('Error fetching users:', error);
        }
    );
}


  onSubmit() {
    if (this.form.valid && this.ticket) {
      // Mettre à jour les valeurs du ticket avec les valeurs du formulaire
      this.ticket.name = this.form.value.name;
      this.ticket.date = this.form.value.date;
      this.ticket.status = this.form.value.status;
  
      // Trouver l'utilisateur assigné dans la liste des utilisateurs
      const assignedUser = this.users.find(user => user.id.toString() === this.form.value.assigned.toString());
      if (assignedUser) {
        // Mettre à jour l'utilisateur assigné avec les nouvelles valeurs
        this.ticket.assigned = assignedUser;
      } else {
        console.error('Assigned user not found');
        return;
      }
  
      // Appeler le service pour mettre à jour le ticket
      this.service.updateTicket(this.ticket.id, this.ticket).subscribe(
        (data: any) => {
          console.log('Ticket updated successfully:', data);
          this.router.navigate(['/tabletickets']);
        },
        (error: any) => {
          console.error('Error updating ticket:', error);
        }
      );
    } else {
      console.log('Form is invalid or ticket data is missing');
    }
  }
  

  goBack() {
    this.router.navigate(['/tabletickets']);
  }
}
