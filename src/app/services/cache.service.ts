import { Injectable } from '@angular/core';
import { GameResponse } from '../Models/Types';

@Injectable({
  providedIn: 'root'
})
export class CacheService {
  cachedGames: GameResponse[] = new Array();

  setCache(games: GameResponse[]) {
    this.cachedGames = games;
  }

  getCachedGames() {
    return this.cachedGames.splice(0);
  }

  cacheAvailable() {
    return this.cachedGames.length > 0;
  }
 
  constructor() { }
}
