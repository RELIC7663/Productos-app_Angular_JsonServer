import { ApplicationConfig, provideZonelessChangeDetection } from '@angular/core'; // <--- Change here
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http'; // Removed withInterceptors for brevity, add back if needed
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [
    // Configuración de detección de cambios (Zoneless)
    provideZonelessChangeDetection(), // <--- Use this for zoneless
    
    // Configuración del router
    provideRouter(routes),
    
    // Hidratación para SSR con replay de eventos
    provideClientHydration(withEventReplay()),
    
    // HttpClient con fetch
    provideHttpClient(
      withFetch(),
    ),
  ]
};