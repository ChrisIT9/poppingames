import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalstorageService } from 'src/app/services/localstorage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  username = localStorage.getItem("username");
  @Input() location: string | undefined

  constructor(private router: Router, public localStorageService: LocalstorageService) { }

  ngOnInit(): void {
  }

  logout() {
    localStorage.clear();
    document.cookie="connect.sid=; Path=/; Max-Age=0";
    this.router.navigateByUrl("/gaming/login");
  }
}
