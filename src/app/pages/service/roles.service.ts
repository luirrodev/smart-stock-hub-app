import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { CreateRoleDto, Role, UpdateRoleDto } from '../../models/roles.model';

@Injectable({
    providedIn: 'root'
})
export class RoleService {
    private _http = inject(HttpClient);
    private apiUrl = 'http://localhost:3000/roles';

    getAllRoles() {
        return this._http.get<Role[]>(this.apiUrl);
    }

    // getRoleById(id: number) {
    //     return this.http.get(`${this.apiUrl}/${id}`);
    // }

    createRole(role: CreateRoleDto) {
        return this._http.post<Role>(this.apiUrl, role);
    }

    updateRole(id: number, role: UpdateRoleDto) {
        return this._http.put<Role>(`${this.apiUrl}/${id}`, role);
    }

    deleteRole(id: number) {
        return this._http.delete(`${this.apiUrl}/${id}`);
    }
}
