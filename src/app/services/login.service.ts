import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  myAppUrl: string;
  myApiUrl: string;
  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = '/api/login';
  }

  login(usuario: Usuario): Observable<any> {
    return this.http.post(this.myAppUrl + this.myApiUrl, usuario)
  }

  setLocalStorage(data: any): void {
    localStorage.setItem('nombreUsuario', data)
  }

  getNombreUsuario(): string {
    return localStorage.getItem('nombreUsuario')!;
  }

  removeLocalStorage(): void {
    localStorage.removeItem('nombreUsuario');
  }
}
