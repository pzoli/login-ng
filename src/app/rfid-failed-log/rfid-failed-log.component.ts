import { Component, OnInit} from '@angular/core';
import {ConfirmationService, MessageService} from 'primeng/api';
import { RFIDFailedLog as RFIDFailedLog, RFIDFailedLogService } from '../services/rfidFailedLog.service';


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
    this.rfidfailedlogs = await this.RFIDFailedLogService.getRFIDFailedLogs()
  }

  async ngOnInit() {
    this.rfidfailedlogs = await this.RFIDFailedLogService.getRFIDFailedLogs()
  }

  createNewRFIDFailedLog() {
    this.currentRFIDFailedLog={} as RFIDFailedLog
  }

  async removeRFIDFailedLog(rfidFailedLog: RFIDFailedLog) {
    await this.RFIDFailedLogService.removeRFIDFailedLog(rfidFailedLog.id)
    this.rfidfailedlogs = await this.RFIDFailedLogService.getRFIDFailedLogs()
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
