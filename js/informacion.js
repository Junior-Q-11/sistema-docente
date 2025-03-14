// Gestión de la información docente
document.addEventListener("inicializarInformacion", () => {
  console.log("Inicializando módulo de información...")

  // Referencias a elementos del DOM
  const btnEditarDatosGenerales = document.getElementById("btnEditarDatosGenerales")
  const btnEditarDomicilio = document.getElementById("btnEditarDomicilio")
  const btnAgregarFamiliar = document.getElementById("btnAgregarFamiliar")

  const formDatosGenerales = document.getElementById("formDatosGenerales")
  const formDatosDomicilio = document.getElementById("formDatosDomicilio")
  const formFamiliar = document.getElementById("formFamiliar")

  const modalDatosGenerales = document.getElementById("modalDatosGenerales")
  const modalDomicilio = document.getElementById("modalDomicilio")
  const modalFamiliar = document.getElementById("modalFamiliar")

  const tablaFamiliares = document.getElementById("tablaFamiliares")

  // Verificar que todos los elementos existan
  if (
    !btnEditarDatosGenerales ||
    !btnEditarDomicilio ||
    !btnAgregarFamiliar ||
    !formDatosGenerales ||
    !formDatosDomicilio ||
    !formFamiliar ||
    !modalDatosGenerales ||
    !modalDomicilio ||
    !modalFamiliar ||
    !tablaFamiliares
  ) {
    console.error("No se encontraron todos los elementos necesarios para el módulo de información")
    return
  }

  // Cargar datos iniciales
  cargarDatosGenerales()
  cargarDatosDomicilio()
  cargarFamiliares()

  // Abrir modal para editar datos generales
  btnEditarDatosGenerales.addEventListener("click", () => {
    const datos = window.obtenerDatos()

    // Llenar formulario con datos existentes
    document.getElementById("nombre").value = datos.docente.nombre
    document.getElementById("dni").value = datos.docente.dni
    document.getElementById("especialidad").value = datos.docente.especialidad
    document.getElementById("correo").value = datos.docente.correo
    document.getElementById("telefono").value = datos.docente.telefono

    // Mostrar modal
    window.mostrarModal("modalDatosGenerales")
  })

  // Abrir modal para editar domicilio
  btnEditarDomicilio.addEventListener("click", () => {
    const datos = window.obtenerDatos()

    // Llenar formulario con datos existentes
    document.getElementById("direccion").value = datos.domicilio.direccion
    document.getElementById("departamento").value = datos.domicilio.departamento
    document.getElementById("provincia").value = datos.domicilio.provincia
    document.getElementById("distrito").value = datos.domicilio.distrito
    document.getElementById("codigoPostal").value = datos.domicilio.codigoPostal

    // Mostrar modal
    window.mostrarModal("modalDomicilio")
  })

  // Abrir modal para agregar familiar
  btnAgregarFamiliar.addEventListener("click", () => {
    // Limpiar formulario
    document.getElementById("idFamiliar").value = ""
    formFamiliar.reset()

    // Mostrar modal
    window.mostrarModal("modalFamiliar")
  })

  // Manejar envío del formulario de datos generales
  formDatosGenerales.addEventListener("submit", (e) => {
    e.preventDefault()

    // Obtener datos actuales
    const datos = window.obtenerDatos()

    // Actualizar datos del docente
    datos.docente = {
      nombre: document.getElementById("nombre").value,
      dni: document.getElementById("dni").value,
      especialidad: document.getElementById("especialidad").value,
      correo: document.getElementById("correo").value,
      telefono: document.getElementById("telefono").value,
    }

    // Guardar datos actualizados
    window.guardarDatos(datos)

    // Actualizar nombre en el menú lateral
    document.getElementById("nombreDocente").textContent = datos.docente.nombre

    // Actualizar información mostrada
    cargarDatosGenerales()

    // Cerrar modal
    window.cerrarModal("modalDatosGenerales")

    // Mostrar mensaje de éxito
    alert("Datos generales guardados correctamente")
  })

  // Manejar envío del formulario de domicilio
  formDatosDomicilio.addEventListener("submit", (e) => {
    e.preventDefault()

    // Obtener datos actuales
    const datos = window.obtenerDatos()

    // Actualizar datos de domicilio
    datos.domicilio = {
      direccion: document.getElementById("direccion").value,
      departamento: document.getElementById("departamento").value,
      provincia: document.getElementById("provincia").value,
      distrito: document.getElementById("distrito").value,
      codigoPostal: document.getElementById("codigoPostal").value,
    }

    // Guardar datos actualizados
    window.guardarDatos(datos)

    // Actualizar información mostrada
    cargarDatosDomicilio()

    // Cerrar modal
    window.cerrarModal("modalDomicilio")

    // Mostrar mensaje de éxito
    alert("Datos de domicilio guardados correctamente")
  })

  // Manejar envío del formulario de familiar
  formFamiliar.addEventListener("submit", (e) => {
    e.preventDefault()

    // Obtener datos actuales
    const datos = window.obtenerDatos()

    // Obtener valores del formulario
    const idFamiliar = document.getElementById("idFamiliar").value
    const nombreFamiliar = document.getElementById("nombreFamiliar").value
    const parentesco = document.getElementById("parentesco").value
    const telefonoFamiliar = document.getElementById("telefonoFamiliar").value

    if (idFamiliar) {
      // Editar familiar existente
      const index = datos.familiares.findIndex((f) => f.id == idFamiliar)
      if (index !== -1) {
        datos.familiares[index] = {
          id: Number.parseInt(idFamiliar),
          nombre: nombreFamiliar,
          parentesco: parentesco,
          telefono: telefonoFamiliar,
        }
      }
    } else {
      // Agregar nuevo familiar
      // Generar nuevo ID (máximo ID + 1)
      const nuevoId = datos.familiares.length > 0 ? Math.max(...datos.familiares.map((f) => f.id)) + 1 : 1

      datos.familiares.push({
        id: nuevoId,
        nombre: nombreFamiliar,
        parentesco: parentesco,
        telefono: telefonoFamiliar,
      })
    }

    // Guardar datos actualizados
    window.guardarDatos(datos)

    // Recargar tabla de familiares
    cargarFamiliares()

    // Cerrar modal
    window.cerrarModal("modalFamiliar")
  })

  // Función para cargar datos generales
  function cargarDatosGenerales() {
    const datos = window.obtenerDatos()

    // Mostrar datos en la interfaz
    document.getElementById("infoNombre").textContent = datos.docente.nombre || "No especificado"
    document.getElementById("infoDni").textContent = datos.docente.dni || "No especificado"
    document.getElementById("infoEspecialidad").textContent = datos.docente.especialidad || "No especificado"
    document.getElementById("infoCorreo").textContent = datos.docente.correo || "No especificado"
    document.getElementById("infoTelefono").textContent = datos.docente.telefono || "No especificado"
  }

  // Función para cargar datos de domicilio
  function cargarDatosDomicilio() {
    const datos = window.obtenerDatos()

    // Mostrar datos en la interfaz
    document.getElementById("infoDireccion").textContent = datos.domicilio.direccion || "No especificado"
    document.getElementById("infoDepartamento").textContent = datos.domicilio.departamento || "No especificado"
    document.getElementById("infoProvincia").textContent = datos.domicilio.provincia || "No especificado"
    document.getElementById("infoDistrito").textContent = datos.domicilio.distrito || "No especificado"
    document.getElementById("infoCodigoPostal").textContent = datos.domicilio.codigoPostal || "No especificado"
  }

  // Función para cargar familiares
  function cargarFamiliares() {
    const datos = window.obtenerDatos()
    const familiares = datos.familiares

    // Limpiar tabla
    tablaFamiliares.innerHTML = ""

    // Si no hay familiares, mostrar mensaje
    if (familiares.length === 0) {
      const fila = document.createElement("tr")
      fila.innerHTML = '<td colspan="4" class="text-center">No hay familiares registrados</td>'
      tablaFamiliares.appendChild(fila)
      return
    }

    // Agregar filas a la tabla
    familiares.forEach((familiar) => {
      const fila = document.createElement("tr")

      // Crear celdas con los datos
      fila.innerHTML = `
                <td>${familiar.nombre}</td>
                <td>${familiar.parentesco}</td>
                <td>${familiar.telefono}</td>
                <td>
                    <button class="boton boton-secundario btn-editar" data-id="${familiar.id}">Editar</button>
                    <button class="boton boton-peligro btn-eliminar" data-id="${familiar.id}">Eliminar</button>
                </td>
            `

      tablaFamiliares.appendChild(fila)
    })

    // Agregar eventos a los botones de editar
    document.querySelectorAll(".btn-editar").forEach((btn) => {
      btn.addEventListener("click", function () {
        const idFamiliar = this.getAttribute("data-id")
        editarFamiliar(idFamiliar)
      })
    })

    // Agregar eventos a los botones de eliminar
    document.querySelectorAll(".btn-eliminar").forEach((btn) => {
      btn.addEventListener("click", function () {
        const idFamiliar = this.getAttribute("data-id")
        eliminarFamiliar(idFamiliar)
      })
    })
  }

  // Función para editar un familiar
  function editarFamiliar(id) {
    const datos = window.obtenerDatos()
    const familiar = datos.familiares.find((f) => f.id == id)

    if (familiar) {
      // Llenar formulario con datos del familiar
      document.getElementById("idFamiliar").value = familiar.id
      document.getElementById("nombreFamiliar").value = familiar.nombre
      document.getElementById("parentesco").value = familiar.parentesco
      document.getElementById("telefonoFamiliar").value = familiar.telefono

      // Mostrar modal
      window.mostrarModal("modalFamiliar")
    }
  }

  // Función para eliminar un familiar
  function eliminarFamiliar(id) {
    if (confirm("¿Está seguro de eliminar este familiar?")) {
      // Obtener datos actuales
      const datos = window.obtenerDatos()

      // Filtrar familiares para eliminar el seleccionado
      datos.familiares = datos.familiares.filter((f) => f.id != id)

      // Guardar datos actualizados
      window.guardarDatos(datos)

      // Recargar tabla de familiares
      cargarFamiliares()
    }
  }

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
})

