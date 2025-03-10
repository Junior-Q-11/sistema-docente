// Importar datos desde data.js (o donde estén definidos)
import { datos, guardarDatos } from './data.js';

console.log(datos); // Verifica que los datos se cargan correctamente

// Ejemplo de uso de guardarDatos
guardarDatos(datos);

// Variables globales
let semestreActual = datos.semestres[0]
let familiarEditando = null

// Función para inicializar la aplicación
function inicializarApp() {
  // Configurar navegación
  configurarNavegacion()

  // Configurar selector de semestre
  configurarSemestreSelector()

  // Inicializar secciones
  inicializarAsistencia()
  inicializarHorario()
  inicializarInformacion()

  // Configurar modales
  configurarModales()

  // Configurar sidebar responsive
  configurarSidebar()
}

// Configurar navegación entre secciones
function configurarNavegacion() {
  const enlaces = document.querySelectorAll(".nav-link")

  enlaces.forEach((enlace) => {
    enlace.addEventListener("click", (e) => {
      e.preventDefault()

      // Remover clase active de todos los enlaces
      enlaces.forEach((el) => el.classList.remove("active"))

      // Agregar clase active al enlace clickeado
      enlace.classList.add("active")

      // Obtener la sección a mostrar
      const seccion = enlace.getAttribute("data-section")

      // Ocultar todas las secciones
      document.querySelectorAll(".section").forEach((el) => {
        el.classList.remove("active")
      })

      // Mostrar la sección seleccionada
      document.getElementById(seccion).classList.add("active")
    })
  })

  // Configurar tabs en la sección de información
  const tabBtns = document.querySelectorAll(".tab-btn")

  tabBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Remover clase active de todos los botones
      tabBtns.forEach((el) => el.classList.remove("active"))

      // Agregar clase active al botón clickeado
      btn.classList.add("active")

      // Obtener el tab a mostrar
      const tab = btn.getAttribute("data-tab")

      // Ocultar todos los contenidos de tabs
      document.querySelectorAll(".tab-content").forEach((el) => {
        el.classList.remove("active")
      })

      // Mostrar el contenido del tab seleccionado
      document.getElementById(tab).classList.add("active")
    })
  })
}

// Configurar selector de semestre
function configurarSemestreSelector() {
  const semestreSelect = document.getElementById("semestre")

  // Llenar el selector con los semestres disponibles
  datos.semestres.forEach((semestre) => {
    const option = document.createElement("option")
    option.value = semestre
    option.textContent = semestre
    semestreSelect.appendChild(option)
  })

  // Establecer el semestre actual
  semestreSelect.value = semestreActual

  // Actualizar etiquetas de semestre
  document.getElementById("semestre-asistencia").textContent = semestreActual
  document.getElementById("semestre-horario").textContent = semestreActual

  // Evento change
  semestreSelect.addEventListener("change", () => {
    semestreActual = semestreSelect.value

    // Actualizar etiquetas de semestre
    document.getElementById("semestre-asistencia").textContent = semestreActual
    document.getElementById("semestre-horario").textContent = semestreActual

    // Actualizar datos mostrados
    actualizarTablaAsistencias()
    actualizarHorario()
  })
}

