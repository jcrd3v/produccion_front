import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AutenticacionService } from '../../services/autenticacion-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-autenticacion',
  imports: [ReactiveFormsModule],
  templateUrl: './autenticacion.html',
  styleUrl: './autenticacion.css'
})
export class Autenticacion {

  public formAutenticacion:FormGroup;

  constructor(
    private readonly fb:FormBuilder, 
    private readonly autenticacionService:AutenticacionService,
    private router: Router
  ) {
    this.formAutenticacion = this.fb.group({
      nombreUsuario: ['', Validators.required],
      claveUsuario: ['', Validators.required]
    })
  }

  iniciarSesion(){
    this.autenticacionService.autenticarNombreUsuarioClaveUsuario(this.formAutenticacion.getRawValue()).subscribe({
      next: (response:any) => {
        console.log(response.mensaje);
        this.formAutenticacion.reset(); // limpiar formulario de autenticación
        this.router.navigate(['/almacen']) // redirigir hacia almacén
      },
      error: (e:any) => {
        console.log(e.error.mensaje);
      }
    })
  }

}
