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

interface Column {
    field: string;
    header: string;
    customExportHeader?: string;
}
@Component({
    selector: 'app-roles',
    imports: [FormsModule, CommonModule, ToolbarModule, ButtonModule, TableModule, IconFieldModule, InputIconModule, InputTextModule, DialogModule],
    templateUrl: './roles.component.html',
    styleUrl: './roles.component.scss',
    providers: [MessageService, ConfirmationService]
})
export class RolesComponent implements OnInit {
    roleService = inject(RoleService);

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

    deleteProduct(product: Role) {
        console.log('deleteProduct clicked', product);
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
        console.log('saveRole clicked');
    }
}
