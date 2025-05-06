import { Component, inject, OnInit, signal } from '@angular/core';

import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { Table, TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { MessageService } from 'primeng/api';

import { User } from '@models/user.model';
import { UserService } from '@services/user.service';
import { ToastModule } from 'primeng/toast';

@Component({
    selector: 'app-users',
    imports: [ToastModule, ToolbarModule, ButtonModule, TableModule, IconFieldModule, InputIconModule, InputTextModule],
    templateUrl: './users.component.html',
    providers: [MessageService]
})
export class UsersComponent implements OnInit {
    private readonly userService = inject(UserService);
    users = signal<User[]>([]);

    ngOnInit(): void {
        this.loadUsers();
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    loadUsers() {
        this.userService.getAllUsers().subscribe((users) => {
            this.users.set(users);
            console.log(this.users());
        });
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
