import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterResponse } from 'src/app/Models/Types';
import { BackendService } from 'src/app/services/backend.service';
import { sleep } from 'src/app/Utils/Timer';


@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
    username: string | undefined;
    password: string | undefined;
    errors: string[] = [];

    constructor(private backendService: BackendService, private router: Router) { }

    private redirect(err: HttpErrorResponse) {
        if (!err.status || err.status === 500) {
            console.log(err);
            localStorage.clear();
            const fatalError = document.getElementById("fatal-error");
            if (fatalError) fatalError.style.display = "flex";
        }
        else this.router.navigateByUrl('/poppingames');
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

    private async redirectToLogin(res: RegisterResponse) {
        const successDiv = document.getElementById("success");
        if (successDiv) successDiv.style.height = "100%";
        await sleep(1500);
        return this.router.navigateByUrl('/poppingames/login');
    }
  
    private getErrors({ error: { message, errors } }: HttpErrorResponse) {
        message && this.errors.push(message);
        errors && this.errors.push(...errors);
    }

    ngOnInit(): void {
        this.backendService
            .getRegister()
            .subscribe({ error: this.redirect.bind(this) });
    }

    register() {
        this.errors.splice(0);
        const usernameIsValid = this.isValidUsername();
        const passwordIsValid = this.isValidPassword();
        if (usernameIsValid && passwordIsValid) {
            this.backendService
                .register({ username: this.username!, password: this.password! })
                .subscribe({ next: this.redirectToLogin.bind(this), error: this.getErrors.bind(this) });
        }
    }

}
