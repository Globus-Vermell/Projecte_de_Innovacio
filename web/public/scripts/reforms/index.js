// Función para eliminar una reforma
async function deleteReform(id) {
    await AppUtils.confirmAndDelete(`/reforms/delete/${id}`, "Segur que vols eliminar aquesta reforma?");
}

// Función para filtrar reformas
function filterReforms() {
    const inputVal = document.getElementById('searchInput').value;
    const params = new URLSearchParams();

    if (inputVal) params.set('search', inputVal);
    params.set('page', 1); // Reset a página 1

    window.location.href = `/reforms?${params.toString()}`;
}