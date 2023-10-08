export interface LoginDTO {
  identifier: string;
  password: string;
  email?: string;
}

export interface RegisterDTO {
  username: string;
  password: string;
  email: string;
  role: any;
  confirmed: boolean;
  blocked: boolean;
}
