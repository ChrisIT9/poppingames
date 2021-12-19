import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Input() username: string | null = null;
  @Input() location: string | undefined

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  logout() {
    localStorage.clear();
    this.router.navigateByUrl("/gaming/login");
  }
}
