import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../../app.service';
import { Ticket } from '../../Ticket';
import { User } from '../../User';


@Component({
  selector: 'app-tabletickets',
  templateUrl: './tabletickets.component.html',
  styleUrls: ['./tabletickets.component.css']
})
export class TableticketsComponent implements OnInit {
  tickets: any[] | undefined
  users: User[] = [];
  selectedTicket: Ticket | undefined; 
  ticketPercentages: any = {};

  
  url: string = "http://localhost:8081";

  constructor(private service: AppService,private router: Router) { }

  ngOnInit(): void {
    this.loadTickets();
    this.loadUsers();
    this.service.getTicketPercentages().subscribe(
      (data) => {
        this.ticketPercentages = data;
        console.log('Ticket Percentages:', this.ticketPercentages);
      },
      (error) => {
        console.error('Error fetching ticket percentages:', error);
      }
    );
  }
  
  loadUsers(): void {
    this.service.getUsers().subscribe(
      (users: User[]) => {
        this.users = users;
      },
      (error: any) => {
        console.error('Erreur lors de la récupération des utilisateurs:', error);
      }
    );
  }
  loadTickets(): void {
    this.service.getTickets().subscribe(
      (tickets: Ticket[]) => {
        this.tickets = tickets;
      },
      (error: any) => {
        console.error('Erreur lors de la récupération des tickets:', error);
      }
    );
  }
  
  afficher(ticket: Ticket): void {
    this.router.navigate(['/infoticket', ticket.id]);
  }
  

  editRow(ticket: Ticket) {
    this.router.navigate(['/modifierticket', ticket.id]);
  }
 
  deleteRow(ticket: Ticket) {
    const isConfirmed = confirm('Are you sure you want to delete this ticket?');
    if (isConfirmed) {
    if (ticket && ticket.id) {
      console.log('Suppression du ticket avec l\'ID:', ticket.id); // Log pour débogage
      this.service.deleteTicket(ticket.id).subscribe(() => {
        // Remove the deleted ticket from the local array
        if (this.tickets) {
          this.tickets = this.tickets.filter(t => t.id !== ticket.id);
          console.log('Ticket supprimé avec succès'); // Log pour débogage
        }
      }, error => {
        console.error('Erreur lors de la suppression du ticket:', error);
      });
    } else {
      console.error('Ticket ou ID du ticket non défini'); // Log pour débogage
    }
  }
}
  
  
  addRow(tickets: Ticket) {
    this.router.navigate(['/addticket']);
  }
  
}
