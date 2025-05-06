import { Injectable } from '@angular/core';
import { getCookie, setCookie, removeCookie } from 'typescript-cookie';
import { jwtDecode } from 'jwt-decode';

@Injectable({
    providedIn: 'root'
})
export class TokenService {
    constructor() {}

    saveToken(token: string) {
        setCookie('stock-access-token', token, {
            expires: 1,
            path: '/'
        });
    }

    getToken() {
        return getCookie('stock-access-token');
    }

    removeToken() {
        removeCookie('stock-access-token');
    }

    isValidToken() {
        const token = this.getToken();
        if (!token) {
            return false;
        }
        const decodedToken = jwtDecode(token);

        if (decodedToken && decodedToken?.exp) {
            const tokenDate = new Date(0);
            tokenDate.setUTCSeconds(decodedToken.exp);
            const today = new Date();

            return tokenDate.getTime() > today.getTime();
        }
        return false;
    }
}
