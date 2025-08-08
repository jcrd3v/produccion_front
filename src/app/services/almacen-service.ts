import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlmacenService {

  apiMateriales = "http://localhost:8080/almacen/materiales";

  constructor(private readonly http:HttpClient){}

  obtenerMateriales(): Observable<any>{
    return this.http.get(this.apiMateriales);
  }

  añadirMaterial(body: any): Observable<any> {
    return this.http.post(this.apiMateriales, body);
  }

  actualizarStockMaterial(idMaterial: number, cantidad: number): Observable<any> {
    return this.http.patch(`${this.apiMateriales}/${idMaterial}/stock`, { cantidad: cantidad });
  }
  
}