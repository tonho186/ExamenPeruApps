import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { ComplejosComponent } from './complejos/complejos.component';
import { ComplejosService } from './complejos/complejos.service';
import { ComplejosFormComponent } from './complejos/complejos-form/complejos-form.component';
import { LogInterceptorService } from './services/log-interceptor.service';
import { EventosService } from './eventos/eventos.service';
import { LeaveFormService } from './complejos/complejos-form/leave-form.service';
import { AuthGuardService } from './services/auth-guard.service';
import { RegisterComponent } from './account/register/register.component';
import { AccountService } from './account/account.service';
import { AuthInterceptorService } from './services/auth-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    ComplejosComponent,
    ComplejosFormComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },
      { path: 'personas', component: ComplejosComponent, canActivate: [AuthGuardService] },
      { path: 'personas-agregar', component: ComplejosComponent, canDeactivate: [LeaveFormService] },
      { path: 'personas-editar/:id', component: ComplejosComponent, canDeactivate: [LeaveFormService] },
      { path: 'register-login', component: RegisterComponent }
    ])
  ],
  providers: [ComplejosService,
    EventosService,
    LeaveFormService,
    AuthGuardService,
    AccountService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LogInterceptorService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
