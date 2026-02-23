import { obtenerCartelera } from "../services/services.js";

document.addEventListener("DOMContentLoaded", async () => {
    console.log("Horrorix - Inicio Inicializado");

    const contenedorBanners = document.getElementById("pistaBannersId");
    const botonAnteriorBanners = document.getElementById("botonPrevioBannerId");
    const botonSiguienteBanners = document.getElementById("botonSiguienteBannerId");
    let diapositivaActualIndice = 0;
    const totalDiapositivas = 3;
    const intervaloTiempo = 45000; // 45 segundos

    const refrescarBanner = () => {
        if (contenedorBanners) {
            contenedorBanners.style.setProperty("--diapositivaActual", diapositivaActualIndice);
        }
    };

    const avanzarDiapositiva = () => {
        diapositivaActualIndice = (diapositivaActualIndice + 1) % totalDiapositivas;
        refrescarBanner();
    };

    const retrocederDiapositiva = () => {
        diapositivaActualIndice = (diapositivaActualIndice - 1 + totalDiapositivas) % totalDiapositivas;
        refrescarBanner();
    };

    if (botonSiguienteBanners && botonAnteriorBanners) {
        botonSiguienteBanners.addEventListener("click", () => {
            avanzarDiapositiva();
            reiniciarTemporizador();
        });

        botonAnteriorBanners.addEventListener("click", () => {
            retrocederDiapositiva();
            reiniciarTemporizador();
        });
    }

    let idIntervalo = setInterval(avanzarDiapositiva, intervaloTiempo);

    const reiniciarTemporizador = () => {
        clearInterval(idIntervalo);
        idIntervalo = setInterval(avanzarDiapositiva, intervaloTiempo);
    };

    const rejillaPeliculas = document.getElementById("rejillaCarteleraId");
    const botonAnteriorPeliculas = document.getElementById("botonPrevioCarteleraId");
    const botonSiguientePeliculas = document.getElementById("botonSiguienteCarteleraId");

    if (rejillaPeliculas && botonSiguientePeliculas && botonAnteriorPeliculas) {
        const cantidadDesplazamiento = 300;

        botonSiguientePeliculas.addEventListener("click", () => {
            rejillaPeliculas.scrollBy({ left: cantidadDesplazamiento, behavior: "smooth" });
        });

        botonAnteriorPeliculas.addEventListener("click", () => {
            rejillaPeliculas.scrollBy({ left: -cantidadDesplazamiento, behavior: "smooth" });
        });
    }

    // --- Lógica del Carrusel de Promociones Especiales ---
    const pistaPromos = document.getElementById("pistaPromosId");
    const listaDiapositivasPromos = document.querySelectorAll(".diapositivaPromo");
    const botonAnteriorPromos = document.getElementById("botonPrevioPromosId");
    const botonSiguientePromos = document.getElementById("botonSiguientePromosId");

    let indicePromocionActiva = 1;

    const refrescarCarruselPromos = () => {
        listaDiapositivasPromos.forEach((diapositiva, indice) => {
            diapositiva.classList.remove("activa");

            if (indice === indicePromocionActiva) {
                diapositiva.classList.add("activa");
            }
        });

        if (pistaPromos) {
            const desplazamiento = (indicePromocionActiva - 1) * -450;
            pistaPromos.style.transform = `translateX(${desplazamiento}px)`;
        }
    };

    if (botonSiguientePromos && botonAnteriorPromos) {
        botonSiguientePromos.addEventListener("click", () => {
            if (indicePromocionActiva < listaDiapositivasPromos.length - 1) {
                indicePromocionActiva++;
            } else {
                indicePromocionActiva = 0;
            }
            refrescarCarruselPromos();
        });

        botonAnteriorPromos.addEventListener("click", () => {
            if (indicePromocionActiva > 0) {
                indicePromocionActiva--;
            } else {
                indicePromocionActiva = listaDiapositivasPromos.length - 1;
            }
            refrescarCarruselPromos();
        });
    }

    // --- Lógica de Cartelera Dinámica ---
    const renderizarCartelera = async () => {
        const cartelera = await obtenerCartelera();
        if (!rejillaPeliculas || !cartelera) return;

        // Limpiamos la rejilla si hay datos en la DB
        if (cartelera.length > 0) {
            rejillaPeliculas.innerHTML = "";
            cartelera.forEach(pelicula => {
                const tarjeta = document.createElement("div");
                tarjeta.className = "tarjetaPelicula";
                tarjeta.innerHTML = `
                    <div class="etiquetaTarjeta">${pelicula.tag || 'CARTELERA'}</div>
                    <img src="${pelicula.imagen}" alt="${pelicula.titulo}" style="cursor: pointer;">
                    <button class="botonComprar" onclick="window.location.href='../pages/Salas.html?id=${pelicula.id}'">Comprar Boleto</button>
                `;

                // Evento click en la imagen
                tarjeta.querySelector("img").addEventListener("click", () => {
                    window.location.href = `../pages/Salas.html?id=${pelicula.id}`;
                });

                rejillaPeliculas.appendChild(tarjeta);
            });
        } else {
            // Si no hay nada en la DB, hacemos que las hardcodeadas sean clickeables (opcional)
            const tarjetasHardcoded = rejillaPeliculas.querySelectorAll(".tarjetaPelicula");
            tarjetasHardcoded.forEach((tarjeta, index) => {
                const img = tarjeta.querySelector("img");
                const btn = tarjeta.querySelector(".botonComprar");

                // Asignamos un ID ficticio o basado en el index para demostración
                const idFicticio = `hc-${index}`;
                img.style.cursor = "pointer";
                img.addEventListener("click", () => {
                    window.location.href = `../pages/Salas.html?id=${idFicticio}`;
                });
                if (btn) {
                    btn.addEventListener("click", () => {
                        window.location.href = `../pages/Salas.html?id=${idFicticio}`;
                    });
                }
            });
        }
    };

    renderizarCartelera();
    refrescarCarruselPromos();
});

