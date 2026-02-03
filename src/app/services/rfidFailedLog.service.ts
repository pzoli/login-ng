import { Injectable } from '@angular/core';
import axios from 'axios';
import {KeycloakService} from 'keycloak-angular';
import {HttpClient} from '@angular/common/http';
import {HttpClientService} from './http-client.service';
import { RFIDCardUser } from './rfid-card-user.service';
import { RFIDCardReader } from './rfid-card-reader.service ';

export interface RFIDFailedLog {
  id: number;
  rfidCardReaderId: string;
  rfidCardRfId: string;
  logDate: Date;
}

@Injectable({
  providedIn: 'root'
})
export class RFIDFailedLogService {

  constructor(public httpClient: HttpClientService) {

  }

  public async getRFIDFailedLogs(): Promise<RFIDFailedLog[]> {
    const result = (await this.httpClient.getInstance()).get("/api/rfid/failedlog",{}).then(res => { return res.data});
    return await result;
  }

  public async saveRFIDFailedLog(currentRFIDFailedLogEntry: RFIDFailedLog | null): Promise<RFIDFailedLog> {
    const config = { headers: {'Content-Type': 'application/json'} };
    const result = (await this.httpClient.getInstance()).post("/api/rfid/failedlog",currentRFIDFailedLogEntry,config).then(res => { return res.data});
    return await result;
  }

  public async updateRFIDFailedLog(currentRFIDFailedLogEntry: RFIDFailedLog | null): Promise<RFIDFailedLog> {
    const config = { headers: {'Content-Type': 'application/json'} };
    const result = (await this.httpClient.getInstance()).put("/api/rfid/failedlog",currentRFIDFailedLogEntry,config).then(res => { return res.data});
    return await result;
  }

  public async removeRFIDFailedLog(id: number): Promise<unknown> {
    const config = { headers: {'Content-Type': 'application/json'} };
    const result = (await this.httpClient.getInstance()).delete("/api/rfid/failedlog/"+id, config).then(res => { return res.data});
    return await result
  }
}
