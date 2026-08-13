export type UserRole = "client" | "provider" | "admin";

export interface LoginForm {
  email: string;
  password: string;
  role: UserRole;
}

export interface RegisterForm {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  role: UserRole;
}

// 👇 Add this only
export interface User {
  _id?: string;
  name?: string;
  email?: string;
  phone?: string;
  role: UserRole;
  token: string;
}