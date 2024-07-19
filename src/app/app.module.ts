import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PasswordResetComponent } from './pages/password-reset/password-reset.component';
import { SidebarComponent } from './pages/sidebar/sidebar.component';
import { TableticketsComponent } from './pages/tabletickets/tabletickets.component';
import { TableuserComponent } from './pages/tableuser/tableuser.component';
import { ModifierticketComponent } from './pages/modifierticket/modifierticket.component';
import { AddticketComponent } from './pages/addticket/addticket.component';
import { AdduserComponent } from './pages/adduser/adduser.component';
import { ModifieruserComponent } from './pages/modifieruser/modifieruser.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InfoticketComponent } from './pages/infoticket/infoticket.component';
import { InfouserComponent } from './pages/infouser/infouser.component';
import { ResetComponent } from './pages/reset/reset.component';
import { VerifyComponent } from './pages/verify/verify.component';


@NgModule({ declarations: [
        AppComponent,
        LoginComponent,
        LayoutComponent,
        DashboardComponent,
        PasswordResetComponent,
        SidebarComponent,
        TableticketsComponent,
        TableuserComponent,
        AddticketComponent,
        AdduserComponent,
        ModifieruserComponent,
        ModifierticketComponent,
        InfoticketComponent,
        InfouserComponent,
        ResetComponent,
        VerifyComponent
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class AppModule { }
