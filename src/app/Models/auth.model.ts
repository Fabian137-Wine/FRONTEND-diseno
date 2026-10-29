export interface AuthRequest {
  username: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  username: string;
}

export interface JwtPayload {
  sub: string;
  roles: string[];
  exp?: number;
  iat?: number;
}

export interface UsuarioSesion {
  username: string;
  roles: string[];
  token: string;
}

export enum RolUsuario {
  ADMIN = 'ROLE_ADMIN',
  RRHH = 'ROLE_RRHH',
  EMPLEADO = 'ROLE_EMPLEADO'
}

