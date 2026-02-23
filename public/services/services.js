// CRUD CARTELERA
export async function obtenerCartelera() {
    try {
        const respuesta = await fetch("http://localhost:3001/cartelera");
        return await respuesta.json();
    } catch (error) {
        console.error("Error al obtener la cartelera:", error);
    }
}

// Agrega una nueva película a la cartelera
export async function agregarCartelera(pelicula) {
    try {
        const respuesta = await fetch("http://localhost:3001/cartelera", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(pelicula)
        });
        return await respuesta.json();
    } catch (error) {
        console.error("Error al agregar a la cartelera:", error);
    }
}

// aqui actualizo o edito una pelicula de la cartelera ya sea del carrusel de estrenos o semanal
export async function actualizarCartelera(pelicula, id) {
    try {
        const respuesta = await fetch("http://localhost:3001/cartelera/" + id, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(pelicula)
        });
        return await respuesta.json();
    } catch (error) {
        console.error("Error al actualizar la cartelera:", error); 
    }
}

// Elimina una película de la cartelera
export async function eliminarCartelera(id) {
    try {
        const respuesta = await fetch("http://localhost:3001/cartelera/" + id, {
            method: "DELETE"
        });
        return await respuesta.json();
    } catch (error) {
        console.error("Error al eliminar de la cartelera:", error);
    }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//CRUD SALAS
export async function obtenerSalas() {
    try {
        const respuesta = await fetch("http://localhost:3001/salas"); // Petición GET a las salas
        return await respuesta.json(); // Retorna la lista de salas en JSON
    } catch (error) {
        console.error("Error al obtener las salas:", error);
    }
}

// Agrega una nueva sala de cine
export async function agregarSala(sala) {
    try {
        const respuesta = await fetch("http://localhost:3001/salas", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(sala)
        });
        return await respuesta.json();
    } catch (error) {
        console.error("Error al agregar la sala:", error); 
    }
}

// Actualiza la configuración de una sala
export async function actualizarSala(sala, id) {
    try {
        const respuesta = await fetch("http://localhost:3001/salas/" + id, {
            method: "PATCH", 
            headers: { "Content-Type": "application/json" }, 
            body: JSON.stringify(sala) 
        });
        return await respuesta.json(); 
    } catch (error) {
        console.error("Error al actualizar la sala:", error); 
    }
}

// Elimina una sala del registro
export async function eliminarSala(id) {
    try {
        const respuesta = await fetch("http://localhost:3001/salas/" + id, {
            method: "DELETE" // Método para eliminar la sala por ID
        });
        return await respuesta.json(); // Retorna el resultado de la operación
    } catch (error) {
        console.error("Error al eliminar la sala:", error); // Muestra el error en consola
    }
}
