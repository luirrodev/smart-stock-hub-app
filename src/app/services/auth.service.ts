import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment.development';
import { tap } from 'rxjs';
import { TokenService } from './token.service';
import { ResponseLogin } from '../models/auth.model';
import { User } from '@models/user.model';
import { checkToken } from '../interceptors/token.interceptor';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor() {}
    private readonly _http: HttpClient = inject(HttpClient);
    private readonly tokenService = inject(TokenService);

    login(email: string, password: string) {
        return this._http
            .post<ResponseLogin>(`${environment.apiUrl}/auth/login`, {
                email,
                password
            })
            .pipe(
                tap((response) => {
                    this.tokenService.saveToken(response.access_token);
                })
            );
    }

    logout() {
        this.tokenService.removeToken();
    }

    profile() {
        return this._http.get<User>(`${environment.apiUrl}/auth/profile`, { context: checkToken() });
    }
}
