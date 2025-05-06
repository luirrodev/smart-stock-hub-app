import { HttpInterceptorFn, HttpContextToken, HttpContext } from '@angular/common/http';
import { inject } from '@angular/core';

import { TokenService } from '@services/token.service';

const CHECK_TOKEN = new HttpContextToken<boolean>(() => false);

export function checkToken() {
    return new HttpContext().set(CHECK_TOKEN, true);
}

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
    const tokenService = inject(TokenService);
    const accessToken = tokenService.getToken();

    if (accessToken && req.context.get(CHECK_TOKEN)) {
        const authRequest = req.clone({
            headers: req.headers.set('Authorization', `Bearer ${accessToken}`)
        });
        return next(authRequest);
    }

    return next(req);
};
