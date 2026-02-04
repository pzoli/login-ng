import { Injectable } from '@angular/core';
import axios from 'axios';
import {KeycloakService} from 'keycloak-angular';
import {HttpClient} from '@angular/common/http';
import {HttpClientService} from './http-client.service';
import { Client } from './client.service';
import { RFIDCard } from './rfid-card.service';

export interface RFIDCardUser {
  id: number;
  periodStart: Date | null;
  periodEnd: Date | null;
  client: Client;
  rfidCard: RFIDCard;
  userName: string;
  label: string;
}

@Injectable({
  providedIn: 'root'
})
export class RFIDCardUserService {

  constructor(public httpClient: HttpClientService) {

  }

  public async getRFIDCardUsers(): Promise<RFIDCardUser[]> {
    const result = (await this.httpClient.getInstance()).get("/api/rfid/card-user",{}).then(res => { return res.data});
    return await result;
  }

  public async saveRFIDCardUser(currentRFIDCardUser: RFIDCardUser | null): Promise<RFIDCardUser> {
    const config = { headers: {'Content-Type': 'application/json'} };
    const result = (await this.httpClient.getInstance()).post("/api/rfid/card-user",currentRFIDCardUser,config).then(res => { return res.data});
    return await result;
  }

  public async updateRFIDCardUser(currentRFIDCardUser: RFIDCardUser | null): Promise<RFIDCardUser> {
    const config = { headers: {'Content-Type': 'application/json'} };
    const result = (await this.httpClient.getInstance()).put("/api/rfid/card-user",currentRFIDCardUser,config).then(res => { return res.data});
    return await result;
  }

  public async removeRFIDCardUser(id: number): Promise<unknown> {
    const config = { headers: {'Content-Type': 'application/json'} };
    const result = (await this.httpClient.getInstance()).delete("/api/rfid/card-user/"+id, config).then(res => { return res.data});
    return await result
  }
}
