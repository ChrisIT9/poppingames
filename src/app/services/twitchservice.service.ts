import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TwitchClipResponse, TwitchGameResponse } from '../Models/Types';
@Injectable({
    providedIn: 'root'
})
export class TwitchserviceService {
    endpoint = environment.twitchEndpoint;
    clientId = environment.twitchClientId;
    accessToken = environment.twitchAccessToken;

    constructor(private httpClient: HttpClient) { }

    getIdByName(name: string) { 
        return this.httpClient.get<TwitchGameResponse>(`
    ${this.endpoint}/games?name=${name}`, 
        { headers: { "Authorization": `Bearer ${this.accessToken}`, "Client-Id": `${this.clientId}` } })
    }

    getClipsById(id: string) {
        const today = new Date();
        let lastMonth = new Date();
        lastMonth.setDate(today.getDate() - 30);

        return this.httpClient.get<TwitchClipResponse>(
        `${this.endpoint}/clips?game_id=${id}&started_at=${lastMonth.toISOString()}&ended_at=${new Date().toISOString()}&first=10`, 
        { headers: { "Authorization": `Bearer ${this.accessToken}`, "Client-Id": `${this.clientId}` } })
    }
}
