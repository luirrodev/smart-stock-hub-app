import { Injectable } from '@angular/core';
import { getCookie, setCookie, removeCookie } from 'typescript-cookie';

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
}
