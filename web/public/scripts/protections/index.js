// Función para eliminar una protección
async function deleteProtection(id) {
    await AppUtils.confirmAndDelete(`/protections/delete/${id}`, "Segur que vols eliminar aquesta protecció?");
}

// Función para filtrar protecciones
function filterProtections() {
    const inputVal = document.getElementById('searchInput').value;
    const params = new URLSearchParams();

    if (inputVal) params.set('search', inputVal);

    window.location.href = `/protections?${params.toString()}`;
}