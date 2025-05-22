import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { environment } from '@env/environment.development';
import { User } from '@models/user.model';
import { checkToken } from '../interceptors/token.interceptor';

// Add interfaces for user operations
export interface CreateUserDto {
    name: string;
    email: string;
    password: string;
    role: number;
}

export interface UpdateUserDto {
    name?: string;
    email?: string;
    role?: number;
}

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

    createUser(user: CreateUserDto) {
        return this._http.post<User>(this.apiUrl, user, { context: checkToken() });
    }

    updateUser(id: number, user: UpdateUserDto) {
        return this._http.put<User>(`${this.apiUrl}/${id}`, user, { context: checkToken() });
    }

    deleteUser(id: number) {
        return this._http.delete(`${this.apiUrl}/${id}`, { context: checkToken() });
    }
}
