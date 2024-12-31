export interface Conferencia {
    nombre_conferencia: string;
    nombres_ponente: string;
    apellidos_ponente: string;
    descripcion_ponente: string;
    img_perfil_ponente: string;
    descripcion_conferencia: string;
    direccion: string;
    fecha_conferencia: string; // Se utiliza el formato de fecha en string "YYYY-MM-DD"
    hora_inicio: string; // Formato completo de fecha y hora "YYYY-MM-DD HH:mm"
    hora_final: string; // Formato completo de fecha y hora "YYYY-MM-DD HH:mm"
    cupos: string; // Puede mantenerse como string o cambiarse a número según cómo lo manejes
    img_conferecia: string[] | null;
  }
  