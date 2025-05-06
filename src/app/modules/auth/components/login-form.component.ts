import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';

import { AuthService } from '../../../services/auth.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-login-form',
    standalone: true,
    templateUrl: './login-form.component.html',
    imports: [ToastModule, CommonModule, ButtonModule, CheckboxModule, InputTextModule, PasswordModule, ReactiveFormsModule, RouterModule, RippleModule],
    providers: [MessageService]
})
export class LoginFormComponent implements OnInit {
    loginForm!: FormGroup;
    status: 'success' | 'loading' | 'failed' | null = null;
    private readonly router = inject(Router);
    private readonly messageService = inject(MessageService);
    private readonly authService = inject(AuthService);

    constructor(private fb: FormBuilder) {}

    ngOnInit(): void {
        this.initForm();
    }

    initForm(): void {
        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required]]
        });
    }

    onSubmit(): void {
        if (this.loginForm.valid) {
            this.status = 'loading';
            const { email, password } = this.loginForm.value;
            this.authService.login(email, password).subscribe({
                next: () => {
                    this.status = 'success';
                    this.router.navigate(['/']);
                },
                error: (err) => {
                    this.status = 'failed';
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: 'Usuario o contraseña incorrectos',
                        life: 3000
                    });
                    this.loginForm.reset();
                }
            });
        } else {
            this.loginForm.markAllAsTouched();
        }
    }

    get emailControl() {
        return this.loginForm.get('email');
    }

    get passwordControl() {
        return this.loginForm.get('password');
    }
}
