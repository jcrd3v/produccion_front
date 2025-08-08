import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GerenciaService {

  apiPedidos = "http://localhost:8080/pedidos";

  constructor(private readonly http: HttpClient) { }

  obtenerPedidos(): Observable<any> {
    return this.http.get(this.apiPedidos);
  }

  crearPedido(body: any): Observable<any> {
    return this.http.post(this.apiPedidos, body);
  }

  actualizarEstadoPedido(idPedido: number, estado: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    
    console.log('Enviando PATCH a:', `${this.apiPedidos}/${idPedido}/estado`);
    console.log('Con datos:', { estado: estado });
    
    return this.http.patch(`${this.apiPedidos}/${idPedido}/estado`, { estado: estado }, { headers });
  }
}