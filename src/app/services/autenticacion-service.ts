import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {

  urlAutenticacion = "http://localhost:8080/auth/autenticacion";

  constructor(private readonly http:HttpClient) {}

  autenticarNombreUsuarioClaveUsuario(body:any):Observable<any> {
    return this.http.post(this.urlAutenticacion, body);
  }

}
