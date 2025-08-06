import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AutenticacionService } from '../../services/autenticacion-service';

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
    private readonly autenticacionService:AutenticacionService
  ) {
    this.formAutenticacion = this.fb.group({
      nombreUsuario: ['', Validators.required],
      claveUsuario: ['', Validators.required]
    })
  }

  iniciarSesion(){
    this.autenticacionService.autenticarNombreUsuarioClaveUsuario(this.formAutenticacion.getRawValue()).subscribe({
      next: (response:any) => {
        console.log(this.formAutenticacion.value['nombreUsuario'], ' next');
        console.log(this.formAutenticacion.value['claveUsuario']);
        console.log(response);
        this.formAutenticacion.reset();
      },
      error: (e:any) => {
          console.log(this.formAutenticacion.value['nombreUsuario'], ' error');
          console.log(this.formAutenticacion.value['claveUsuario']);
        console.log(e);
      }
    })
  }

}
