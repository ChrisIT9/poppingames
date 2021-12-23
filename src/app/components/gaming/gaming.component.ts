import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackendResponse, GameResponse } from 'src/app/Models/Types';
import { BackendService } from 'src/app/services/backend.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { RawgService } from 'src/app/services/rawg.service';

@Component({
  selector: 'app-gaming',
  templateUrl: './gaming.component.html',
  styleUrls: ['./gaming.component.scss']
})
export class GamingComponent implements OnInit {
  games: GameResponse[] = new Array();
  username = localStorage.getItem("username");
  query: string | undefined;
  loading = false;
  hasSearched = false;
  noResults = true;

  constructor(private rawgService: RawgService, private router: Router, public localStorageService: LocalstorageService, private backendService: BackendService) { }

  private handleErrors(err: HttpErrorResponse) {
    console.log(err);
    localStorage.clear();
    const fatalError = document.getElementById("fatal-error");
    if (fatalError) fatalError.style.display = "flex";
  }
  
  private init(res?: BackendResponse) {
    if (!res?.isLoggedIn) localStorage.clear();
    
    document.title = "PoppinGames";
    this.loading = true;
    this.hasSearched = false;
    this.query = undefined;
    this.rawgService
      .getGames()
      .subscribe(res => {
        this.games = res.results;
        this.loading = false;
        if (this.games.length > 0) this.noResults = false;
      })
  }

  ngOnInit(): void {
    this.backendService
    .getHome()
    .subscribe({ next: this.init.bind(this), error: this.handleErrors.bind(this) });
  }

  search() {
    if (this.query !== undefined && this.query != "") {
      this.noResults = false;
      this.hasSearched = true;
      this.loading = true;
      this.games.splice(0);
      this.rawgService
      .searchGames(this.query)
      .subscribe(res => {
        this.games = res.results;
        this.loading = false;
        if (this.games.length === 0) this.noResults = true;
      })
    }
  }

  reset() {
    this.init();
  }

}
