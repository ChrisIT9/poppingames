import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginResponse } from 'src/app/Models/Types';
import { BackendService } from 'src/app/services/backend.service';
import { sleep } from 'src/app/Utils/Timer';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username: string | undefined;
  password: string | undefined;
  errors: string[] = [];

  private async loginHandler(res: LoginResponse) {
    localStorage.setItem("username", res.username);
    localStorage.setItem("isAdmin", res.isAdmin.toString());
    localStorage.setItem("userId", res.userId);
    const successDiv = document.getElementById("success");
    if (successDiv) successDiv.style.height = "100%";
    await sleep(1500);
    return this.router.navigateByUrl('/gaming');
  }

  private isValidUsername() {
    if (this.username !== undefined && this.username.trim().length >= 5) return true;
   
    this.errors.push("L'username deve contenere almeno 5 caratteri!");
    return false;
  }

  private isValidPassword() {
    if (this.password !== undefined && this.password.trim().length >= 6) return true;

    this.errors.push("La password deve contenere almeno 6 caratteri!");
    return false;
  }


  private getErrors({ error: { message, errors } }: HttpErrorResponse) {
    message && this.errors.push(message);
    errors && this.errors.push(...errors);
  }

  constructor(private backendService: BackendService, private router: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem("username")) this.router.navigateByUrl('/gaming');
  }

  login() {
    this.errors.splice(0);
    const usernameIsValid = this.isValidUsername();
    const passwordIsValid = this.isValidPassword();
    if (usernameIsValid && passwordIsValid) {
      this.backendService
      .login({ username: this.username!, password: this.password! })
      .subscribe({ next: this.loginHandler.bind(this), error: this.getErrors.bind(this) });
    }
  }

}
