import { Component, inject, OnInit, signal } from '@angular/core';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table, TableModule } from 'primeng/table';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { Role } from '../../models/roles.model';
import { RoleService } from '../service/roles.service';
import { DialogModule } from 'primeng/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CreateRoleDto } from '../../models/roles.model';
import { MessageModule } from 'primeng/message';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';

interface Column {
    field: string;
    header: string;
    customExportHeader?: string;
}
@Component({
    selector: 'app-roles',
    imports: [ToastModule, ConfirmDialogModule, MessageModule, FormsModule, CommonModule, ToolbarModule, ButtonModule, TableModule, IconFieldModule, InputIconModule, InputTextModule, DialogModule],
    templateUrl: './roles.component.html',
    styleUrl: './roles.component.scss',
    providers: [MessageService, ConfirmationService]
})
export class RolesComponent implements OnInit {
    roleService = inject(RoleService);
    messageService = inject(MessageService);
    confirmationService = inject(ConfirmationService);

    cols!: Column[];
    role!: Role;
    roles = signal<Role[]>([]);
    roleDialog: boolean = false;
    submitted: boolean = false;

    ngOnInit(): void {
        this.loadRoles();
    }

    openNew() {
        this.role = {};
        this.submitted = false;
        this.roleDialog = true;
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    editProduct(product: Role) {
        console.log('editProduct clicked', product);
    }

    deleteRole(role: Role) {
        this.confirmationService.confirm({
            message: '¿Estás seguro de que quieres eliminar este rol?',
            header: 'Confirmar',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.roleService.deleteRole(role.id!).subscribe(() => {
                    this.roles.update((prev) => prev.filter((r) => r.id !== role.id));
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Exitoso',
                        detail: `Rol ${role.name} eliminado`,
                        icon: 'pi pi-check',
                        life: 3000
                    });
                });
            }
        });
    }

    loadRoles() {
        this.roleService.getAllRoles().subscribe((data) => {
            this.roles.set(data);
        });
    }

    hideDialog() {
        this.roleDialog = false;
        this.submitted = false;
    }

    saveRole() {
        this.submitted = true;

        let roleData: CreateRoleDto = {
            name: this.role.name!,
            description: this.role.description!
        };

        this.roleService.createRole(roleData).subscribe((data) => {
            this.roles.update((prev) => [...prev, data]);
            this.roleDialog = false;
            this.role = {};
            this.messageService.add({
                severity: 'success',
                summary: 'Exitoso',
                detail: `Rol ${roleData.name} creado exitosamente`,
                icon: 'pi pi-check',
                life: 3000
            });
        });
    }
}
