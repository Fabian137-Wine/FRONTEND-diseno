export interface Empleado {
  id?: number;
  usuarioId?: number;
  departamentoId?: number;
  nombres: string;
  apellidos: string;
  dni: string;
  correo: string;
  telefono?: string;
  sueldoBase?: number;
  tipoPension?: string;
  activo?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface EmpleadoConDetalles extends Empleado {
  nombreDepartamento?: string;
  rol?: string;
  username?: string;
}
