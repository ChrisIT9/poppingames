import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BackendResponse, LoginResponse, RegisterResponse, Review } from '../Models/Types';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  private endpoint = environment.backendEndpoint;

  constructor(private httpClient: HttpClient) { }

  getLogin() {
    return this.httpClient.get(`${this.endpoint}/login`, { withCredentials: true });
  }

  getRegister() {
    return this.httpClient.get(`${this.endpoint}/register`, { withCredentials: true });
  }

  getHome() {
    return this.httpClient.get<BackendResponse>(`${this.endpoint}/`, { withCredentials: true });
  }

  register(user: { username: string, password: string }) {
    return this.httpClient.post<RegisterResponse>(`${this.endpoint}/register`, user);
  }

  login(user: { username: string, password: string }) {
    return this.httpClient.post<LoginResponse>(`${this.endpoint}/login`, user, { withCredentials: true });
  }

  getReviews(gameId: string) {
    return this.httpClient.get<Review[]>(`${this.endpoint}/reviews/${gameId}`);
  }

  sendReview(review: Partial<Review>) {
    return this.httpClient.post<Review>(`${this.endpoint}/reviews/${review.gameId}`, review, { withCredentials: true })
  }

  logout() {
    return this.httpClient.post(`${this.endpoint}/logout`, {}, { withCredentials: true });
  }
}
