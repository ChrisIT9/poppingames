import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from 'src/app/services/backend.service';
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
        this.router.navigateByUrl("/poppingames");
    }

    constructor(private router: Router, private backendService: BackendService, public localStorageService: LocalstorageService) { }

    ngOnInit(): void {
        this.localStorage = this.localStorageService.getLocalStorage();
    }

    logout() {
        this.backendService
            .logout()
            .subscribe({ next: this.redirect.bind(this) });
    }
}
