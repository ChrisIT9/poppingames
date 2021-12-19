import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameResponse } from 'src/app/Models/Types';
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

  constructor(private rawgService: RawgService, private router: Router) { }

  ngOnInit(): void {
    if (!Boolean(localStorage.getItem("isAdmin"))) 
      this.router.navigateByUrl("/gaming/login");
    else
      this.rawgService
        .getCachedGames()
        .subscribe(res => {
          this.games = res.results;
        })
  }

  logout() {
    localStorage.clear();
    this.router.navigateByUrl("/gaming/login");
  }

  search() {
    if (this.query !== undefined && this.query != "") {
      this.rawgService
      .searchGames(this.query)
      .subscribe(res => {
        this.games = res.results;
      })
    }
  }

}
