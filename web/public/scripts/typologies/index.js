// Función para eliminar una tipología
async function deleteTypology(id) {
    await AppUtils.confirmAndDelete(`/typologies/delete/${id}`, "Segur que vols eliminar aquesta tipologia?");
}

// Función para filtrar tipologías
function filterTypologies() {
    const inputVal = document.getElementById('searchInput').value;
    const params = new URLSearchParams();
    if (inputVal) params.set('search', inputVal);
    window.location.href = `/typology?${params.toString()}`;
}