import { Injectable } from '@angular/core';
import axios from 'axios';
import {KeycloakService} from 'keycloak-angular';
import {HttpClient} from '@angular/common/http';
import {HttpClientService} from './http-client.service';

export interface RFIDCard {
  id: number;
  rfid: string;
  type: string;
}

@Injectable({
  providedIn: 'root'
})
export class RFIDCardService {

  constructor(public httpClient: HttpClientService) {

  }

  public async getRFIDCards(): Promise<RFIDCard[]> {
    const result = (await this.httpClient.getInstance()).get("/api/rfid/card",{}).then(res => { return res.data});
    return await result;
  }

  public async saveRFIDCard(currentRFIDCard: RFIDCard | null): Promise<RFIDCard> {
    const config = { headers: {'Content-Type': 'application/json'} };
    const result = (await this.httpClient.getInstance()).post("/api/rfid/card",currentRFIDCard,config).then(res => { return res.data});
    return await result;
  }

  public async updateRFIDCard(currentRFIDCard: RFIDCard | null): Promise<RFIDCard> {
    const config = { headers: {'Content-Type': 'application/json'} };
    const result = (await this.httpClient.getInstance()).post("/api/rfid/card",currentRFIDCard,config).then(res => { return res.data});
    return await result;
  }

  public async removeRFIDCard(id: number): Promise<unknown> {
    const config = { headers: {'Content-Type': 'application/json'} };
    const result = (await this.httpClient.getInstance()).delete("/api/rfid/card/"+id, config).then(res => { return res.data});
    return await result
  }
}
