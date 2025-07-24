import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoService } from '../../services/producto';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-editar-producto',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatDividerModule
  ],
  templateUrl: './editar-producto.component.html',
  styleUrls: ['./editar-producto.component.scss']
})
export class EditarProductoComponent implements OnInit {
  productoForm: FormGroup;
  isEditMode = false;
  productoId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private productoService: ProductoService
  ) {
    this.productoForm = this.fb.group({
      nombre: ['', Validators.required],
      precio: ['', [Validators.required, Validators.min(0.01)]],
      descripcion: ['']
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.productoId = +params['id'];
        this.cargarProducto(this.productoId);
      }
    });
  }

  cargarProducto(id: number) {
    this.productoService.getProducto(id).subscribe({
      next: (producto) => this.productoForm.patchValue(producto),
      error: (err) => console.error('Error cargando producto', err)
    });
  }

  guardarProducto() {
    if (this.productoForm.invalid) return;

    const productoData = this.productoForm.value;

    if (this.isEditMode && this.productoId) {
      this.productoService.actualizarProducto(this.productoId, productoData).subscribe({
        next: () => this.router.navigate(['/']),
        error: (err) => console.error('Error actualizando producto', err)
      });
    } else {
      this.productoService.crearProducto(productoData).subscribe({
        next: () => this.router.navigate(['/']),
        error: (err) => console.error('Error creando producto', err)
      });
    }
  }
}