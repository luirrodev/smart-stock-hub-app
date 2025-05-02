import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { Role } from '../../models/roles.model';

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

    // createRole(role: any) {
    //     return this.http.post(this.apiUrl, role);
    // }

    // updateRole(id: number, role: any) {
    //     return this.http.put(`${this.apiUrl}/${id}`, role);
    // }

    // deleteRole(id: number) {
    //     return this.http.delete(`${this.apiUrl}/${id}`);
    // }
}
