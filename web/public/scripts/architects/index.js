// Función para eliminar un arquitecto
async function deleteArchitect(id) {
    await AppUtils.confirmAndDelete(`/architects/delete/${id}`, "Segur que vols eliminar aquest arquitecte?");
}

// Función para filtrar arquitectos
function filterArchitects() {
    // 1. Obtenemos el valor del input
    const inputVal = document.getElementById('searchInput').value;

    // 2. Preparamos los parámetros de la URL
    const params = new URLSearchParams();

    if (inputVal) {
        params.set('search', inputVal);
    }

    // Volvemos siempre a la página 1 al buscar
    params.set('page', 1);

    // 3. Recargamos la página con la nueva búsqueda
    window.location.href = `/architects?${params.toString()}`;
}