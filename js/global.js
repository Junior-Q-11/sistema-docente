// js/global.js

// Función para obtener datos del localStorage o usar los datos por defecto
function obtenerDatos() {
  const datosGuardados = localStorage.getItem("datosDocente")
  return datosGuardados
    ? JSON.parse(datosGuardados)
    : {
        docente: {
          nombre: "Nombre del Docente",
          dni: "",
          especialidad: "",
          correo: "",
          telefono: "",
        },
        domicilio: {
          direccion: "",
          departamento: "",
          provincia: "",
          distrito: "",
          codigoPostal: "",
        },
        familiares: [],
        asistencias: {},
        horarios: {},
      }
}

// Función para guardar datos en localStorage
function guardarDatos(datos) {
  localStorage.setItem("datosDocente", JSON.stringify(datos))
}

export { obtenerDatos, guardarDatos }

