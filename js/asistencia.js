// Gestión de asistencias
document.addEventListener("inicializarAsistencia", () => {
  console.log("Inicializando módulo de asistencia...")

  // Referencias a elementos del DOM
  const selectorSemestre = document.getElementById("semestre")
  const tablaAsistencias = document.getElementById("tablaAsistencias")
  const btnMarcarAsistencia = document.getElementById("btnMarcarAsistencia")
  const modalAsistencia = document.getElementById("modalAsistencia")
  const formAsistencia = document.getElementById("formAsistencia")
  const fechaAsistencia = document.getElementById("fechaAsistencia")

  if (!btnMarcarAsistencia || !tablaAsistencias || !modalAsistencia || !formAsistencia || !fechaAsistencia) {
    console.error("No se encontraron todos los elementos necesarios para el módulo de asistencia")
    return
  }

  // Establecer la fecha actual en el formulario
  const hoy = new Date()
  const fechaFormateada = hoy.toISOString().split("T")[0]
  fechaAsistencia.value = fechaFormateada

  // Cargar asistencias al cambiar de semestre
  selectorSemestre.addEventListener("change", cargarAsistencias)

  // Cargar asistencias iniciales
  cargarAsistencias()

  // Abrir modal para marcar asistencia
  btnMarcarAsistencia.addEventListener("click", () => {
    window.mostrarModal("modalAsistencia")
  })

  // Manejar envío del formulario de asistencia
  formAsistencia.addEventListener("submit", (e) => {
    e.preventDefault()

    // Obtener valores del formulario
    const nuevaAsistencia = {
      fecha: fechaAsistencia.value,
      horaEntrada: document.getElementById("horaEntrada").value,
      horaSalida: document.getElementById("horaSalida").value,
      estado: document.getElementById("estadoAsistencia").value,
    }

    // Obtener datos actuales
    const datos = window.obtenerDatos()
    const semestreActual = selectorSemestre.value

    // Asegurarse de que existe el array para el semestre actual
    if (!datos.asistencias[semestreActual]) {
      datos.asistencias[semestreActual] = []
    }

    // Agregar nueva asistencia
    datos.asistencias[semestreActual].push(nuevaAsistencia)

    // Ordenar asistencias por fecha (más reciente primero)
    datos.asistencias[semestreActual].sort((a, b) => new Date(b.fecha) - new Date(a.fecha))

    // Guardar datos actualizados
    window.guardarDatos(datos)

    // Recargar tabla de asistencias
    cargarAsistencias()

    // Cerrar modal
    window.cerrarModal("modalAsistencia")

    // Limpiar formulario
    formAsistencia.reset()
    fechaAsistencia.value = fechaFormateada
  })

  // Función para cargar asistencias según el semestre seleccionado
  function cargarAsistencias() {
    const semestreSeleccionado = selectorSemestre.value
    const datos = window.obtenerDatos()
    const asistencias = datos.asistencias[semestreSeleccionado] || []

    // Limpiar tabla
    tablaAsistencias.innerHTML = ""

    // Si no hay asistencias, mostrar mensaje
    if (asistencias.length === 0) {
      const fila = document.createElement("tr")
      fila.innerHTML = '<td colspan="4" class="text-center">No hay registros de asistencia para este semestre</td>'
      tablaAsistencias.appendChild(fila)
      return
    }

    // Agregar filas a la tabla
    asistencias.forEach((asistencia) => {
      const fila = document.createElement("tr")

      // Formatear fecha para mostrar
      const fecha = new Date(asistencia.fecha)
      const fechaFormateada = fecha.toLocaleDateString("es-MX")

      // Crear celdas con los datos
      fila.innerHTML = `
                <td>${fechaFormateada}</td>
                <td>${asistencia.horaEntrada}</td>
                <td>${asistencia.horaSalida}</td>
                <td>
                    <span class="estado-asistencia ${asistencia.estado.toLowerCase()}">${asistencia.estado}</span>
                </td>
            `

      tablaAsistencias.appendChild(fila)
    })
  }
})

