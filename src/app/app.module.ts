import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { initializeKeycloak } from '../keycloak-init';
import { HomeModule } from './home/home.module';
import {RFIDCardModule as RFIDCardModule} from './rfid-card/rfid-card.module';
import {RFIDCardReaderModule as RFIDCardReaderModule} from './rfid-card-reader/rfid-card-reader.module';
import {RFIDCardUserModule as RFIDCardUserModule} from './rfid-card-user/rfid-card-user.module';
import {RFIDLogEntryModule as RFIDLogEntryModule} from './rfid-log-entry/rfid-log-entry.module';
import {RFIDFailedLogModule as RFIDFailedLogModule} from './rfid-failed-log/rfid-failed-log.module';
import {ClientModule as ClientModule} from './client/client.module';
import {NavbarModule} from './navbar/navbar.module';
import {HttpClient, provideHttpClient} from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http)
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    KeycloakAngularModule,
    NavbarModule,
    HomeModule,
    RFIDCardModule,
    RFIDCardReaderModule,
    RFIDCardUserModule,
    RFIDLogEntryModule,
    RFIDFailedLogModule,
    ClientModule,
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    provideHttpClient(),
    HttpClient,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
