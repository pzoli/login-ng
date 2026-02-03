import { Component, OnInit} from '@angular/core';
import {RFIDCardUser, RFIDCardUserService} from '../services/rfid-card-user.service';
import {ConfirmationService, MessageService} from 'primeng/api';
import { RFIDCard, RFIDCardService } from '../services/rfid-card.service';
import { Client, ClientService } from '../services/client.service';

@Component({
  selector: 'app-rfid-card-user',
  templateUrl: './rfid-card-user.component.html',
  styleUrl: './rfid-card-user.component.css',
  providers: [ConfirmationService, MessageService]
})
export class RFIDCardUserComponent implements OnInit {
  public rfidcardusers: RFIDCardUser[] = [];
  public rfidCards: RFIDCard[] = [];
  public clients: Client[] = [];
  public currentRFIDCardUser: RFIDCardUser = {} as RFIDCardUser;
  public displayDialog = false;
  private pastDate!: Date;

  constructor(public ClientService: ClientService, public RFIDCardService: RFIDCardService, public RFIDCardUserService: RFIDCardUserService, private confirmationService: ConfirmationService, private messageService: MessageService) {
  }

  showDialog() {
    this.displayDialog = true;
  }

  async saveCurrentRFIDCardUser() {
    if (this.currentRFIDCardUser.id) {
      this.currentRFIDCardUser = await this.RFIDCardUserService.updateRFIDCardUser(this.currentRFIDCardUser)
    } else {
      this.currentRFIDCardUser = await this.RFIDCardUserService.saveRFIDCardUser(this.currentRFIDCardUser)
    }
    this.rfidcardusers = await this.RFIDCardUserService.getRFIDCardUsers()
  }

  async ngOnInit() {
    this.rfidcardusers = await this.RFIDCardUserService.getRFIDCardUsers()
    this.rfidCards = await this.RFIDCardService.getRFIDCards()
    this.clients = await this.ClientService.getClients()
  }

  createNewRFIDCardUser() {
    this.currentRFIDCardUser={} as RFIDCardUser
  }

  async removeRFIDCardUser(rfidCardUser: RFIDCardUser) {
    await this.RFIDCardUserService.removeRFIDCardUser(rfidCardUser.id)
    this.rfidcardusers = await this.RFIDCardUserService.getRFIDCardUsers()
  }

  confirm(rfidCardUser:RFIDCardUser) {
    this.confirmationService.confirm({
      header: 'Confirmation',
      message: 'Please confirm to proceed moving forward.',
      acceptIcon: 'pi pi-check mr-2',
      rejectIcon: 'pi pi-times mr-2',
      rejectButtonStyleClass: 'p-button-sm',
      acceptButtonStyleClass: 'p-button-outlined p-button-sm',
      accept: () => {
        this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
        this.removeRFIDCardUser(rfidCardUser)
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
      }
    });
  }

  protected readonly structuredClone = structuredClone;

  setCurrentRFIDCardUser(rfidCardUser: RFIDCardUser) {
    this.currentRFIDCardUser = structuredClone(rfidCardUser);
    this.currentRFIDCardUser.periodStart = rfidCardUser.periodStart ? new Date(rfidCardUser.periodStart) : null;
    this.currentRFIDCardUser.periodEnd = rfidCardUser.periodEnd ? new Date(rfidCardUser.periodEnd) : null;
  }
}
