import { Component, OnInit} from '@angular/core';
import {RFIDLogEntry, RFIDLogEntryService} from '../services/rfidLogEntry.service';
import {ConfirmationService, MessageService} from 'primeng/api';
import { RFIDCardReader, RFIDCardReaderService } from '../services/rfid-card-reader.service ';
import { RFIDCardUser, RFIDCardUserService } from '../services/rfid-card-user.service';
import { TablePageEvent } from 'primeng/table';


@Component({
  selector: 'app-rfid-card',
  templateUrl: './rfid-log-entry.component.html',
  styleUrl: './rfid-log-entry.component.css',
  providers: [ConfirmationService, MessageService]
})
export class RFIDLogEntryComponent implements OnInit {

  public rfidlogentries: RFIDLogEntry[] = [];
  public readers: RFIDCardReader[] = [];
  public users: RFIDCardUser[] = [];
  public currentRFIDLogEntry: RFIDLogEntry = {} as RFIDLogEntry;
  public displayDialog = false;
  public page = 0;
  public pageSize = 10;
  public totalRecords = 0;
  private pastDate!: Date;

  constructor(private RFIDCardUserService: RFIDCardUserService, private RFIDCardReaderService: RFIDCardReaderService, public RFIDLogEntryService: RFIDLogEntryService, private confirmationService: ConfirmationService, private messageService: MessageService) {
  }

  showDialog() {
    this.displayDialog = true;
  }

  async saveCurrentRFIDLogEntry() {
    if (this.currentRFIDLogEntry.id) {
      this.currentRFIDLogEntry = await this.RFIDLogEntryService.updateRFIDLogEntry(this.currentRFIDLogEntry)
    } else {
      this.currentRFIDLogEntry = await this.RFIDLogEntryService.saveRFIDLogEntry(this.currentRFIDLogEntry)
    }
    this.totalRecords = await this.RFIDLogEntryService.getRFIDLogEntriesTotalCount()
    this.rfidlogentries = await this.RFIDLogEntryService.getRFIDLogEntries(this.page, this.pageSize)
  }

  async ngOnInit() {
    this.totalRecords = await this.RFIDLogEntryService.getRFIDLogEntriesTotalCount()
    this.rfidlogentries = await this.RFIDLogEntryService.getRFIDLogEntries(this.page, this.pageSize)
    this.readers = await this.RFIDCardReaderService.getRFIDCardReaders()
    this.users = await this.RFIDCardUserService.getRFIDCardUsers()
    for(let user of this.users) {
      user.label = user.client.name + " - " + user.rfidCard.rfid
    }
  }

  createNewRFIDLogEntry() {
    this.currentRFIDLogEntry={} as RFIDLogEntry
  }

  async removeRFIDLogEntry(rfidLogEntry: RFIDLogEntry) {
    await this.RFIDLogEntryService.removeRFIDLogEntry(rfidLogEntry.id)
    this.totalRecords = await this.RFIDLogEntryService.getRFIDLogEntriesTotalCount()
    this.rfidlogentries = await this.RFIDLogEntryService.getRFIDLogEntries(this.page, this.pageSize)
  }

  async onPageChange(event: TablePageEvent) {
    this.pageSize = event.rows;
    this.page = Math.floor(event.first / this.pageSize);
    this.rfidlogentries = await this.RFIDLogEntryService.getRFIDLogEntries(this.page, this.pageSize);
  }

  confirm(rfidLogEntry: RFIDLogEntry) {
    this.confirmationService.confirm({
      header: 'Confirmation',
      message: 'Please confirm to proceed moving forward.',
      acceptIcon: 'pi pi-check mr-2',
      rejectIcon: 'pi pi-times mr-2',
      rejectButtonStyleClass: 'p-button-sm',
      acceptButtonStyleClass: 'p-button-outlined p-button-sm',
      accept: () => {
        this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
        this.removeRFIDLogEntry(rfidLogEntry)
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
      }
    });
  }

  protected readonly structuredClone = structuredClone;

  setCurrentRFIDLogEntry(rfidLogEntry: RFIDLogEntry) {
    this.currentRFIDLogEntry = structuredClone(rfidLogEntry);
    this.currentRFIDLogEntry.logDate = new Date(rfidLogEntry.logDate!);
  }
}
