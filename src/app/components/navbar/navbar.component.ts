import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendService } from 'src/app/services/backend.service';
import { CacheService } from 'src/app/services/cache.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
    localStorage: Storage | undefined;

    private redirect() {
        localStorage.clear();
        this.router.navigate([], { relativeTo: this.activatedRoute.parent, queryParamsHandling: 'preserve' })
    }

    constructor(private cacheService: CacheService, private activatedRoute: ActivatedRoute, public router: Router, private backendService: BackendService, public localStorageService: LocalstorageService) { }

    ngOnInit(): void {
        this.localStorage = this.localStorageService.getLocalStorage();
    }

    logout() {
        this.backendService
            .logout()
            .subscribe({ next: this.redirect.bind(this) });
    }

    clearCache() {
        this.cacheService.getCachedGames();
    }
}
