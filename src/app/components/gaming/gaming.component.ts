import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { GameResponse } from 'src/app/Models/Types';
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

  constructor(private rawgService: RawgService, private router: Router, public localStorageService: LocalstorageService) { }

  private init() {
    document.title = "PoppinGames";
    this.loading = true;
    this.hasSearched = false;
    this.query = undefined;
    this.rawgService
      .getCachedGames()
      .subscribe(res => {
        this.games = res.results;
        this.loading = false;
        if (this.games.length > 0) this.noResults = false;
      })
  }


  ngOnInit(): void {
    if (!localStorage.getItem("username"))  
      this.router.navigateByUrl("/gaming/login");
    else this.init();
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
