// Gestión del menú y navegación entre secciones
document.addEventListener("inicializarMenu", () => {
  console.log("Inicializando menú...")

  // Referencias a elementos del DOM
  const enlacesMenu = document.querySelectorAll(".menu-lateral nav a")
  const secciones = document.querySelectorAll(".seccion-contenido")
  const tituloPagina = document.getElementById("tituloPagina")
  const nombreDocente = document.getElementById("nombreDocente")

  // Cargar nombre del docente
  const datos = window.obtenerDatos()
  nombreDocente.textContent = datos.docente.nombre

  // Manejar clics en los enlaces del menú
  enlacesMenu.forEach((enlace) => {
    enlace.addEventListener("click", function (e) {
      e.preventDefault()

      // Remover clase activo de todos los enlaces
      enlacesMenu.forEach((el) => el.classList.remove("activo"))

      // Agregar clase activo al enlace clickeado
      this.classList.add("activo")

      // Obtener la sección a mostrar
      const seccionId = this.getAttribute("data-seccion")

      // Actualizar título de la página
      tituloPagina.textContent = this.textContent

      // Ocultar todas las secciones
      secciones.forEach((seccion) => seccion.classList.remove("activo"))

      // Mostrar la sección seleccionada
      document
        .getElementById("contenido" + seccionId.charAt(0).toUpperCase() + seccionId.slice(1))
        .classList.add("activo")
    })
  })

  // Gestión de pestañas en la sección de información
  const pestanas = document.querySelectorAll(".pestana")
  const contenidosPestana = document.querySelectorAll(".contenido-pestana")

  pestanas.forEach((pestana) => {
    pestana.addEventListener("click", function () {
      // Remover clase activa de todas las pestañas
      pestanas.forEach((p) => p.classList.remove("activa"))

      // Agregar clase activa a la pestaña clickeada
      this.classList.add("activa")

      // Obtener el contenido a mostrar
      const contenidoId = this.getAttribute("data-pestana")

      // Ocultar todos los contenidos
      contenidosPestana.forEach((contenido) => contenido.classList.remove("activo"))

      // Mostrar el contenido seleccionado
      document.getElementById(contenidoId).classList.add("activo")
    })
  })

  // Gestión de modales
  const modales = document.querySelectorAll(".modal")
  const cerrarModales = document.querySelectorAll(".cerrar-modal")

  // Función para mostrar modal
  window.mostrarModal = (idModal) => {
    const modal = document.getElementById(idModal)
    if (modal) {
      modal.style.display = "flex"
      // Pequeño retraso para permitir que el display:flex se aplique antes de la transición
      setTimeout(() => {
        modal.classList.add("mostrar")
      }, 10)
    }
  }

  // Función para cerrar modal
  window.cerrarModal = (idModal) => {
    const modal = document.getElementById(idModal)
    if (modal) {
      modal.classList.remove("mostrar")
      // Esperar a que termine la transición antes de ocultar el modal
      setTimeout(() => {
        modal.style.display = "none"
      }, 300)
    }
  }

  // Cerrar modal al hacer clic en el botón de cerrar
  cerrarModales.forEach((cerrar) => {
    cerrar.addEventListener("click", function () {
      const modal = this.closest(".modal")
      window.cerrarModal(modal.id)
    })
  })

  // Cerrar modal al hacer clic fuera del contenido
  modales.forEach((modal) => {
    modal.addEventListener("click", function (e) {
      if (e.target === this) {
        window.cerrarModal(this.id)
      }
    })
  })
})

