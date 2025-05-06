import { Role } from './roles.model';

export interface User {
    id: number;
    email: string;
    role: Role;
}
