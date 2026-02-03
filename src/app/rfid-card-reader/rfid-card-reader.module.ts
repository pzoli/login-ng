import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RFIDCardReaderComponent as RFIDCardComponent, RFIDCardReaderComponent } from './rfid-card-reader.component';
import { TableModule } from 'primeng/table';
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
    RFIDCardReaderComponent
  ],
  imports: [
    CommonModule, TableModule, ButtonModule, DialogModule, BrowserAnimationsModule, InputTextModule, FormsModule, ConfirmDialogModule, ToastModule,
    CalendarModule
],
  exports: [
    RFIDCardComponent
  ]
})
export class RFIDCardReaderModule { }
