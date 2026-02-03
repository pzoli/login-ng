import { Injectable } from '@angular/core';
import axios from 'axios';
import {KeycloakService} from 'keycloak-angular';
import {HttpClient} from '@angular/common/http';
import {HttpClientService} from './http-client.service';
import { RFIDCardUser } from './rfid-card-user.service';
import { RFIDCardReader } from './rfid-card-reader.service ';

export interface RFIDLogEntry {
  id: number;
  rfidCardUser: RFIDCardUser;
  rfidCardReader: RFIDCardReader;
  logDate: Date;
}

@Injectable({
  providedIn: 'root'
})
export class RFIDLogEntryService {

  constructor(public httpClient: HttpClientService) {

  }

  public async getRFIDLogEntries(): Promise<RFIDLogEntry[]> {
    const result = (await this.httpClient.getInstance()).get("/api/rfid/logentry",{}).then(res => { return res.data});
    return await result;
  }

  public async saveRFIDLogEntry(currentRFIDLogEntry: RFIDLogEntry | null): Promise<RFIDLogEntry> {
    const config = { headers: {'Content-Type': 'application/json'} };
    const result = (await this.httpClient.getInstance()).post("/api/rfid/logentry",currentRFIDLogEntry,config).then(res => { return res.data});
    return await result;
  }

  public async updateRFIDLogEntry(currentRFIDLogEntry: RFIDLogEntry | null): Promise<RFIDLogEntry> {
    const config = { headers: {'Content-Type': 'application/json'} };
    const result = (await this.httpClient.getInstance()).put("/api/rfid/logentry",currentRFIDLogEntry,config).then(res => { return res.data});
    return await result;
  }

  public async removeRFIDLogEntry(id: number): Promise<unknown> {
    const config = { headers: {'Content-Type': 'application/json'} };
    const result = (await this.httpClient.getInstance()).delete("/api/rfid/logentry/"+id, config).then(res => { return res.data});
    return await result
  }
}
