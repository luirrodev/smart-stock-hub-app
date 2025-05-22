import { Component, inject, OnInit, signal } from '@angular/core';

import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { Table, TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { MessageService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';

import { User } from '@models/user.model';
import { Role } from '@models/roles.model';
import { UserService, CreateUserDto, UpdateUserDto } from '@services/user.service';
import { RoleService } from '@services/roles.service';
import { ToastModule } from 'primeng/toast';

@Component({
    selector: 'app-users',
    imports: [ToastModule, ToolbarModule, ButtonModule, TableModule, IconFieldModule, InputIconModule, InputTextModule, DialogModule, DropdownModule, FormsModule],
    templateUrl: './users.component.html',
    providers: [MessageService]
})
export class UsersComponent implements OnInit {
    private readonly userService = inject(UserService);
    private readonly roleService = inject(RoleService);
    private readonly messageService = inject(MessageService);

    users = signal<User[]>([]);
    roles = signal<Role[]>([]);
    userDialog = signal<boolean>(false);
    submitted = signal<boolean>(false);
    isEditMode = signal<boolean>(false);

    user: Partial<CreateUserDto> & { id?: number } = {
        name: '',
        email: '',
        password: '',
        role: 0
    };

    ngOnInit(): void {
        this.loadUsers();
        this.loadRoles();
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    loadUsers() {
        this.userService.getAllUsers().subscribe({
            next: (users) => {
                this.users.set(users);
            },
            error: (error) => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Error al cargar usuarios'
                });
            }
        });
    }

    loadRoles() {
        this.roleService.getAllRoles().subscribe({
            next: (roles) => {
                this.roles.set(roles);
            },
            error: (error) => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Error al cargar roles'
                });
            }
        });
    }

    openNew() {
        this.user = {
            name: '',
            email: '',
            password: '',
            role: 0
        };
        this.submitted.set(false);
        this.isEditMode.set(false);
        this.userDialog.set(true);
    }

    editUser(user: User) {
        this.user = {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role.id || 0,
            password: ''
        };
        this.submitted.set(false);
        this.isEditMode.set(true);
        this.userDialog.set(true);
    }

    deleteUser(user: User) {
        if (confirm(`¿Está seguro que desea eliminar al usuario ${user.name}?`)) {
            this.userService.deleteUser(user.id).subscribe({
                next: () => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Éxito',
                        detail: 'Usuario eliminado correctamente'
                    });
                    this.loadUsers();
                },
                error: (error) => {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: 'Error al eliminar usuario'
                    });
                }
            });
        }
    }

    hideDialog() {
        this.userDialog.set(false);
        this.submitted.set(false);
    }

    saveUser() {
        this.submitted.set(true);

        if (!this.user.name?.trim() || !this.user.email?.trim() || !this.user.role) {
            return;
        }

        if (this.isEditMode() && this.user.id) {
            // Update existing user
            const updateData: UpdateUserDto = {
                name: this.user.name,
                email: this.user.email,
                role: this.user.role
            };

            this.userService.updateUser(this.user.id, updateData).subscribe({
                next: () => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Éxito',
                        detail: 'Usuario actualizado correctamente'
                    });
                    this.loadUsers();
                    this.hideDialog();
                },
                error: (error) => {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: 'Error al actualizar usuario'
                    });
                }
            });
        } else {
            // Create new user
            if (!this.user.password) {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'La contraseña es obligatoria para crear un usuario'
                });
                return;
            }

            const createData: CreateUserDto = {
                name: this.user.name,
                email: this.user.email,
                password: this.user.password,
                role: this.user.role
            };

            console.log('createData', createData);

            this.userService.createUser(createData).subscribe({
                next: () => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Éxito',
                        detail: 'Usuario creado correctamente'
                    });
                    this.loadUsers();
                    this.hideDialog();
                },
                error: (error) => {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: 'Error al crear usuario'
                    });
                }
            });
        }
    }
}
