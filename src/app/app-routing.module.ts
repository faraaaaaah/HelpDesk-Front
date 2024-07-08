import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PasswordResetComponent } from './pages/password-reset/password-reset.component';
import { SidebarComponent } from './pages/sidebar/sidebar.component';
import { TableticketsComponent } from './pages/tabletickets/tabletickets.component';
import { TableuserComponent } from './pages/tableuser/tableuser.component';
import { ModifierticketComponent } from './pages/modifierticket/modifierticket.component';
import { AddticketComponent } from './pages/addticket/addticket.component';
import { ModifieruserComponent } from './pages/modifieruser/modifieruser.component';
import { AdduserComponent } from './pages/adduser/adduser.component';
import { InfoticketComponent } from './pages/infoticket/infoticket.component';
import { InfouserComponent } from './pages/infouser/infouser.component';
import { ResetComponent } from './pages/reset/reset.component';
import { VerifyComponent } from './pages/verify/verify.component';


export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'password-reset',
    component: PasswordResetComponent
  },
  {
    path: 'reset',
    component: ResetComponent
  },
  {
    path: 'verify',
    component: VerifyComponent
  },
  {
    path: 'sidebar',
    component: SidebarComponent
  },
  {
    path: 'modifierticket/:id', // Ajoutez /:id pour le paramètre d'ID
    component: ModifierticketComponent
  },
  {
    path: 'addticket',
    component: AddticketComponent
  },
  {
    path: 'infoticket/:id',
    component: InfoticketComponent
  },
  {
    path: 'infouser/:id',
    component: InfouserComponent
  },
  {
    path: 'modifieruser/:id', // Ajoutez /:id pour le paramètre d'ID
    component: ModifieruserComponent
  },
  {
    path: 'adduser',
    component: AdduserComponent
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        data: { pageTitle: 'Home' }
      },
      {
        path: 'tabletickets',
        component: TableticketsComponent,
        data: { pageTitle: 'Tickets' }
      },
      {
        path: 'tableuser',
        component: TableuserComponent,
        data: { pageTitle: 'Users' }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
