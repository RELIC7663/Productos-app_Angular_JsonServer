// src/app/app.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterModule } from '@angular/router'; // <-- ADD RouterModule here

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterModule // <-- Make sure RouterModule is in this array!
  ],
  templateUrl: './app.html', // Or your inline template
  styleUrls: ['./app.scss']
})
export class AppComponent {
  title = 'productos-app';
}