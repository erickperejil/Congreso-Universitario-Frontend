import { Asistencias } from "@/interfaces/participantes";
import { ActualizarUser, UsuarioRecibo } from "@/interfaces/user";



export const updateUser = async (id_usuario:number, formData: ActualizarUser): Promise<UsuarioRecibo | null> => {
  console.log("enviando ", JSON.stringify(formData))
  console.log(id_usuario)
    try {
        const response = await fetch(`https://backend-congreso.vercel.app/admin/actualizar/usuario/${id_usuario}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(formData),
        });

        if (!response.ok) {
            console.error(`Error: ${response.status} - ${response.statusText}`);
            const errorText = await response.text();
            console.error('Response text:', errorText);
            return null;
        }

        const updatedUser = await response.json();
        return updatedUser;
    } catch (error) {
        console.error('Error al actualizar los datos del usuario:', error);
        return null;
    }
};

// Restablecer la contraseña
export const resetPwd = async (correo: string, nuevaContrasena: string) => {
  const response = await fetch(`${correo}/restablecer/contrasena`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ correo, nuevaContrasena }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Error al restablecer la contraseña");
  }

  return response.json();
};

export const fetchUsuarioById = async (id: number): Promise<UsuarioRecibo | null> => {
  try {
    const response = await fetch(`https://backend-congreso.vercel.app/admin/user/${id}`);
    
    if (!response.ok) {
      console.error(`Error al obtener los datos: ${response.status} - ${response.statusText}`);
      const errorText = await response.text();
      console.error('Response text:', errorText);
      return null;
    }

    const data = await response.json();

    if (data?.resultado) {
      console.log(data.resultado)
      return data.resultado[0] as UsuarioRecibo;
    } else {
      console.error("No se encontró información del usuario en la respuesta.");
      return null;
    }
  } catch (error) {
    console.error("Error al obtener los datos del usuario:", error);
    return null;
  }
};

export const updateUsuarioById = async (id_usuario: number, formData: ActualizarUser): Promise<UsuarioRecibo | null> => {
  try {
    const response = await fetch(`https://backend-congreso.vercel.app/admin/user/${id_usuario}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      console.error(`Error al actualizar el usuario: ${response.status} - ${response.statusText}`);
      const errorText = await response.text();
      console.error("Response text:", errorText);
      return null;
    }

    const updatedUsuario = await response.json();

    if (updatedUsuario?.resultado) {
      return updatedUsuario.resultado[0] as UsuarioRecibo;
    } else {
      console.error("No se encontró la información actualizada en la respuesta.");
      return null;
    }
  } catch (error) {
    console.error("Error al actualizar la información del usuario:", error);
    return null;
  }
};

export const fetchAsistenciasByUsuarioId = async (id_usuario: number): Promise<Asistencias | null> => {
  try {
    const response = await fetch(`https://backend-congreso.vercel.app/conferencias/usuario/${id_usuario}/asistencias`);

    if (!response.ok) {
      console.error(`Error al obtener las asistencias: ${response.status} - ${response.statusText}`);
      const errorText = await response.text();
      console.error("Response text:", errorText);
      return null;
    }

    const data = await response.json();

    if (data?.conferencias) {
      return data;
    } else {
      console.error("No se encontró información de las asistencias en la respuesta.");
      return null;
    }
  } catch (error) {
    console.error("Error al obtener las asistencias del usuario:", error);
    return null;
  }
};

