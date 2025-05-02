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

interface Column {
    field: string;
    header: string;
    customExportHeader?: string;
}
@Component({
    selector: 'app-roles',
    imports: [ToolbarModule, ButtonModule, TableModule, IconFieldModule, InputIconModule, InputTextModule],
    templateUrl: './roles.component.html',
    styleUrl: './roles.component.scss',
    providers: [MessageService, ConfirmationService]
})
export class RolesComponent implements OnInit {
    roleService = inject(RoleService);
    role!: Role;
    roles = signal<Role[]>([]);
    cols!: Column[];

    ngOnInit(): void {
        this.loadRoles();
    }

    openNew() {
        console.log('openNew button clicked');
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
}
