// Función para eliminar un premio
async function deletePrize(id) {
    await AppUtils.confirmAndDelete(`/prizes/delete/${id}`, "Segur que vols eliminar aquest premi?");
}
// Función para filtrar premios
function filterPrizes() {
    const inputVal = document.getElementById('searchInput').value;
    const params = new URLSearchParams();

    if (inputVal) params.set('search', inputVal);

    window.location.href = `/prizes?${params.toString()}`;
}