import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RFIDCardComponent as RFIDCardComponent } from './rfid-card.component';
import { TableModule } from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { InputTextModule } from 'primeng/inputtext';
import {FormsModule} from '@angular/forms';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import {ToastModule} from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';

@NgModule({
  declarations: [
    RFIDCardComponent
  ],
  imports: [
    CommonModule, TableModule, ButtonModule, DialogModule, BrowserAnimationsModule, InputTextModule, FormsModule, ConfirmDialogModule, ToastModule, DropdownModule
  ],
  exports: [
    RFIDCardComponent
  ]
})
export class RFIDCardModule { }
