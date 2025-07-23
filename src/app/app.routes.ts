import { Routes } from '@angular/router';
import { ListaProductosComponent } from './productos/components/lista-productos/lista-productos.component';
import { EditarProductoComponent } from './productos/components/editar-producto/editar-producto.component';
import { CrearProducto } from './productos/components/crear-producto/crear-producto.component';

export const routes: Routes = [
  { path: '', redirectTo: 'productos', pathMatch: 'full' },
  { path: 'productos', component: ListaProductosComponent },
  { path: 'productos/nuevo', component: CrearProducto },
  { path: 'productos/editar/:id', component: EditarProductoComponent },
];