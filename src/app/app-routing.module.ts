import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KeycloakGuard } from './auth/keycloak.guard';
import {RFIDCardComponent as RFIDCardComponent} from './rfid-card/rfid-card.component';
import {RFIDCardReaderComponent as RFIDCardReaderComponent} from './rfid-card-reader/rfid-card-reader.component';
import { RFIDCardUserComponent } from './rfid-card-user/rfid-card-user.component';
import {ClientComponent} from './client/client.component';
import {HomeComponent} from './home/home.component';
import { RFIDLogEntryComponent } from './rfid-log-entry/rfid-log-entry.component';
import { RFIDFailedLogComponent } from './rfid-failed-log/rfid-failed-log.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, canActivate: [KeycloakGuard]},
  { path: 'rfid-card', component: RFIDCardComponent },
  { path: 'rfid-card-reader', component: RFIDCardReaderComponent },
  { path: 'rfid-card-user', component: RFIDCardUserComponent },
  { path: 'rfid-log-entry', component: RFIDLogEntryComponent },
  { path: 'rfid-failed-log', component: RFIDFailedLogComponent },
  { path: 'client', component: ClientComponent },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
