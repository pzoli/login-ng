import { Component, OnInit} from '@angular/core';
import {RFIDCard, RFIDCardService} from '../services/rfid-card.service';
import {ConfirmationService, MessageService} from 'primeng/api';

@Component({
  selector: 'app-rfid-card',
  templateUrl: './rfid-card.component.html',
  styleUrl: './rfid-card.component.css',
  providers: [ConfirmationService, MessageService]
})
export class RFIDCardComponent implements OnInit {

  public rfidcards: RFIDCard[] = [];
  public currentRFIDCard: RFIDCard = {} as RFIDCard;
  public types = ["RF1","VRF1"];
  public displayDialog = false;
  private pastDate!: Date;

  constructor(public RFIDCardService: RFIDCardService, private confirmationService: ConfirmationService, private messageService: MessageService) {
  }

  showDialog() {
    this.displayDialog = true;
  }

  async saveCurrentRFIDCard() {
    if (this.currentRFIDCard.id) {
      this.currentRFIDCard = await this.RFIDCardService.updateRFIDCard(this.currentRFIDCard)
    } else {
      this.currentRFIDCard = await this.RFIDCardService.saveRFIDCard(this.currentRFIDCard)
    }
    this.rfidcards = await this.RFIDCardService.getRFIDCards()
  }

  async ngOnInit() {
    this.rfidcards = await this.RFIDCardService.getRFIDCards()
  }

  createNewRFIDCard() {
    this.currentRFIDCard={} as RFIDCard
  }

  async removeRFIDCard(rfidCard: RFIDCard) {
    await this.RFIDCardService.removeRFIDCard(rfidCard.id)
    this.rfidcards = await this.RFIDCardService.getRFIDCards()
  }

  confirm(rfidCard:RFIDCard) {
    this.confirmationService.confirm({
      header: 'Confirmation',
      message: 'Please confirm to proceed moving forward.',
      acceptIcon: 'pi pi-check mr-2',
      rejectIcon: 'pi pi-times mr-2',
      rejectButtonStyleClass: 'p-button-sm',
      acceptButtonStyleClass: 'p-button-outlined p-button-sm',
      accept: () => {
        this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
        this.removeRFIDCard(rfidCard)
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
      }
    });
  }

  protected readonly structuredClone = structuredClone;

  setCurrentRFIDCard(rfidCard: RFIDCard) {
    this.currentRFIDCard = structuredClone(rfidCard);
  }
}
