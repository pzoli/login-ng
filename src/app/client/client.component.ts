import { Component, OnInit} from '@angular/core';
import {Client as Client, ClientService as ClientService} from '../services/client.service';
import {ConfirmationService, MessageService} from 'primeng/api';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrl: './client.component.css',
  providers: [ConfirmationService, MessageService]
})
export class ClientComponent implements OnInit {

  public clients: Client[] = [];
  public currentClient: Client = {} as Client;
  public displayDialog = false;
  private pastDate!: Date;

  constructor(public clientService: ClientService, private confirmationService: ConfirmationService, private messageService: MessageService) {
  }

  showDialog() {
    this.displayDialog = true;
  }

  async saveCurrentClient() {
    if (this.currentClient.id) {
      this.currentClient = await this.clientService.updateClient(this.currentClient)
    } else {
      this.currentClient = await this.clientService.saveClient(this.currentClient)
    }
    this.clients = await this.clientService.getClients()
  }

  async ngOnInit() {
    this.clients = await this.clientService.getClients()
  }

  createNewClient() {
    this.currentClient={} as Client
  }

  async removeClient(client: Client) {
    await this.clientService.removeClient(client.id)
    this.clients = await this.clientService.getClients()
  }

  confirm(client: Client) {
    this.confirmationService.confirm({
      header: 'Confirmation',
      message: 'Please confirm to proceed moving forward.',
      acceptIcon: 'pi pi-check mr-2',
      rejectIcon: 'pi pi-times mr-2',
      rejectButtonStyleClass: 'p-button-sm',
      acceptButtonStyleClass: 'p-button-outlined p-button-sm',
      accept: () => {
        this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
        this.removeClient(client)
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
      }
    });
  }

  protected readonly structuredClone = structuredClone;

  setCurrentClient(client: Client) {
    this.currentClient = structuredClone(client);
  }
}
