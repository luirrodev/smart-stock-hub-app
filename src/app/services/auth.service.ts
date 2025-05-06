import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment.development';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor() {}
    _http: HttpClient = inject(HttpClient);

    login(email: string, password: string) {
        return this._http.post(`${environment.apiUrl}/auth/login`, {
            email,
            password
        });
    }
}
