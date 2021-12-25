import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { BackendResponse, GameResponse } from 'src/app/Models/Types';
import { BackendService } from 'src/app/services/backend.service';
import { CacheService } from 'src/app/services/cache.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { RawgService } from 'src/app/services/rawg.service';

@Component({
    selector: 'app-gaming',
    templateUrl: './gaming.component.html',
    styleUrls: ['./gaming.component.scss'],
    providers: []
})
export class GamingComponent implements OnInit, OnDestroy {
    games: GameResponse[] = new Array();
    username = localStorage.getItem("username");
    query: string | undefined;
    loading = false;
    hasSearched = false;
    noResults = true;
    backendOnline = false;

    constructor(
        private activatedRoute: ActivatedRoute, private rawgService: RawgService, private router: Router, 
        public localStorageService: LocalstorageService, private backendService: BackendService,
        private cacheService: CacheService
    ) { 
        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd && this.backendOnline && event.url.search(new RegExp("poppingames\/game\/.*")) === -1) 
                this.init();
        })
    }

    setWindowTitle(gameName: string) {
        document.title = `PoppinGames - ${gameName}`;
    }

    private search() {
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

    private getGames(res?: BackendResponse) {
        if (!res?.isLoggedIn) localStorage.clear();
        this.backendOnline = true;
        this.init();
    }

    private handleErrors(err: HttpErrorResponse) {
        console.log(err);
        localStorage.clear();
        const fatalError = document.getElementById("fatal-error");
        if (fatalError) fatalError.style.display = "flex";
    }
  
    private init() {
        this.loading = true;
        this.hasSearched = false;
        this.query = undefined;
        this.noResults = true;
        this.games.splice(0);

        const queryParams = this.activatedRoute.snapshot.queryParams;

        if (this.cacheService.cacheAvailable()) {
            this.games = this.cacheService.getCachedGames();
            if (this.games.length > 0) this.noResults = false;
            if (queryParams['name']) {
                this.hasSearched = true;
                this.query = queryParams['name'];
                this.setWindowTitle(this.query!);
            } 
            this.loading = false;
        } 
        else if (queryParams['name']) {
            this.query = queryParams['name'];
            this.setWindowTitle(this.query!);
            this.search();
        } else {
            this.rawgService
            .getGames()
            .subscribe(res => {
                document.title = "PoppinGames";
                this.games = res.results;
                this.loading = false;
                if (this.games.length > 0) this.noResults = false;
            })
        }   
    }

    ngOnInit(): void {
        this.backendService
            .getHome()
            .subscribe({ next: this.getGames.bind(this), error: this.handleErrors.bind(this) });
    }

    ngOnDestroy(): void {
        this.backendOnline = false;
    }


    reset() {
        this.router.navigate([], { relativeTo: this.activatedRoute, queryParams: { name: null }, queryParamsHandling: 'merge' });
    }

    initSearch() {
        this.router.navigate([], { relativeTo: this.activatedRoute, queryParams: { name: this.query }, queryParamsHandling: 'merge' })
    }

    cacheGames() {
        this.cacheService.setCache(this.games);
    }

}
