import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { DetailedGameResponse, GameResponse, Response, ScreenshotResponse } from '../Models/Types';

interface Options {
    limit?: number
}

@Injectable({
    providedIn: 'root'
})
export class RawgService {
    private endpoint = environment.rawgEndpoint;
    private apiKey = environment.apiKey;

    constructor(private httpClient: HttpClient) { }

    getGames(options?: Options) {
        const limit = options?.limit || 30;
        return this.httpClient.get<Response<GameResponse>>(`${this.endpoint}?page_size=${limit}&key=${this.apiKey}`);
    }

    getCachedGames() {
        return this.httpClient.get<Response<GameResponse>>(`${environment.backendEndpoint}/games`);
    }

    getGameById(id: string) {
        return this.httpClient.get<DetailedGameResponse>(`${this.endpoint}/${id}?key=${this.apiKey}`);
    }

    getCachedGameById(id: string) {
        return this.httpClient.get<DetailedGameResponse>(`${environment.backendEndpoint}/games/${id}`);
    }

    searchGames(query: string, options?: Options) {
        const limit = options?.limit || 30;
        return this.httpClient.get<Response<GameResponse>>(`${this.endpoint}?search=${query}&page_size=${limit}&key=${this.apiKey}`);
    }

    getCachedScreenshots(id: string) {
        return this.httpClient.get<ScreenshotResponse>(`${environment.backendEndpoint}/games/${id}/screenshots?key=${this.apiKey}`);
    }

    getScreenshots(id: string) {
        return this.httpClient.get<ScreenshotResponse>(`${this.endpoint}/${id}/screenshots?key=${this.apiKey}`);
    }
  
}
