import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginResponse, RegisterResponse } from '../Models/Types';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  private endpoint = environment.backendEndpoint;

  constructor(private httpClient: HttpClient) { }

  register(user: { username: string, password: string }) {
    return this.httpClient.post<RegisterResponse>(`${this.endpoint}/register`, user);
  }

  login(user: { username: string, password: string }) {
    return this.httpClient.post<LoginResponse>(`${this.endpoint}/login`, user);
  }
}