// Inicializar sección de asistencia
function inicializarAsistencia() {
  // Mostrar tabla de asistencias
  actualizarTablaAsistencias()

  // Configurar formulario de nueva asistencia
  const formAsistencia = document.getElementById("form-asistencia")

  formAsistencia.addEventListener("submit", (e) => {
    e.preventDefault()

    // Obtener valores del formulario
    const fecha = document.getElementById("fecha-asistencia").value
    const horaEntrada = document.getElementById("hora-entrada").value
    const horaSalida = document.getElementById("hora-salida").value
    const estado = document.querySelector('input[name="estado"]:checked').value

    // Crear nueva asistencia
    const nuevaAsistencia = {
      id: Math.max(0, ...datos.asistencias.map((a) => a.id)) + 1,
      fecha,
      horaEntrada: estado === "ausente" ? "" : horaEntrada,
      horaSalida: estado === "ausente" ? "" : horaSalida,
      semestre: semestreActual,
      estado,
    }

    // Agregar a los datos
    datos.asistencias.push(nuevaAsistencia)

    // Guardar datos
    guardarDatos(datos)

    // Actualizar tabla
    actualizarTablaAsistencias()

    // Cerrar modal
    document.getElementById("modal-asistencia").classList.remove("active")

    // Resetear formulario
    formAsistencia.reset()
  })

  // Manejar cambio de estado para deshabilitar campos
  const radiosEstado = document.querySelectorAll('input[name="estado"]')
  radiosEstado.forEach((radio) => {
    radio.addEventListener("change", () => {
      const horaEntrada = document.getElementById("hora-entrada")
      const horaSalida = document.getElementById("hora-salida")

      if (radio.value === "ausente") {
        horaEntrada.disabled = true
        horaSalida.disabled = true
      } else {
        horaEntrada.disabled = false
        horaSalida.disabled = false
      }
    })
  })

  // Configurar botón para abrir modal
  document.getElementById("btn-nueva-asistencia").addEventListener("click", () => {
    // Establecer fecha actual en el formulario
    const hoy = new Date()
    const fechaFormateada = hoy.toISOString().split("T")[0]
    document.getElementById("fecha-asistencia").value = fechaFormateada

    // Abrir modal
    document.getElementById("modal-asistencia").classList.add("active")
  })
}

// Actualizar tabla de asistencias según el semestre actual
function actualizarTablaAsistencias() {
  const tbody = document.querySelector("#tabla-asistencias tbody")
  const noAsistencias = document.getElementById("no-asistencias")

  // Filtrar asistencias por semestre
  const asistenciasFiltradas = datos.asistencias.filter((asistencia) => asistencia.semestre === semestreActual)

  // Limpiar tabla
  tbody.innerHTML = ""

  // Mostrar mensaje si no hay asistencias
  if (asistenciasFiltradas.length === 0) {
    tbody.innerHTML = ""
    noAsistencias.style.display = "block"
    return
  }

  // Ocultar mensaje
  noAsistencias.style.display = "none"

  // Llenar tabla con asistencias
  asistenciasFiltradas.forEach((asistencia) => {
    const tr = document.createElement("tr")

    // Formatear fecha
    const fecha = new Date(asistencia.fecha)
    const opcionesFecha = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }
    const fechaFormateada = fecha.toLocaleDateString("es-ES", opcionesFecha)

    // Crear celdas
    tr.innerHTML = `
      <td>${fechaFormateada}</td>
      <td>${asistencia.horaEntrada || "-"}</td>
      <td>${asistencia.horaSalida || "-"}</td>
      <td>
        <span class="estado-badge estado-${asistencia.estado}">
          <i class="fas fa-${getIconoEstado(asistencia.estado)}"></i>
          ${capitalizar(asistencia.estado)}
        </span>
      </td>
    `

    tbody.appendChild(tr)
  })
}

// Obtener ícono según estado de asistencia
function getIconoEstado(estado) {
  switch (estado) {
    case "presente":
      return "check-circle"
    case "tardanza":
      return "clock"
    case "ausente":
      return "times-circle"
    default:
      return ""
  }
}

// Inicializar sección de horario
function inicializarHorario() {
  actualizarHorario()
}

