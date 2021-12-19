import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { GameResponse, Response } from '../Models/Types';

interface Options {
    limit?: number
}

@Injectable({
  providedIn: 'root'
})
export class RawgService {
  private endpoint = environment.rawgEndpoint;

  constructor(private httpClient: HttpClient) { }

  getGames(options?: Options) {
    const limit = options?.limit || 30;
    return this.httpClient.get<Response<GameResponse>>(`${this.endpoint}&page_size=${limit}`);
  }

  getCachedGames() {
    return this.httpClient.get<Response<GameResponse>>(`${environment.backendEndpoint}/games`);
  }

  searchGames(query: string, options?: Options) {
    const limit = options?.limit || 30;
    return this.httpClient.get<Response<GameResponse>>(`${this.endpoint}&search=${query}&page_size=${limit}&search_precise=true`);
  }
}
