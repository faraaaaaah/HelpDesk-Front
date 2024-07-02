import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../../app.service';
import { User } from '../../User';

@Component({
  selector: 'app-infouser',
  templateUrl: './infouser.component.html',
  styleUrls: ['./infouser.component.css']
})
export class InfouserComponent implements OnInit {
  user: User | undefined;

  constructor(
    private route: ActivatedRoute,
    private service: AppService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('id');
    if (userId) {
      this.service.getUserById(userId).subscribe(
        (user: User) => {
          this.user = user;
        },
        (error: any) => {
          console.error('Erreur lors de la récupération du user:', error);
        }
      );
    } else {
      console.error('Aucun ID de user fourni.');
    }
  }

  goBack() {
    this.router.navigate(['/tableuser']);
  }
}
