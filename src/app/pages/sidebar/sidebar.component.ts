import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  // Define your navigation links here
  navLinks = [
    { path: '/dashboard', title: 'Home', class: '', icon: 'bi-house-door' },
    { path: '/tabletickets', title: 'Tickets', class: '', icon: 'bi-ticket' },
    { path: '/tableuser', title: 'Users', class: '', icon: 'bi-person' },
  ];
}
