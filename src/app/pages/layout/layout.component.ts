import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {

  loggedUser: any;
  currentPageName: string = '';
  constructor(private router: Router) {
    const localUser = localStorage.getItem('loggedUser');
    if (localUser != null) {
      this.loggedUser = JSON.parse(localUser);
    }
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.currentPageName = this.getCurrentPageName(this.router.url);
    });
  }
  private getCurrentPageName(url: string): string {
    // Logic to extract page name from URL or route data
    // Example: You can parse the URL or access route data
    // For demonstration, assuming static page names for each route
    switch (url) {
      case '/tabletickets':
        return 'Tickets';
        case '/tableuser':
          return 'Users';
      case '/dashboard':
        return 'Home';
      // Add cases for other routes as needed
      default:
        return '';
    }
  }
  onLogoff() {
    const confirmLogout = confirm("Are you sure you want to log out?");
    if (confirmLogout) {
        localStorage.removeItem('loggedUser');
        this.router.navigateByUrl('/login');
    }
}


}
