import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

export interface Marsupilami {
  _id: string;
  email: string;
  nom: string;
  age: number;
  famille: string;
  race: string;
  nourriture: string;
  exp: number;
}

interface TokenReponse {
  token: string;
}

export interface TokenPayload {
  email: string;
  password: string;
  nom?: string;
  age?: number;
  famille?: string;
  race?: string;
  nourriture?: string;
}

@Injectable({
  providedIn: 'root'
})


export class AuthentificationService {

  private token: string;

  constructor(private client: HttpClient, private router: Router) { }

  private getToken(): string {
    if (!this.token){
      this.token = localStorage.getItem('token');
    }
    return this.token;
  }

  private setToken(token: string): void {
    localStorage.setItem('token', token);
    this.token = token;
  }

  public deconnexion(): void {
    this.token = '';
    localStorage.removeItem('token');
    this.router.navigateByUrl('/');
  }

  public getMarsupilami(): Marsupilami {
    const token = this.getToken();
    let payload;
    if (token) {
      payload = token.split('.')[1];
      payload = atob(payload);
      return JSON.parse(payload);
    } else {
      return null;
    }
  }

  public estConnecte(): boolean {
    const marsupilami = this.getMarsupilami();
    if (marsupilami) {
      return marsupilami.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }

  private request(
    method: 'post' | 'get',
    type: 'connexion' | 'inscription' | 'profile',
    user?: TokenPayload
  ): Observable<any> {
    let db;

    if (method === 'post') {
      db = this.client.post(`/api/${type}`, user);
    } else {
      db = this.client.get(`/api/${type}`, {
        headers: { Authorization: `Bearer ${this.getToken()}` }
      });
    }

    const request = db.pipe(
      map((data: TokenReponse) => {
        if (data.token) {
          this.setToken(data.token);
        }
        return data;
      })
    );

    return request;
  }

  public inscription(user: TokenPayload): Observable<any> {
    return this.request('post', 'inscription', user);
  }

  public connexion(user: TokenPayload): Observable<any> {
    return this.request('post', 'connexion', user);
  }

  public profile(): Observable<any> {
    return this.request('get', 'profile');
  }
}
