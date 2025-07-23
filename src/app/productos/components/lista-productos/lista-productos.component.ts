import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../services/producto';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router'; // Ensure Router is imported
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-lista-productos',
  standalone: true, // You should specify standalone: true if it is a standalone component
  imports: [
    CommonModule,
    // Router, // You don't need to import Router here if you're injecting it and using routerLink elsewhere.
    ReactiveFormsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule
  ],
  templateUrl: './lista-productos.component.html',
  styleUrls: ['./lista-productos.component.scss']
})
export class ListaProductosComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nombre', 'precio', 'acciones'];
  dataSource = new MatTableDataSource<any>();

  constructor(
    private productoService: ProductoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos() {
    this.productoService.getProductos().subscribe({
      next: (data) => this.dataSource.data = data,
      error: (err) => console.error('Error cargando productos', err)
    });
  }

  // CHANGE THIS LINE
  editarProducto(id: number) {
    this.router.navigate(['/productos/editar', id]); // Correct path
  }

  eliminarProducto(id: number) {
    if (confirm('¿Estás seguro de eliminar este producto?')) {
      this.productoService.eliminarProducto(id).subscribe({
        next: () => this.cargarProductos(),
        error: (err) => console.error('Error eliminando producto', err)
      });
    }
  }
}