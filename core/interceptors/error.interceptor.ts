import { HttpInterceptorFn } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError(error => {
      console.error('Error interceptado:', error);
      // Aquí puedes agregar lógica para mostrar notificaciones al usuario
      return throwError(() => error);
    })
  );
};