// Actualizar horario según el semestre actual
function actualizarHorario() {
  const horarioGrid = document.getElementById("horario-grid");
  const noHorario = document.getElementById("no-horario");

  // Filtrar horarios por semestre
  const horariosFiltrados = datos.horarios.filter(
    (horario) => horario.semestre === semestreActual
  );

  // Mostrar mensaje si no hay horarios
  if (horariosFiltrados.length === 0) {
    horarioGrid.innerHTML = "";
    noHorario.style.display = "block";
    return;
  }

  // Ocultar mensaje
  noHorario.style.display = "none";

  // Limpiar grid
  horarioGrid.innerHTML = "";

  // Definir días y horas
  const diasSemana = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
  const horasClase = Array.from({ length: 14 }, (_, i) => i + 7); // 7:00 - 20:00

  // Crear encabezados
  horarioGrid.innerHTML += `<div class="horario-header"></div>`; // Celda vacía para la esquina superior izquierda
  diasSemana.forEach((dia) => {
    horarioGrid.innerHTML += `<div class="horario-header">${dia}</div>`;
  });

  // Crear filas de horas
  horasClase.forEach((hora) => {
    // Agregar la hora en la primera columna
    horarioGrid.innerHTML += `<div class="horario-hora">${hora}:00</div>`;

    // Agregar celdas vacías para cada día
    diasSemana.forEach(() => {
      horarioGrid.innerHTML += `<div class="horario-celda"></div>`;
    });
  });

  // Crear clases en el horario
  horariosFiltrados.forEach((clase) => {
    // Obtener índices para posicionamiento
    const diaIndex = diasSemana.indexOf(clase.dia);
    const horaInicio = Number.parseInt(clase.horaInicio.split(":")[0]);
    const horaFin = Number.parseInt(clase.horaFin.split(":")[0]);

    // Calcular posición y tamaño
    const columna = diaIndex + 2; // +2 porque la primera columna es para las horas
    const filaInicio = horasClase.indexOf(horaInicio) + 2; // +2 por el encabezado
    const filaFin = horasClase.indexOf(horaFin) + 2;
    const altura = (filaFin - filaInicio) * 40; // 40px por hora aproximadamente

    // Crear elemento de clase
    const claseEl = document.createElement("div");
    claseEl.className = "horario-clase";
    claseEl.innerHTML = `
      <h4>${clase.curso}</h4>
      <div class="horario-clase-hora">
        <i class="fas fa-clock"></i>
        ${clase.horaInicio} - ${clase.horaFin}
      </div>
      <span class="horario-clase-aula">${clase.aula}</span>
    `;

    // Posicionar elemento
    claseEl.style.gridColumn = columna;
    claseEl.style.gridRow = `${filaInicio} / ${filaFin}`;
    claseEl.style.height = `${altura}px`;

    horarioGrid.appendChild(claseEl);
  });
}

