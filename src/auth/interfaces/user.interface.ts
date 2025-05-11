export interface User {
  id: number;
  username: string;
  password: string;
  isActive: boolean;
}

export interface UserResponse {
  id: number;
  username: string;
  isActive: boolean;
}
