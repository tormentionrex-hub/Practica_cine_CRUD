import {
    obtenerCartelera, agregarCartelera, actualizarCartelera, eliminarCartelera,
    obtenerSalas, agregarSala, actualizarSala, eliminarSala
} from "../services/services.js";

document.addEventListener("DOMContentLoaded", () => {
    console.log("Panel Administrativo - Horrorix Iniciado");

    const formularioCartelera = document.getElementById("formularioCarteleraId");
    const cuerpoTablaCartelera = document.getElementById("cuerpoTablaCarteleraId");
    const entradaImagen = document.getElementById("carteleraImagen");
    const previsualizacion = document.getElementById("carteleraPreview");

    const formularioSalas = document.getElementById("formularioSalasId");
    const cuerpoTablaSalas = document.getElementById("cuerpoTablaSalasId");

    const botonCancelarCartelera = document.getElementById("botonCancelarCartelera");
    const botonCancelarSalas = document.getElementById("botonCancelarSalas");

    entradaImagen.addEventListener("input", () => {
        if (entradaImagen.value) {
            previsualizacion.src = entradaImagen.value;
            previsualizacion.style.display = "block";
        } else {
            previsualizacion.src = "";
            previsualizacion.style.display = "none";
        }
    });


    const cargarCarteleraAlDia = async () => {
        const listaPeliculas = await obtenerCartelera();
        cuerpoTablaCartelera.innerHTML = "";

        listaPeliculas.forEach(item => {
            const fila = document.createElement("tr");
            fila.innerHTML = `
                <td>
                    <img src="${item.imagen}" 
                         class="miniaturaPelicula" 
                         alt="${item.titulo}" 
                         onerror="this.src='../img/publiBanner.png'; this.style.opacity='0.5';">
                </td>
                <td>${item.titulo}</td>
                <td><span class="insigniaEtiqueta">${item.tag || "SIN ETIQUETA"}</span></td>
                <td class="acciones">
                    <button class="boton botonEditar" data-id="${item.id}">EDITAR</button>
                    <button class="boton botonEliminar" data-id="${item.id}">ELIMINAR</button>
                </td>
            `;
            cuerpoTablaCartelera.appendChild(fila);
        });
    };

    formularioCartelera.addEventListener("submit", async (evento) => {
        evento.preventDefault();
        const idActual = document.getElementById("carteleraId").value;
        const datosEnviados = {
            titulo: document.getElementById("carteleraTitulo").value,
            imagen: entradaImagen.value,
            tag: document.getElementById("carteleraTag").value
        };

        try {
            if (idActual) {
                await actualizarCartelera(datosEnviados, idActual);
                Swal.fire({
                    title: "¡Actualizado!",
                    text: "Datos modificados con éxito.",
                    icon: "success",
                    background: "#151515",
                    color: "#d4d4d4",
                    confirmButtonColor: "#7a0606"
                });
            } else {
                await agregarCartelera(datosEnviados);
                Swal.fire({
                    title: "¡Creado!",
                    text: "Nueva película en cartelera.",
                    icon: "success",
                    background: "#151515",
                    color: "#d4d4d4",
                    confirmButtonColor: "#7a0606"
                });
            }

            formularioCartelera.reset();
            document.getElementById("carteleraId").value = "";
            previsualizacion.style.display = "none";
            botonCancelarCartelera.style.display = "none";
            cargarCarteleraAlDia();
        } catch (error) {
            console.error("Fallo en Cartelera:", error);
        }
    });

    cuerpoTablaCartelera.addEventListener("click", async (evento) => {
        const idSeleccionado = evento.target.dataset.id;

        if (evento.target.classList.contains("botonEliminar")) {
            Swal.fire({
                title: "¿Eliminar película?",
                text: "No podrás revertir este cambio.",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#7a0606",
                cancelButtonColor: "#333",
                confirmButtonText: "Eliminar ahora",
                cancelButtonText: "Cancelar",
                background: "#151515",
                color: "#d4d4d4"
            }).then(async (resultado) => {
                if (resultado.isConfirmed) {
                    await eliminarCartelera(idSeleccionado);
                    cargarCarteleraAlDia();
                    Swal.fire({
                        title: "Borrado",
                        icon: "success",
                        background: "#151515",
                        color: "#d4d4d4",
                        confirmButtonColor: "#7a0606"
                    });
                }
            });
        }

        if (evento.target.classList.contains("botonEditar")) {
            const listado = await obtenerCartelera();
            const peliculaHallada = listado.find(p => p.id == idSeleccionado);

            document.getElementById("carteleraId").value = peliculaHallada.id;
            document.getElementById("carteleraTitulo").value = peliculaHallada.titulo;
            entradaImagen.value = peliculaHallada.imagen;
            document.getElementById("carteleraTag").value = peliculaHallada.tag;

            previsualizacion.src = peliculaHallada.imagen;
            previsualizacion.style.display = "block";
            botonCancelarCartelera.style.display = "block";

            formularioCartelera.scrollIntoView({ behavior: "smooth" });
        }
    });

    botonCancelarCartelera.addEventListener("click", () => {
        Swal.fire({
            title: "¿Estás seguro?",
            text: "¿Quieres dejar de editar los cambios sin guardar?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#7a0606",
            cancelButtonColor: "#333",
            confirmButtonText: "Sí, cancelar",
            cancelButtonText: "No, seguir editando",
            background: "#151515",
            color: "#d4d4d4"
        }).then((resultado) => {
            if (resultado.isConfirmed) {
                formularioCartelera.reset();
                document.getElementById("carteleraId").value = "";
                previsualizacion.style.display = "none";
                botonCancelarCartelera.style.display = "none";
            }
        });
    });

    const cargarSalasAlDia = async () => {
        const listaSalas = await obtenerSalas();
        cuerpoTablaSalas.innerHTML = "";

        listaSalas.forEach(sala => {
            const fila = document.createElement("tr");
            fila.innerHTML = `
                <td>${sala.nombre}</td>
                <td>${sala.capacidad}</td>
                <td><span class="insigniaTipo">${sala.tipo}</span></td>
                <td class="acciones">
                    <button class="boton botonEditar" data-id="${sala.id}">EDITAR</button>
                    <button class="boton botonEliminar" data-id="${sala.id}">ELIMINAR</button>
                </td>
            `;
            cuerpoTablaSalas.appendChild(fila);
        });
    };

    formularioSalas.addEventListener("submit", async (evento) => {
        evento.preventDefault();
        const idActual = document.getElementById("salaId").value;
        const datosSala = {
            nombre: document.getElementById("salaNombre").value,
            capacidad: document.getElementById("salaCapacidad").value,
            tipo: document.getElementById("salaTipo").value
        };

        if (idActual) {
            await actualizarSala(datosSala, idActual);
            Swal.fire({
                title: "Sala Actualizada",
                icon: "success",
                background: "#151515",
                color: "#d4d4d4",
                confirmButtonColor: "#7a0606"
            });
        } else {
            await agregarSala(datosSala);
            Swal.fire({
                title: "Sala Guardada",
                icon: "success",
                background: "#151515",
                color: "#d4d4d4",
                confirmButtonColor: "#7a0606"
            });
        }

        formularioSalas.reset();
        document.getElementById("salaId").value = "";
        botonCancelarSalas.style.display = "none";
        cargarSalasAlDia();
    });

    cuerpoTablaSalas.addEventListener("click", async (evento) => {
        const idSeleccionado = evento.target.dataset.id;

        if (evento.target.classList.contains("botonEliminar")) {
            Swal.fire({
                title: "¿Borrar esta sala?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#7a0606",
                cancelButtonColor: "#333",
                confirmButtonText: "Borrar",
                cancelButtonText: "No borrar",
                background: "#151515",
                color: "#d4d4d4"
            }).then(async (resultado) => {
                if (resultado.isConfirmed) {
                    await eliminarSala(idSeleccionado);
                    cargarSalasAlDia();
                    Swal.fire({
                        title: "Sala eliminada",
                        icon: "success",
                        background: "#151515",
                        color: "#d4d4d4",
                        confirmButtonColor: "#7a0606"
                    });
                }
            });
        }

        if (evento.target.classList.contains("botonEditar")) {
            const listado = await obtenerSalas();
            const salaHallada = listado.find(s => s.id == idSeleccionado);

            document.getElementById("salaId").value = salaHallada.id;
            document.getElementById("salaNombre").value = salaHallada.nombre;
            document.getElementById("salaCapacidad").value = salaHallada.capacidad;
            document.getElementById("salaTipo").value = salaHallada.tipo;
            botonCancelarSalas.style.display = "block";
        }
    });

    botonCancelarSalas.addEventListener("click", () => {
        Swal.fire({
            title: "¿Estás seguro?",
            text: "¿Quieres dejar de editar los cambios sin guardar?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#7a0606",
            cancelButtonColor: "#333",
            confirmButtonText: "Sí, cancelar",
            cancelButtonText: "No, seguir editando",
            background: "#151515",
            color: "#d4d4d4"
        }).then((resultado) => {
            if (resultado.isConfirmed) {
                formularioSalas.reset();
                document.getElementById("salaId").value = "";
                botonCancelarSalas.style.display = "none";
            }
        });
    });

    cargarCarteleraAlDia();
    cargarSalasAlDia();
});
