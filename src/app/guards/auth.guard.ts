import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '../services/token.service';
import { AuthService } from '@services/auth.service';
import { catchError, map, of } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
    const tokenService = inject(TokenService);
    const authService = inject(AuthService);
    const router = inject(Router);

    // Si el token de acceso es válido, permitir acceso inmediatamente
    if (tokenService.isValidToken()) {
        return true;
    }

    // Si el token de acceso no es válido pero hay un refresh token válido
    if (tokenService.isValidRefreshToken()) {
        return authService.refreshToken().pipe(
            map(() => {
                // Si el refresh fue exitoso, permitir la navegación
                return true;
            }),
            catchError(() => {
                // Si hubo un error al refrescar, redirigir al login
                router.navigate(['/auth/login']);
                return of(false);
            })
        );
    }
    // Si no hay tokens válidos, redirigir al login
    router.navigate(['/auth/login']);
    return false;
};
