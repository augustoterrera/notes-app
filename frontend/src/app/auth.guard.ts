import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    // Verifica si el código se ejecuta en el navegador
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        return true; // El usuario está autenticado
      }
    }
    // Redirige al login si no hay token o si no está en el navegador
    this.router.navigate(['/login']);
    return false;
  }
}
