import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RFIDCardUserComponent as RFIDCardUserComponent } from './rfid-card-user.component';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import {ButtonModule} from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { InputTextModule } from 'primeng/inputtext';
import {FormsModule} from '@angular/forms';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import {ToastModule} from 'primeng/toast';
import { CalendarModule } from "primeng/calendar";

@NgModule({
  declarations: [
    RFIDCardUserComponent
  ],
  imports: [
    CommonModule, TableModule, ButtonModule, DialogModule, BrowserAnimationsModule, InputTextModule, FormsModule, ConfirmDialogModule, ToastModule, DropdownModule, CalendarModule
  ],
  exports: [
    RFIDCardUserComponent
  ]
})
export class RFIDCardUserModule { }
