export type UserRole = 'user' | 'admin' | 'moderator';

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  created_at: Date;
}
