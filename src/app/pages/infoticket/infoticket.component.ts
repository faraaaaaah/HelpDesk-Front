import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../../app.service';
import { Ticket } from '../../Ticket';
import { User } from '../../User';

@Component({
  selector: 'app-infoticket',
  templateUrl: './infoticket.component.html',
  styleUrls: ['./infoticket.component.css']
})
export class InfoticketComponent implements OnInit {
  ticket: Ticket | undefined;
  user: User | undefined;

  constructor(
    private route: ActivatedRoute,
    private service: AppService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const ticketId = this.route.snapshot.paramMap.get('id');
    if (ticketId) {
      this.service.getTicketById(ticketId).subscribe(
        (ticket: Ticket) => {
          this.ticket = ticket;
        },
        (error: any) => {
          console.error('Erreur lors de la récupération du ticket:', error);
        }
      );
    } else {
      console.error('Aucun ID de ticket fourni.');
    }
  }
  

  
  goBack() {
    this.router.navigate(['/tabletickets']);
  }
}
