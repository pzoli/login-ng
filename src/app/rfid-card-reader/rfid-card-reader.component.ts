import { Component, OnInit} from '@angular/core';
import {RFIDCardReader, RFIDCardReaderService} from '../services/rfid-card-reader.service ';
import {ConfirmationService, MessageService} from 'primeng/api';

@Component({
  selector: 'app-rfid-card-reader',
  templateUrl: './rfid-card-reader.component.html',
  styleUrl: './rfid-card-reader.component.css',
  providers: [ConfirmationService, MessageService]
})
export class RFIDCardReaderComponent implements OnInit {

  public rfidcardreaders: RFIDCardReader[] = [];
  public currentRFIDCardReader: RFIDCardReader = {} as RFIDCardReader;
  public displayDialog = false;
  private pastDate!: Date;

  constructor(public RFIDCardReaderService: RFIDCardReaderService, private confirmationService: ConfirmationService, private messageService: MessageService) {
  }

  showDialog() {
    this.displayDialog = true;
  }

  async saveCurrentRFIDCardReader() {
    if (this.currentRFIDCardReader.id) {
      this.currentRFIDCardReader = await this.RFIDCardReaderService.updateRFIDCardReader(this.currentRFIDCardReader)
    } else {
      this.currentRFIDCardReader = await this.RFIDCardReaderService.saveRFIDCardReader(this.currentRFIDCardReader)
    }
    this.rfidcardreaders = await this.RFIDCardReaderService.getRFIDCardReaders()
  }

  async ngOnInit() {
    this.rfidcardreaders = await this.RFIDCardReaderService.getRFIDCardReaders()
  }

  createNewRFIDCardReader() {
    this.currentRFIDCardReader={} as RFIDCardReader
  }

  async removeRFIDCardReader(rfidCardReader: RFIDCardReader) {
    await this.RFIDCardReaderService.removeRFIDCardReader(rfidCardReader.id)
    this.rfidcardreaders = await this.RFIDCardReaderService.getRFIDCardReaders()
  }

  confirm(rfidCardReader: RFIDCardReader) {
    this.confirmationService.confirm({
      header: 'Confirmation',
      message: 'Please confirm to proceed moving forward.',
      acceptIcon: 'pi pi-check mr-2',
      rejectIcon: 'pi pi-times mr-2',
      rejectButtonStyleClass: 'p-button-sm',
      acceptButtonStyleClass: 'p-button-outlined p-button-sm',
      accept: () => {
        this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
        this.removeRFIDCardReader(rfidCardReader)
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
      }
    });
  }

  protected readonly structuredClone = structuredClone;

  setCurrentRFIDCardReader(rfidCardReader: RFIDCardReader) {
    this.currentRFIDCardReader = structuredClone(rfidCardReader);
    this.currentRFIDCardReader.periodStart = rfidCardReader.periodStart ? new Date(rfidCardReader.periodStart) : null;
    this.currentRFIDCardReader.periodEnd = rfidCardReader.periodEnd ? new Date(rfidCardReader.periodEnd) : null;
  }
}
