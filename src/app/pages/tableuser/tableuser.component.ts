import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../../app.service';
import { User } from '../../User';

declare interface TableData {
  headerRow: string[];
  dataRows: string[][];
}

@Component({
  selector: 'app-tableuser',
  templateUrl: './tableuser.component.html',
  styleUrls: ['./tableuser.component.css']
})
export class TableuserComponent implements OnInit {
  user: any[] | undefined
  url: string = "http://localhost:8081";

  constructor(private service: AppService,private router: Router) { }

  ngOnInit() {
    this.service.getUsers().subscribe((data: any[] | undefined) => {
      this.user = data;})
  }
  loadUsers(): void {
    this.service.getUsers().subscribe(data => {
      this.user = data;
    });
  }
  refreshUsers(): void {
    this.loadUsers();
  }
  editRow(user: User) {
    this.router.navigate(['/modifieruser', user.id]);
  }
  afficher(user: User): void {
    this.router.navigate(['/infouser', user.id]);
  }
  deleteRow(user: User) {
    const isConfirmed = confirm('Are you sure you want to delete this user?');
    if (isConfirmed) {
        if (user && user.id) {
            console.log('Suppression du user avec l\'ID:', user.id); // Log pour débogage
            this.service.deleteUser(user.id).subscribe(() => {
                // Remove the deleted user from the local array
                if (this.user) {
                    this.user = this.user.filter(t => t.id !== user.id);
                    console.log('user supprimé avec succès'); // Log pour débogage
                }
            }, error => {
                console.error('Erreur lors de la suppression du user:', error);
            });
        } else {
            console.error('user ou ID du user non défini'); // Log pour débogage
        }
    }
}

  

  
  
  addRow(user: User) {
    this.router.navigate(['/adduser']);
  }
}
