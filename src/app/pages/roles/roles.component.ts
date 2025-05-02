import { Component, signal } from '@angular/core';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { Product, ProductService } from '../service/product.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table, TableModule } from 'primeng/table';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { CurrencyPipe } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';

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
export class RolesComponent {
    constructor() {}

    product!: Product;
    products = signal<Product[]>([]);
    selectedProducts!: Product[] | null;
    cols!: Column[];

    openNew() {
        console.log('openNew button clicked');
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    editProduct(product: Product) {
        console.log('editProduct clicked', product);
    }

    deleteProduct(product: Product) {
        console.log('deleteProduct clicked', product);
    }
}
