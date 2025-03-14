// Gestión del horario docente
document.addEventListener("inicializarHorario", () => {
  console.log("Inicializando módulo de horario...")

  // Referencias a elementos del DOM
  const selectorSemestre = document.getElementById("semestre")
  const contenedorHorario = document.getElementById("contenedorHorario")

  if (!contenedorHorario) {
    console.error("No se encontró el contenedor del horario")
    return
  }

  // Cargar horario al cambiar de semestre
  selectorSemestre.addEventListener("change", cargarHorario)

  // Cargar horario inicial
  cargarHorario()

  // Función para cargar el horario según el semestre seleccionado
  function cargarHorario() {
    const semestreSeleccionado = selectorSemestre.value
    const datos = window.obtenerDatos()
    const horario = datos.horarios[semestreSeleccionado] || []

    // Definir horas del horario
    const horas = ["08:00-10:00", "10:00-12:00", "12:00-14:00", "14:00-16:00", "16:00-18:00"]

    // Definir días de la semana
    const dias = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"]

    // Limpiar contenedor
    contenedorHorario.innerHTML = ""

    // Crear celdas de horas
    horas.forEach((hora) => {
      const horaCell = document.createElement("div")
      horaCell.className = "hora-celda"
      horaCell.textContent = hora
      contenedorHorario.appendChild(horaCell)

      // Crear celdas para cada día en esta hora
      dias.forEach((dia) => {
        const claseCell = document.createElement("div")
        claseCell.className = "clase-celda"

        // Buscar si hay una clase en este día y hora
        const clase = horario.find((c) => c.dia === dia && c.hora === hora)

        if (clase) {
          const claseDiv = document.createElement("div")
          claseDiv.className = "clase"
          claseDiv.innerHTML = `
                        <div class="clase-titulo">${clase.materia}</div>
                        <div class="clase-aula">Aula: ${clase.aula}</div>
                    `
          claseCell.appendChild(claseDiv)
        }

        contenedorHorario.appendChild(claseCell)
      })
    })
  }
})

