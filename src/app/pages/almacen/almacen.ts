import { Component } from '@angular/core';
import { AlmacenService } from '../../services/almacen-service';
import { GerenciaService } from '../../services/gerencia-service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { Navbar } from '../../shared/navbar/navbar';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-almacen',
  imports: [CommonModule, ReactiveFormsModule, Navbar],
  templateUrl: './almacen.html',
  styleUrl: './almacen.css'
})
export class Almacen {

  materiales: any;
  materialSeleccionado: any;
  materialesSeleccionados: { 
    id: number,
    nombre: string, 
    stock: number, 
    cantidad: number,
    unidadMedida: string
  }[] = [];

  pedidosPendientes: any[] = [];
  cantidadesForm: FormGroup;

  constructor(
    private readonly almacenService: AlmacenService,
    private readonly gerenciaService: GerenciaService,
    private fb: FormBuilder
  ) {
    this.cantidadesForm = this.fb.group({});
  }

  ngOnInit() {
    this.listarTodosMateriales();
    this.listarPedidosPendientes();
  }

  listarPedidosPendientes() {
    this.gerenciaService.obtenerPedidos().subscribe({
      next: (response: any) => {
        this.pedidosPendientes = response.filter((pedido: any) => pedido.estadoPedido === 'PENDIENTE');
      },
      error: (error: any) => console.error('Error al obtener pedidos:', error)
    });
  }

  private actualizarEstadoPedido(pedido: any, estado: string, mensaje: string) {
    this.gerenciaService.actualizarEstadoPedido(pedido.idPedido, estado).subscribe({
      next: () => {
        this.listarPedidosPendientes();
        Swal.fire({
        title: "Estado del pedido enviado",
        icon: "success"
      });  
      },
      error: (error: any) => {
        Swal.fire({
        title: "No se pudo",
        icon: "success"
      }); 
      }
    });
  }

  aceptarPedido(pedido: any) {
    this.actualizarEstadoPedido(pedido, 'ACEPTADO', 'Pedido aceptado correctamente');
  }

  rechazarPedido(pedido: any) {
    this.actualizarEstadoPedido(pedido, 'RECHAZADO', 'Pedido rechazado correctamente');
  }

  listarTodosMateriales() {
    this.almacenService.obtenerMateriales().subscribe({
      next: (response: any) => {
        this.materiales = response;
        this.crearControles();
      },
      error: (error: any) => console.log(error)
    })
  }

  crearControles() {
    const controles: any = {};
    this.materiales.forEach((material: any, index: number) => {
      controles[`material_${index}`] = this.fb.control(0);
    });
    this.cantidadesForm = this.fb.group(controles);
  }

  abrirModal(material: any) {
    this.materialSeleccionado = material;
  }

  confirmarSeleccion() {
    const index = this.materiales.findIndex((m: any) => m === this.materialSeleccionado);
    if (index === -1) return;
    
    const cantidad = this.cantidadesForm.get(`material_${index}`)?.value || 0;
    
    if (cantidad > 0) {
      const existeIndex = this.materialesSeleccionados.findIndex(
        item => item.nombre === this.materialSeleccionado.nombreMaterial
      );

      if (existeIndex !== -1) {
        this.materialesSeleccionados[existeIndex].cantidad = cantidad;
      } else {
        this.materialesSeleccionados.push({
          id: this.materialSeleccionado.idMaterial,
          nombre: this.materialSeleccionado.nombreMaterial,
          stock: this.materialSeleccionado.stockMaterial,
          cantidad: cantidad,
          unidadMedida: this.materialSeleccionado.unidadMedidaMaterial
        });
      }
    }
  }

  enviarTodoAProduccion() {
    if (this.materialesSeleccionados.length === 0) {
        Swal.fire({
        title: "No hay materiales seleccionados",
        icon: "warning"
      }); 
      return;
    }

    const materialesParaActualizar = [...this.materialesSeleccionados];
    this.materialesSeleccionados = [];
    
      Swal.fire({
        title: "Materiales enviados a producción exitosamente",
        icon: "success"
      }); 

    // Actualizar stocks
    let materialesProcesados = 0;
    const totalMateriales = materialesParaActualizar.length;

    materialesParaActualizar.forEach(material => {
      this.almacenService.actualizarStockMaterial(material.id, material.cantidad).subscribe({
        next: () => {
          if (++materialesProcesados === totalMateriales) {
            this.listarTodosMateriales();
          }
        },
        error: () => {
          if (++materialesProcesados === totalMateriales) {
            this.listarTodosMateriales();
          }
        }
      });
    });
  }

  validarCantidad(event: Event, max: number): number {
    const input = event.target as HTMLInputElement;
    const valor = parseFloat(input.value);
    if (!isNaN(valor) && valor > max) {
      input.value = max.toString();
      return max;
    }
    return 0;
  }

  quitarDeLista(index: number) {
    this.materialesSeleccionados.splice(index, 1);
  }
}