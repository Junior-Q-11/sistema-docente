// Datos de ejemplo en formato JSON
const datosJSON = {
  docente: {
    nombre: "Armando Lios",
    dni: "12345678",
    especialidad: "Matemáticas",
    correo: "armando.lios@gmail.com",
    telefono: "999999999",
  },
  domicilio: {
    direccion: "Av. Universitaria 123",
    departamento: "Lima",
    provincia: "Lima",
    distrito: "Los Olivos",
    codigoPostal: "01000",
  },
  familiares: [
    {
      id: 1,
      nombre: "Juan Lios",
      parentesco: "Padre",
      telefono: "333333333",
    },
    {
      id: 2,
      nombre: "Ana Lios",
      parentesco: "Hija",
      telefono: "888888888",
    },
  ],
  asistencias: {
    "2023-1": [
      {
        fecha: "2023-02-01",
        horaEntrada: "08:00",
        horaSalida: "14:00",
        estado: "Presente",
      },
      {
        fecha: "2023-02-02",
        horaEntrada: "08:15",
        horaSalida: "14:00",
        estado: "Retardo",
      },
    ],
    "2023-2": [
      {
        fecha: "2023-08-15",
        horaEntrada: "08:00",
        horaSalida: "14:00",
        estado: "Presente",
      },
      {
        fecha: "2023-08-16",
        horaEntrada: "08:00",
        horaSalida: "14:00",
        estado: "Presente",
      },
      {
        fecha: "2023-08-17",
        horaEntrada: "09:30",
        horaSalida: "14:00",
        estado: "Justificado",
      },
    ],
    "2024-1": [],
  },
  horarios: {
    "2023-1": [
      {
        dia: "Lunes",
        hora: "08:00-10:00",
        materia: "Álgebra",
        aula: "A-101",
      },
      {
        dia: "Miércoles",
        hora: "10:00-12:00",
        materia: "Cálculo",
        aula: "B-203",
      },
      {
        dia: "Viernes",
        hora: "08:00-10:00",
        materia: "Estadística",
        aula: "A-101",
      },
    ],
    "2023-2": [
      {
        dia: "Lunes",
        hora: "10:00-12:00",
        materia: "Álgebra Lineal",
        aula: "A-102",
      },
      {
        dia: "Martes",
        hora: "08:00-10:00",
        materia: "Cálculo Vectorial",
        aula: "B-205",
      },
      {
        dia: "Jueves",
        hora: "12:00-14:00",
        materia: "Probabilidad",
        aula: "C-301",
      },
    ],
    "2024-1": [
      {
        dia: "Martes",
        hora: "10:00-12:00",
        materia: "Ecuaciones Diferenciales",
        aula: "A-105",
      },
      {
        dia: "Jueves",
        hora: "10:00-12:00",
        materia: "Métodos Numéricos",
        aula: "B-201",
      },
      {
        dia: "Viernes",
        hora: "12:00-14:00",
        materia: "Estadística Avanzada",
        aula: "C-302",
      },
    ],
  },
}

// Función para obtener datos del localStorage o usar los datos por defecto
function obtenerDatos() {
  const datosGuardados = localStorage.getItem("datosDocente")
  return datosGuardados ? JSON.parse(datosGuardados) : datosJSON
}

// Función para guardar datos en localStorage
function guardarDatos(datos) {
  localStorage.setItem("datosDocente", JSON.stringify(datos))
}

// Hacer las funciones disponibles globalmente
window.obtenerDatos = obtenerDatos
window.guardarDatos = guardarDatos

