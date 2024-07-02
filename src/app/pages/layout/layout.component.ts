import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {

  loggedUser: any;
  constructor(private router: Router) {
    const localUser = localStorage.getItem('loggedUser');
    if (localUser != null) {
      this.loggedUser = JSON.parse(localUser);
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
