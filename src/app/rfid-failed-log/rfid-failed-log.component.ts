import { Component, OnInit} from '@angular/core';
import {ConfirmationService, MessageService} from 'primeng/api';
import { RFIDFailedLog as RFIDFailedLog, RFIDFailedLogService } from '../services/rfidFailedLog.service';
import { TablePageEvent } from 'primeng/table';


@Component({
  selector: 'app-rfid-card',
  templateUrl: './rfid-failed-log.component.html',
  styleUrl: './rfid-failed-log.component.css',
  providers: [ConfirmationService, MessageService]
})
export class RFIDFailedLogComponent implements OnInit {

  public rfidfailedlogs: RFIDFailedLog[] = [];
  public currentRFIDFailedLog: RFIDFailedLog = {} as RFIDFailedLog;
  public displayDialog = false;
  public page = 0;
  public pageSize = 10;
  public totalRecords = 0;
  private pastDate!: Date;

  constructor(private RFIDFailedLogService: RFIDFailedLogService, private confirmationService: ConfirmationService, private messageService: MessageService) {
  }

  showDialog() {
    this.displayDialog = true;
  }

  async saveCurrentRFIDFailedLog() {
    if (this.currentRFIDFailedLog.id) {
      this.currentRFIDFailedLog = await this.RFIDFailedLogService.updateRFIDFailedLog(this.currentRFIDFailedLog)
    } else {
      this.currentRFIDFailedLog = await this.RFIDFailedLogService.saveRFIDFailedLog(this.currentRFIDFailedLog)
    }
    this.totalRecords = await this.RFIDFailedLogService.getRFIDFailedLogsTotalCount()
    this.rfidfailedlogs = await this.RFIDFailedLogService.getRFIDFailedLogs(this.page, this.pageSize)
  }

  async ngOnInit() {
    this.totalRecords = await this.RFIDFailedLogService.getRFIDFailedLogsTotalCount()
    this.rfidfailedlogs = await this.RFIDFailedLogService.getRFIDFailedLogs(this.page, this.pageSize)
  }

  createNewRFIDFailedLog() {
    this.currentRFIDFailedLog={} as RFIDFailedLog
  }

  async removeRFIDFailedLog(rfidFailedLog: RFIDFailedLog) {
    await this.RFIDFailedLogService.removeRFIDFailedLog(rfidFailedLog.id)
    this.totalRecords = await this.RFIDFailedLogService.getRFIDFailedLogsTotalCount()
    this.rfidfailedlogs = await this.RFIDFailedLogService.getRFIDFailedLogs(this.page, this.pageSize)
  }

  async onPageChange(event: TablePageEvent) {
    this.pageSize = event.rows;
    this.page = Math.floor(event.first / this.pageSize);
    this.rfidfailedlogs = await this.RFIDFailedLogService.getRFIDFailedLogs(this.page, this.pageSize);
  }

  confirm(rfidFailedLog: RFIDFailedLog) {
    this.confirmationService.confirm({
      header: 'Confirmation',
      message: 'Please confirm to proceed moving forward.',
      acceptIcon: 'pi pi-check mr-2',
      rejectIcon: 'pi pi-times mr-2',
      rejectButtonStyleClass: 'p-button-sm',
      acceptButtonStyleClass: 'p-button-outlined p-button-sm',
      accept: () => {
        this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
        this.removeRFIDFailedLog(rfidFailedLog)
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
      }
    });
  }

  protected readonly structuredClone = structuredClone;

  setCurrentRFIDFailedLog(rfidFailedLog: RFIDFailedLog) {
    this.currentRFIDFailedLog = structuredClone(rfidFailedLog);
    this.currentRFIDFailedLog.logDate = new Date(rfidFailedLog.logDate);
  }
}
