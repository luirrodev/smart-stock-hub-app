import { HttpInterceptorFn, HttpContextToken, HttpContext, HttpRequest, HttpHandlerFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { switchMap } from 'rxjs';

import { AuthService } from '@services/auth.service';
import { TokenService } from '@services/token.service';

const CHECK_TOKEN = new HttpContextToken<boolean>(() => false);

export function checkToken() {
    return new HttpContext().set(CHECK_TOKEN, true);
}

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
    const tokenService = inject(TokenService);

    if (req.context.get(CHECK_TOKEN)) {
        const isValidToken = tokenService.isValidToken();
        if (isValidToken) {
            return addToken(req, next, tokenService);
        } else {
            return updateToken(req, next, tokenService);
        }
    }
    return next(req);
};

function addToken(req: HttpRequest<unknown>, next: HttpHandlerFn, tokenService: TokenService) {
    const accessToken = tokenService.getToken();

    if (accessToken) {
        const authRequest = req.clone({
            headers: req.headers.set('Authorization', `Bearer ${accessToken}`)
        });
        return next(authRequest);
    }

    return next(req);
}

function updateToken(req: HttpRequest<unknown>, next: HttpHandlerFn, tokenService: TokenService) {
    const authService = inject(AuthService);
    const refreshToken = tokenService.getRefreshToken();
    const isValidRefreshToken = tokenService.isValidRefreshToken();

    if (refreshToken && isValidRefreshToken) {
        return authService.refreshToken().pipe(
            switchMap(() => {
                return addToken(req, next, tokenService);
            })
        );
    }

    return next(req);
}
