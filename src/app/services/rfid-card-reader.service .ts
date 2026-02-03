import { Injectable } from '@angular/core';
import axios from 'axios';
import {KeycloakService} from 'keycloak-angular';
import {HttpClient} from '@angular/common/http';
import {HttpClientService} from './http-client.service';

export interface RFIDCardReader {
  id: number;
  periodStart: Date | null;
  periodEnd: Date | null;
  readerId: string;
  comment: string;
}

@Injectable({
  providedIn: 'root'
})
export class RFIDCardReaderService {

  constructor(public httpClient: HttpClientService) {

  }

  public async getRFIDCardReaders(): Promise<RFIDCardReader[]> {
    const result = (await this.httpClient.getInstance()).get("/api/rfid/card-reader",{}).then(res => { return res.data});
    return await result;
  }

  public async saveRFIDCardReader(currentRFIDCardReader: RFIDCardReader | null): Promise<RFIDCardReader> {
    const config = { headers: {'Content-Type': 'application/json'} };
    const result = (await this.httpClient.getInstance()).post("/api/rfid/card-reader",currentRFIDCardReader,config).then(res => { return res.data});
    return await result;
  }

  public async updateRFIDCardReader(currentRFIDCardReader: RFIDCardReader | null): Promise<RFIDCardReader> {
    const config = { headers: {'Content-Type': 'application/json'} };
    const result = (await this.httpClient.getInstance()).put("/api/rfid/card-reader",currentRFIDCardReader,config).then(res => { return res.data});
    return await result;
  }

  public async removeRFIDCardReader(id: number): Promise<unknown> {
    const config = { headers: {'Content-Type': 'application/json'} };
    const result = (await this.httpClient.getInstance()).delete("/api/rfid/card-reader/"+id, config).then(res => { return res.data});
    return await result
  }
}
