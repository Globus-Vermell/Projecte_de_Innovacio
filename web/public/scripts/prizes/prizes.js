// Función para eliminar un premio
async function deletePrize(id) {
    // Confirmar la eliminación
    if (!confirm("Segur que vols eliminar aquest premi?")) return;

    // Realizar la solicitud DELETE al servidor
    try {
        const res = await fetch(`/prizes/delete/${id}`, {
            method: "DELETE"
        });
        // Procesar la respuesta del servidor
        const data = await res.json();
        alert(data.message);

        if (data.success) location.reload();
    } catch (err) {
        console.error(err);
        alert("Error al eliminar el premi");
    }
}
// Función para filtrar premios
function filterPrizes() {
    // 1. Buscamos el input por su ID
    const input = document.getElementById('searchInput');
    
    // 2. Obtenemos el valor y lo pasamos a minúsculas (con seguridad)
    // Si el input no existe o está vacío, usamos una cadena vacía ''
    const searchTerm = input ? input.value.toLowerCase() : '';

    const cards = document.querySelectorAll('.card');

    // 3. Filtramos las cards
    cards.forEach(card => {
        // Usamos dataset.name o un string vacío por seguridad
        const name = (card.dataset.name || '').toLowerCase();
        const desc = (card.dataset.description || '').toLowerCase();
        
        // Si coincide, mostramos (flex), si no, ocultamos (none)
        card.style.display = (name.includes(searchTerm) || desc.includes(searchTerm)) ? 'flex' : 'none';
    });
}