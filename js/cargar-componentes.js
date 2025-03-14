// Función para cargar componentes HTML desde archivos separados
async function cargarComponente(url, contenedor) {
  try {
    const respuesta = await fetch(url)
    if (!respuesta.ok) {
      throw new Error(`Error al cargar ${url}: ${respuesta.status}`)
    }
    const html = await respuesta.text()
    document.getElementById(contenedor).innerHTML = html

    // Disparar evento de componente cargado
    const evento = new CustomEvent("componenteCargado", {
      detail: {
        contenedor: contenedor,
        url: url,
      },
    })
    document.dispatchEvent(evento)

    return true
  } catch (error) {
    console.error(error)
    document.getElementById(contenedor).innerHTML = `<p>Error al cargar el componente: ${error.message}</p>`
    return false
  }
}

// Cargar todos los componentes al iniciar
document.addEventListener("DOMContentLoaded", async () => {
  console.log("Iniciando carga de componentes...")

  // Cargar secciones principales
  await cargarComponente("componentes/asistencia.html", "asistencia-container")
  await cargarComponente("componentes/horario.html", "horario-container")
  await cargarComponente("componentes/informacion.html", "informacion-container")

  // Cargar modales
  await cargarComponente("componentes/modales.html", "modales-container")

  // Disparar evento de todos los componentes cargados
  document.dispatchEvent(new Event("todosComponentesCargados"))
  console.log("Todos los componentes han sido cargados")
})

