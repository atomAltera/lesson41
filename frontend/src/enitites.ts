export interface SignupFormData {
    displayName: string;
    email: string;
    password: string;
}

export interface LoginFormData {
    email: string;
    password: string;
}

export interface ResetFormData {
    email: string;
}