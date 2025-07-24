// src/app/productos/components/crear-producto/crear-producto.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router'; // For navigation after creation
import { ProductoService } from '../../services/producto'; // Adjust path if needed

// Angular Material Imports
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar'; // For showing success/error messages
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
@Component({
  selector: 'app-crear-producto',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule, // Important for using FormBuilder and FormGroup
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    MatCardModule,
  
    MatIconModule,
    MatDividerModule // For MatSnackBar
  ],
  templateUrl: './crear-producto.component.html', // Make sure this path is correct
  styleUrls: ['./crear-producto.component.scss'] // Make sure this path is correct
})
export class CrearProducto implements OnInit { // Renamed from CrearProductoComponent to CrearProducto for consistency with your app.routes.ts
  productoForm: FormGroup;
  isEditMode: boolean = false; // Por defecto en modo creación
  constructor(
    private fb: FormBuilder, // Used to build the form
    private productoService: ProductoService,
    private router: Router,
    private snackBar: MatSnackBar // Inject MatSnackBar
  ) {
    // Initialize the form with FormBuilder
    this.productoForm = this.fb.group({
      nombre: ['', Validators.required], // 'nombre' is required
      precio: ['', [Validators.required, Validators.min(0.01)]], // 'precio' is required and must be positive
      descripcion: [''] // Optional description
    });
  }

  ngOnInit(): void {
    // No specific initialization needed for creating, but good to have
  }

  /**
   * Handles form submission to create a new product.
   */
  onSubmit(): void {
    if (this.productoForm.valid) {
      // Get the form data
      const nuevoProducto = this.productoForm.value;

      // Call the service to create the product
      this.productoService.crearProducto(nuevoProducto).subscribe({
        next: (response) => {
          console.log('Producto creado exitosamente:', response);
          this.snackBar.open('Producto creado exitosamente', 'Cerrar', { duration: 3000 });
          // Navigate back to the product list after successful creation
          this.router.navigate(['/productos']);
        },
        error: (error) => {
          console.error('Error al crear el producto:', error);
          this.snackBar.open('Error al crear el producto', 'Cerrar', { duration: 3000 });
          // Optionally, handle specific error messages here
        }
      });
    } else {
      // If the form is invalid, mark all fields as touched to display validation errors
      this.productoForm.markAllAsTouched();
      this.snackBar.open('Por favor, completa todos los campos requeridos correctamente.', 'Cerrar', { duration: 3000 });
    }
  }

  /**
   * Navigates back to the product list without creating.
   */
  onCancel(): void {
    this.router.navigate(['/productos']);
  }
}