// =====================================
// ARCHIVO: almacen.ts - CÓDIGO CORREGIDO
// =====================================

import { Component } from '@angular/core';
import { AlmacenService } from '../../services/almacen-service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-almacen',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './almacen.html',
  styleUrl: './almacen.css'
})
export class Almacen {

  materiales: any;
  materialSeleccionado: any;
  materialesSeleccionados: { 
    nombre: string, 
    stock: number, 
    cantidad: number,
    unidadMedida: string
  }[] = [];

  cantidadesForm: FormGroup;

  constructor(
    private readonly almacenService: AlmacenService,
    private fb: FormBuilder
  ) {
    this.cantidadesForm = this.fb.group({});
  }

  ngOnInit() {
    this.listarTodosMateriales();
  }

  listarMaterialesSeleccionados() {
    this.confirmarSeleccion()
  }

  listarTodosMateriales() {
    this.almacenService.obtenerMateriales().subscribe({
      next: (response: any) => {
        console.log(response);
        this.materiales = response;
        this.crearControles();
      },
      error: (error: any) => {
        console.log(error);
      }
    })
  }

  // 🔧 MÉTODO CORREGIDO
  crearControles() {
    const controles: any = {};
    this.materiales.forEach((material: any, index: number) => {
      // Usar el índice como clave en lugar del idMaterial
      controles[`material_${index}`] = this.fb.control(0);
    });
    this.cantidadesForm = this.fb.group(controles);
    
    console.log('Controles creados:', controles);
  }

  abrirModal(material: any) {
    this.materialSeleccionado = material;
    console.log('Material seleccionado:', material);
    
    // 🔧 AGREGAR: Encontrar el índice del material
    const index = this.materiales.findIndex((m: any) => m === material);
    console.log('Índice del material:', index);
    
    // 🔧 AGREGAR: Verificar el valor actual
    const cantidadActual = this.cantidadesForm.get(`material_${index}`)?.value;
    console.log('Cantidad actual en formulario:', cantidadActual);
  }

  // 🔧 MÉTODO CORREGIDO
  confirmarSeleccion() {
    // Encontrar el índice del material seleccionado
    const index = this.materiales.findIndex((m: any) => m === this.materialSeleccionado);
    
    if (index === -1) {
      console.error('No se encontró el material seleccionado');
      return;
    }
    
    // Obtener cantidad usando el índice
    const cantidad = this.cantidadesForm.get(`material_${index}`)?.value || 0;
    
    console.log('Índice:', index);
    console.log('Cantidad:', cantidad);
    console.log('Material:', this.materialSeleccionado);
    
    if (cantidad > 0) {
      // Verificar si ya existe
      const existeIndex = this.materialesSeleccionados.findIndex(
        item => item.nombre === this.materialSeleccionado.nombreMaterial
      );

      if (existeIndex !== -1) {
        // Actualizar cantidad existente
        this.materialesSeleccionados[existeIndex].cantidad = cantidad;
        console.log('Material actualizado');
      } else {
        // Agregar nuevo
        this.materialesSeleccionados.push({
          nombre: this.materialSeleccionado.nombreMaterial,
          stock: this.materialSeleccionado.stockMaterial,
          cantidad: cantidad,
          unidadMedida: this.materialSeleccionado.unidadMedidaMaterial
        });
        console.log('Material agregado');
      }
      
      console.log('Lista actualizada:', this.materialesSeleccionados);
    } else {
      console.log('Cantidad es 0 o inválida');
    }
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

  // 🔧 NUEVO: Método para quitar material de la lista
  quitarDeLista(index: number) {
    this.materialesSeleccionados.splice(index, 1);
    console.log('Material eliminado, lista actualizada:', this.materialesSeleccionados);
  }
}