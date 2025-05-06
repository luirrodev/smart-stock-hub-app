import { Component, signal } from '@angular/core';

import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { Table, TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';

import { User } from '@models/user.model';

@Component({
    selector: 'app-users',
    imports: [ToolbarModule, ButtonModule, TableModule, IconFieldModule, InputIconModule, InputTextModule],
    templateUrl: './users.component.html'
})
export class UsersComponent {
    users = signal<User[]>([]);

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    openNew() {
        console.log('New User');
    }

    editUser(user: User) {
        console.log('Edit User', user);
    }

    deleteUser(user: User) {
        console.log('Delete User', user);
    }
}
