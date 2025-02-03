export type UserRole = 'user' | 'admin' | 'moderator';

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  createdAt: Date;
}
