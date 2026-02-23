import { obtenerCartelera } from "../services/services.js";

document.addEventListener("DOMContentLoaded", async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const peliculaId = urlParams.get("id");

    const contenedorDetalle = document.getElementById("detallePeliculaId");
    const rejillaAsientos = document.getElementById("rejillaAsientosId");
    const contadorAsientos = document.getElementById("contadorAsientos");
    const totalPrecio = document.getElementById("totalPrecio");
    const botonConfirmar = document.getElementById("botonComprarFinalId");

    const PRECIO_ASIENTO = 3500; // Precio ficticio en colones o dolares
    let asientosSeleccionados = [];

    // Cargar información de la película
    const cargarInformacion = async () => {
        let pelicula;
        if (peliculaId && peliculaId.startsWith("hc-")) {
            // Datos de ejemplo para las películas quemadas en el HTML
            const hardcodedMovies = [
                { titulo: "The Substance", imagen: "https://m.media-amazon.com/images/M/MV5BZmQ3NmIxNTgtYjFiNS00NzliLWI0YzAtZDkxY2E0YWIxZDEwXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg", tag: "ESTRENO" },
                { titulo: "Hallowen", imagen: "https://m.media-amazon.com/images/M/MV5BMTVjMzNmZGYtOWU5NS00NDYzLThhZTktZGNlODIwYWVhMDRmXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg", tag: "ESTRENO" },
                { titulo: "Miedo Profundo", imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHXm2Lc8UxzUMAuqELpcwsLbS15REcyV5bSA&s", tag: "ESTRENO" },
                { titulo: "La Profecía", imagen: "https://m.media-amazon.com/images/S/pv-target-images/178c2a0f654a66eda07ca098fa243728b6bc7c5f4359863860e12c50be3b8e39.jpg", tag: "ESTRENO" }
            ];
            const index = parseInt(peliculaId.split("-")[1]);
            pelicula = hardcodedMovies[index];
        } else {
            const cartelera = await obtenerCartelera();
            pelicula = cartelera.find(p => p.id === peliculaId);
        }

        if (pelicula) {
            contenedorDetalle.innerHTML = `
                <img src="${pelicula.imagen}" alt="${pelicula.titulo}" class="posterPelicula">
                <div class="infoPelicula">
                    <span class="etiquetaDetalle">${pelicula.tag || 'CARTELERA'}</span>
                    <h1>${pelicula.titulo}</h1>
                    <p class="sinopsis">
                        Experimenta el terror en su estado más puro. Horrorix te trae las mejores exclusivas del cine de género. 
                        Selecciona tu fila y asiento para asegurar tu lugar en esta pesadilla cinematográfica.
                    </p>
                    <div class="metadatos">
                        <span>DURACIÓN: 115 MIN</span>
                        <span>|</span>
                        <span>GÉNERO: HORROR</span>
                        <span>|</span>
                        <span>SALA 01 - IMAX</span>
                    </div>
                </div>
            `;
        } else {
            contenedorDetalle.innerHTML = `<div class="infoPelicula"><h1>Selecciona una película de la cartelera</h1></div>`;
        }
    };

    // Generar 30 asientos
    const generarAsientos = () => {
        rejillaAsientos.innerHTML = "";
        for (let i = 1; i <= 30; i++) {
            const asiento = document.createElement("div");
            asiento.classList.add("asiento", "disponible");
            asiento.dataset.numero = i;

            // Simular algunos asientos ocupados aleatoriamente
            if (Math.random() < 0.2) {
                asiento.classList.replace("disponible", "ocupado");
            }

            asiento.addEventListener("click", () => {
                if (asiento.classList.contains("disponible")) {
                    asiento.classList.replace("disponible", "seleccionado");
                    asientosSeleccionados.push(i);
                } else if (asiento.classList.contains("seleccionado")) {
                    asiento.classList.replace("seleccionado", "disponible");
                    asientosSeleccionados = asientosSeleccionados.filter(n => n !== i);
                }
                actualizarResumen();
            });

            rejillaAsientos.appendChild(asiento);
        }
    };

    const actualizarResumen = () => {
        contadorAsientos.textContent = asientosSeleccionados.length;
        totalPrecio.textContent = (asientosSeleccionados.length * PRECIO_ASIENTO).toLocaleString();
    };

    botonConfirmar.addEventListener("click", () => {
        if (asientosSeleccionados.length === 0) {
            Swal.fire({
                title: "Error",
                text: "Por favor, selecciona al menos un asiento.",
                icon: "error",
                background: "#151515",
                color: "#d4d4d4",
                confirmButtonColor: "#7a0606"
            });
            return;
        }

        Swal.fire({
            title: "¡Compra exitosa!",
            text: `Has comprado ${asientosSeleccionados.length} entradas por ₡${(asientosSeleccionados.length * PRECIO_ASIENTO).toLocaleString()}. ¡Disfruta la función!`,
            icon: "success",
            background: "#151515",
            color: "#d4d4d4",
            confirmButtonColor: "#7a0606"
        }).then(() => {
            window.location.href = "../pages/home.html";
        });
    });

    await cargarInformacion();
    generarAsientos();
});
