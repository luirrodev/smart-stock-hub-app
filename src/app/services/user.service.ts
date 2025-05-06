import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { environment } from '@env/environment.development';
import { User } from '@models/user.model';
import { checkToken } from '../interceptors/token.interceptor';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private readonly _http = inject(HttpClient);
    private readonly apiUrl = `${environment.apiUrl}/users`;

    getAllUsers() {
        return this._http.get<User[]>(this.apiUrl, { context: checkToken() });
    }

    getUserById(id: number) {
        return this._http.get<User>(`${this.apiUrl}/${id}`, { context: checkToken() });
    }
}
