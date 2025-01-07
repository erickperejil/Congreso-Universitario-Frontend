export interface CreateConferencia {
  nombre_conferencia: string;
  nombres_ponente: string;
  apellidos_ponente: string;
  descripcion_ponente: string;
  img_perfil_ponente: string;
  descripcion_conferencia: string;
  direccion: string;
  fecha_conferencia: string; // Formato de fecha: "YYYY-MM-DD"
  hora_inicio: string; // Formato completo de fecha y hora: "YYYY-MM-DD HH:mm"
  hora_final: string; // Formato completo de fecha y hora: "YYYY-MM-DD HH:mm"
  cupos: string; // Cambiado a número
  img_conferecia: string; // Cambiado a string para coincidir con el JSON
  url_carpeta_zip: string;
}


  export interface Conferencia {
    id_conferencia: number;
    nombre_ponente: string;
    img_ponente: string;
    titulo: string;
    lugar: string;
    horario: string;
    datosimportantes: string[];
    fecha: string;
    cupos_disponibles: number;
    finalizado: boolean;
  }
  