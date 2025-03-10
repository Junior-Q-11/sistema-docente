// Datos iniciales del sistema
const datosIniciales = {
  // Asistencias
  asistencias: [
    {
      id: 1,
      fecha: "2024-03-01",
      horaEntrada: "08:00",
      horaSalida: "14:00",
      semestre: "2024-1",
      estado: "presente",
    },
    {
      id: 2,
      fecha: "2024-03-02",
      horaEntrada: "08:15",
      horaSalida: "14:00",
      semestre: "2024-1",
      estado: "tardanza",
    },
    {
      id: 3,
      fecha: "2024-03-03",
      horaEntrada: "",
      horaSalida: "",
      semestre: "2024-1",
      estado: "ausente",
    },
    {
      id: 4,
      fecha: "2023-10-01",
      horaEntrada: "08:00",
      horaSalida: "14:00",
      semestre: "2023-2",
      estado: "presente",
    },
    {
      id: 5,
      fecha: "2023-10-02",
      horaEntrada: "08:00",
      horaSalida: "14:00",
      semestre: "2023-2",
      estado: "presente",
    },
  ],

  // Horarios
  horarios: [
    {
      id: 1,
      dia: "Lunes",
      horaInicio: "08:00",
      horaFin: "10:00",
      curso: "Programación Web",
      aula: "Lab 101",
      semestre: "2024-1",
    },
    {
      id: 2,
      dia: "Lunes",
      horaInicio: "10:00",
      horaFin: "12:00",
      curso: "Bases de Datos",
      aula: "Lab 102",
      semestre: "2024-1",
    },
    {
      id: 3,
      dia: "Miércoles",
      horaInicio: "08:00",
      horaFin: "12:00",
      curso: "Desarrollo de Aplicaciones",
      aula: "Lab 103",
      semestre: "2024-1",
    },
    {
      id: 4,
      dia: "Viernes",
      horaInicio: "14:00",
      horaFin: "18:00",
      curso: "Inteligencia Artificial",
      aula: "Lab 201",
      semestre: "2024-1",
    },
    {
      id: 5,
      dia: "Lunes",
      horaInicio: "08:00",
      horaFin: "12:00",
      curso: "Algoritmos",
      aula: "Lab 101",
      semestre: "2023-2",
    },
    {
      id: 6,
      dia: "Jueves",
      horaInicio: "14:00",
      horaFin: "18:00",
      curso: "Estructura de Datos",
      aula: "Lab 102",
      semestre: "2023-2",
    },
  ],

  // Información del docente
  docente: {
    datosGenerales: {
      nombre: "Juan",
      apellidos: "Pérez García",
      dni: "12345678",
      fechaNacimiento: "1980-05-15",
      telefono: "987654321",
      email: "juan.perez@universidad.edu",
    },
    domicilio: {
      direccion: "Av. Universidad 123",
      distrito: "San Miguel",
      provincia: "Lima",
      departamento: "Lima",
      codigoPostal: "15088",
    },
    datosFamiliares: [
      {
        id: 1,
        nombre: "María",
        apellidos: "Pérez López",
        parentesco: "Esposa",
        telefono: "987654322",
      },
      {
        id: 2,
        nombre: "Carlos",
        apellidos: "Pérez Pérez",
        parentesco: "Hijo",
        telefono: "987654323",
      },
    ],
  },

  // Semestres disponibles
  semestres: ["2024-1", "2023-2", "2023-1"],
};

// Cargar datos desde localStorage o usar los datos iniciales
export function cargarDatos() {
  const datosGuardados = localStorage.getItem("sistema-docente-data");
  return datosGuardados ? JSON.parse(datosGuardados) : datosIniciales;
}

// Guardar datos en localStorage
export function guardarDatos(datos) {
  localStorage.setItem("sistema-docente-data", JSON.stringify(datos));
}

// Exportar los datos cargados
export const datos = cargarDatos();
