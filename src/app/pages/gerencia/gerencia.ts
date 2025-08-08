import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GerenciaService } from '../../services/gerencia-service';
import { Navbar } from '../../shared/navbar/navbar';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gerencia',
  imports: [CommonModule, ReactiveFormsModule, Navbar],
  templateUrl: './gerencia.html',
  styleUrl: './gerencia.css'
})
export class Gerencia implements OnInit {

  formPedido: FormGroup;
  pedidos: any[] = [];
  private intervalId: any;

  constructor(
    private readonly fb: FormBuilder,
    private readonly gerenciaService: GerenciaService
  ) {
    this.formPedido = this.fb.group({
      nombrePedido: ['', Validators.required],
      descripcionPedido: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.listarPedidos();
    this.intervalId = setInterval(() => this.listarPedidos(), 5000);
  }

  enviarPedido() {
    if (!this.formPedido.valid) return;
    
    this.gerenciaService.crearPedido(this.formPedido.getRawValue()).subscribe({
      next: () => {
        this.formPedido.reset();
        this.listarPedidos();
        Swal.fire({
        title: "Pedido enviado correctamente!",
        icon: "success"
      });
      },
      error: (error: any) => {
        Swal.fire({
        title: "No se pudo enviar el pedido!",
        icon: "error"
      });
      }
    });
  }

  listarPedidos() {
    this.gerenciaService.obtenerPedidos().subscribe({
      next: (response: any) => this.pedidos = response,
      error: (error: any) => console.error('Error al obtener pedidos:', error)
    });
  }
}