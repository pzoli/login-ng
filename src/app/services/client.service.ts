import { Injectable } from '@angular/core';
import axios from 'axios';
import {KeycloakService} from 'keycloak-angular';
import {HttpClient} from '@angular/common/http';
import {HttpClientService} from './http-client.service';

export interface Client {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(public httpClient: HttpClientService) {

  }

  public async getClients(): Promise<Client[]> {
    const result = (await this.httpClient.getInstance()).get("/api/rfid/client",{}).then(res => { return res.data});
    return await result;
  }

  public async saveClient(currentClient: Client | null): Promise<Client> {
    const config = { headers: {'Content-Type': 'application/json'} };
    const result = (await this.httpClient.getInstance()).post("/api/rfid/client",currentClient,config).then(res => { return res.data});
    return await result;
  }

  public async updateClient(currentClient: Client | null): Promise<Client> {
    const config = { headers: {'Content-Type': 'application/json'} };
    const result = (await this.httpClient.getInstance()).post("/api/rfid/client",currentClient,config).then(res => { return res.data});
    return await result;
  }

  public async removeClient(id: number): Promise<unknown> {
    const config = { headers: {'Content-Type': 'application/json'} };
    const result = (await this.httpClient.getInstance()).delete("/api/rfid/client/"+id, config).then(res => { return res.data});
    return await result
  }
}