// Inicializar sección de información
function inicializarInformacion() {
  // Mostrar datos generales
  mostrarDatosGenerales()

  // Mostrar domicilio
  mostrarDomicilio()

  // Mostrar datos familiares
  actualizarTablaFamiliares()

  // Configurar formulario de datos generales
  const formDatosGenerales = document.getElementById("form-datos-generales")
  formDatosGenerales.addEventListener("submit", (e) => {
    e.preventDefault()

    // Actualizar datos
    datos.docente.datosGenerales = {
      nombre: document.getElementById("nombre").value,
      apellidos: document.getElementById("apellidos").value,
      dni: document.getElementById("dni").value,
      fechaNacimiento: document.getElementById("fechaNacimiento").value,
      telefono: document.getElementById("telefono").value,
      email: document.getElementById("email").value,
    }

    // Guardar datos
    guardarDatos(datos)

    // Actualizar vista
    mostrarDatosGenerales()

    // Ocultar formulario
    document.getElementById("vista-datos-generales").style.display = "grid"
    formDatosGenerales.style.display = "none"
  })

  // Configurar botón editar datos generales
  document.getElementById("btn-editar-datos").addEventListener("click", () => {
    // Llenar formulario con datos actuales
    document.getElementById("nombre").value = datos.docente.datosGenerales.nombre
    document.getElementById("apellidos").value = datos.docente.datosGenerales.apellidos
    document.getElementById("dni").value = datos.docente.datosGenerales.dni
    document.getElementById("fechaNacimiento").value = datos.docente.datosGenerales.fechaNacimiento
    document.getElementById("telefono").value = datos.docente.datosGenerales.telefono
    document.getElementById("email").value = datos.docente.datosGenerales.email

    // Mostrar formulario
    document.getElementById("vista-datos-generales").style.display = "none"
    formDatosGenerales.style.display = "grid"
  })

  // Configurar formulario de domicilio
  const formDomicilio = document.getElementById("form-domicilio")
  formDomicilio.addEventListener("submit", (e) => {
    e.preventDefault()

    // Actualizar datos
    datos.docente.domicilio = {
      direccion: document.getElementById("direccion").value,
      distrito: document.getElementById("distrito").value,
      provincia: document.getElementById("provincia").value,
      departamento: document.getElementById("departamento").value,
      codigoPostal: document.getElementById("codigoPostal").value,
    }

    // Guardar datos
    guardarDatos(datos)

    // Actualizar vista
    mostrarDomicilio()

    // Ocultar formulario
    document.getElementById("vista-domicilio").style.display = "grid"
    formDomicilio.style.display = "none"
  })

  // Configurar botón editar domicilio
  document.getElementById("btn-editar-domicilio").addEventListener("click", () => {
    // Llenar formulario con datos actuales
    document.getElementById("direccion").value = datos.docente.domicilio.direccion
    document.getElementById("distrito").value = datos.docente.domicilio.distrito
    document.getElementById("provincia").value = datos.docente.domicilio.provincia
    document.getElementById("departamento").value = datos.docente.domicilio.departamento
    document.getElementById("codigoPostal").value = datos.docente.domicilio.codigoPostal

    // Mostrar formulario
    document.getElementById("vista-domicilio").style.display = "none"
    formDomicilio.style.display = "grid"
  })

  // Configurar formulario de familiar
  const formFamiliar = document.getElementById("form-familiar")
  formFamiliar.addEventListener("submit", (e) => {
    e.preventDefault()

    const nombre = document.getElementById("familiar-nombre").value
    const apellidos = document.getElementById("familiar-apellidos").value
    const parentesco = document.getElementById("familiar-parentesco").value
    const telefono = document.getElementById("familiar-telefono").value

    if (familiarEditando) {
      // Actualizar familiar existente
      const index = datos.docente.datosFamiliares.findIndex((f) => f.id === familiarEditando)
      if (index !== -1) {
        datos.docente.datosFamiliares[index] = {
          id: familiarEditando,
          nombre,
          apellidos,
          parentesco,
          telefono,
        }
      }
    } else {
      // Agregar nuevo familiar
      const nuevoId = Math.max(0, ...datos.docente.datosFamiliares.map((f) => f.id)) + 1
      datos.docente.datosFamiliares.push({
        id: nuevoId,
        nombre,
        apellidos,
        parentesco,
        telefono,
      })
    }

    // Guardar datos
    guardarDatos(datos)

    // Actualizar tabla
    actualizarTablaFamiliares()

    // Cerrar modal
    document.getElementById("modal-familiar").classList.remove("active")

    // Resetear formulario y estado
    formFamiliar.reset()
    familiarEditando = null
  })

  // Configurar botón agregar familiar
  document.getElementById("btn-agregar-familiar").addEventListener("click", () => {
    // Resetear formulario
    document.getElementById("form-familiar").reset()

    // Cambiar título del modal
    document.getElementById("titulo-modal-familiar").textContent = "Agregar Familiar"

    // Resetear ID en edición
    familiarEditando = null
    document.getElementById("familiar-id").value = ""

    // Abrir modal
    document.getElementById("modal-familiar").classList.add("active")
  })
}

// Mostrar datos generales del docente
function mostrarDatosGenerales() {
  const vistaDatos = document.getElementById("vista-datos-generales")
  const datosGenerales = datos.docente.datosGenerales

  vistaDatos.innerHTML = `
    <div>
      <h4>Nombre</h4>
      <p>${datosGenerales.nombre}</p>
    </div>
    <div>
      <h4>Apellidos</h4>
      <p>${datosGenerales.apellidos}</p>
    </div>
    <div>
      <h4>DNI</h4>
      <p>${datosGenerales.dni}</p>
    </div>
    <div>
      <h4>Fecha de Nacimiento</h4>
      <p>${datosGenerales.fechaNacimiento}</p>
    </div>
    <div>
      <h4>Teléfono</h4>
      <p>${datosGenerales.telefono}</p>
    </div>
    <div>
      <h4>Email</h4>
      <p>${datosGenerales.email}</p>
    </div>
  `
}

