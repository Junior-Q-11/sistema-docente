// Archivo principal que inicializa la aplicación
document.addEventListener("todosComponentesCargados", () => {
  console.log("Sistema de Gestión Docente inicializado")

  // Agregar estilos dinámicos para los estados de asistencia
  const estilos = document.createElement("style")
  estilos.textContent = `
        .estado-asistencia {
            display: inline-block;
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 12px;
            font-weight: 500;
        }
        .estado-asistencia.presente {
            background-color: rgba(55, 184, 109, 0.2);
            color: #27ae60;
        }
        .estado-asistencia.retardo {
            background-color: rgba(241, 196, 15, 0.2);
            color: #f39c12;
        }
        .estado-asistencia.justificado {
            background-color: rgba(52, 152, 219, 0.2);
            color: #2980b9;
        }
        .estado-asistencia.ausente {
            background-color: rgba(231, 76, 60, 0.2);
            color: #c0392b;
        }
    `
  document.head.appendChild(estilos)

  // Inicializar datos si no existen
  if (!localStorage.getItem("datosDocente")) {
    const datosJSON = {
      docente: {
        nombre: "Armando Lios",
        dni: "12345678",
        especialidad: "POO",
        correo: "Lios@gmail.com",
        telefono: "99999999",
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
          nombre: "Juan Pérez",
          parentesco: "Cónyuge",
          telefono: "555-987-6543",
        },
        {
          id: 2,
          nombre: "Ana González",
          parentesco: "Hijo/a",
          telefono: "555-456-7890",
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
    window.guardarDatos(datosJSON)
  }

  // Cargar nombre del docente en el menú lateral
  const datos = window.obtenerDatos()
  document.getElementById("nombreDocente").textContent = datos.docente.nombre

  // Inicializar módulos
  document.dispatchEvent(new Event("inicializarMenu"))
  document.dispatchEvent(new Event("inicializarAsistencia"))
  document.dispatchEvent(new Event("inicializarHorario"))
  document.dispatchEvent(new Event("inicializarInformacion"))
})

