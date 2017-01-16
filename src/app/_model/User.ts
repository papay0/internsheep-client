export class User {
    id: number;
    login: string;
    name?: string;
    firstName?: string;
    lastName?: string;
    type: number; // 0 for student, 1 for company
    email: string;
    phone: string;
}
