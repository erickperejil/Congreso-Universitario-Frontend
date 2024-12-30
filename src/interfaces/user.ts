export interface User {
  nombre: string;
  apellido: string;
  correo: string;
  genero: string;
  telefono: string;
  fecha_nacimiento: string;
  imagen_url?: string;
}
export interface EditPerfilProps {
  userEmail: string;
}

export interface ActualizarUser{
  Nuevo_nombre: string;
  Nuevo_apellido: string;
  Nuevo_genero: string;
  Nuevo_telefono: string;
  Nuevo_fechaNacimiento: string;
}

export interface resetPsw{
  
    correo: string;
    nuevaContrasena:string;
  
}

export interface ResetPwdResponse {
  codigo: number;
  mensaje: string;
}