// Mostrar domicilio del docente
function mostrarDomicilio() {
  const vistaDomicilio = document.getElementById("vista-domicilio")
  const domicilio = datos.docente.domicilio

  vistaDomicilio.innerHTML = `
    <div class="full-width">
      <h4>Dirección</h4>
      <p>${domicilio.direccion}</p>
    </div>
    <div>
      <h4>Distrito</h4>
      <p>${domicilio.distrito}</p>
    </div>
    <div>
      <h4>Provincia</h4>
      <p>${domicilio.provincia}</p>
    </div>
    <div>
      <h4>Departamento</h4>
      <p>${domicilio.departamento}</p>
    </div>
    <div>
      <h4>Código Postal</h4>
      <p>${domicilio.codigoPostal}</p>
    </div>
  `
}

// Actualizar tabla de familiares
function actualizarTablaFamiliares() {
  const tbody = document.querySelector("#tabla-familiares tbody")
  const noFamiliares = document.getElementById("no-familiares")

  // Mostrar mensaje si no hay familiares
  if (datos.docente.datosFamiliares.length === 0) {
    tbody.innerHTML = ""
    noFamiliares.style.display = "block"
    return
  }

  // Ocultar mensaje
  noFamiliares.style.display = "none"

  // Limpiar tabla
  tbody.innerHTML = ""

  // Llenar tabla con familiares
  datos.docente.datosFamiliares.forEach((familiar) => {
    const tr = document.createElement("tr")

    tr.innerHTML = `
      <td>${familiar.nombre}</td>
      <td>${familiar.apellidos}</td>
      <td>${familiar.parentesco}</td>
      <td>${familiar.telefono}</td>
      <td>
        <div class="table-actions">
          <button class="btn btn-icon btn-editar-familiar" data-id="${familiar.id}">
            <i class="fas fa-pencil-alt"></i>
          </button>
          <button class="btn btn-icon btn-eliminar-familiar" data-id="${familiar.id}">
            <i class="fas fa-trash-alt"></i>
          </button>
        </div>
      </td>
    `

    tbody.appendChild(tr)
  })

  // Configurar botones de editar
  document.querySelectorAll(".btn-editar-familiar").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = Number.parseInt(btn.getAttribute("data-id"))
      const familiar = datos.docente.datosFamiliares.find((f) => f.id === id)

      if (familiar) {
        // Establecer ID en edición
        familiarEditando = id

        // Llenar formulario
        document.getElementById("familiar-id").value = familiar.id
        document.getElementById("familiar-nombre").value = familiar.nombre
        document.getElementById("familiar-apellidos").value = familiar.apellidos
        document.getElementById("familiar-parentesco").value = familiar.parentesco
        document.getElementById("familiar-telefono").value = familiar.telefono

        // Cambiar título del modal
        document.getElementById("titulo-modal-familiar").textContent = "Editar Familiar"

        // Abrir modal
        document.getElementById("modal-familiar").classList.add("active")
      }
    })
  })
  

  // Configurar botones de eliminar
  document.querySelectorAll(".btn-eliminar-familiar").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = Number.parseInt(btn.getAttribute("data-id"))

      // Confirmar eliminación
      if (confirm("¿Está seguro de eliminar este familiar?")) {
        // Filtrar para eliminar
        datos.docente.datosFamiliares = datos.docente.datosFamiliares.filter((f) => f.id !== id)

        // Guardar datos
        guardarDatos(datos)

        // Actualizar tabla
        actualizarTablaFamiliares()
      }
    })
  })
}

// Configurar modales
function configurarModales() {
  // Cerrar modal al hacer clic en X
  document.querySelectorAll(".modal-close").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".modal").forEach((modal) => {
        modal.classList.remove("active")
      })
    })
  })

  // Cerrar modal al hacer clic fuera del contenido
  document.querySelectorAll(".modal").forEach((modal) => {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.classList.remove("active")
      }
    })
  })
}

// Configurar sidebar responsive
function configurarSidebar() {
  const toggleBtn = document.getElementById("toggle-sidebar")
  const sidebar = document.getElementById("sidebar")

  toggleBtn.addEventListener("click", () => {
    sidebar.classList.toggle("active")
  })
}

// Función auxiliar para capitalizar texto
function capitalizar(texto) {
  return texto.charAt(0).toUpperCase() + texto.slice(1)
}

// Iniciar la aplicación cuando el DOM esté cargado
document.addEventListener("DOMContentLoaded", inicializarApp)

