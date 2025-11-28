// Función para eliminar una protección
async function deleteProtection(id) {
    // Confirmar la eliminación
    if (!confirm("Segur que vols eliminar aquesta protecció?")) return;

    try {
        // Realizar la solicitud DELETE al servidor
        const res = await fetch(`/protection/delete/${id}`, { method: "DELETE" });
        // Procesar la respuesta del servidor
        const data = await res.json();
        alert(data.message);
        if (data.success) location.reload();
    } catch (err) {
        console.error(err);
        alert("Error al eliminar la protecció");
    }
}

// Función para filtrar protecciones
function filterProtections() {
    // Obtenemos todas las partes relevantes directamente desde el ejs 
    const input = document.getElementById('searchInput');
    const searchTerm = input ? input.value.toLowerCase() : '';

    const cards = document.querySelectorAll('.card');
    //Filtramos las cards por nivel o descripción para ver si coinciden con el término de búsqueda
    cards.forEach(card => {
        const level = (card.dataset.level || '').toLowerCase();
        const desc = (card.dataset.description || '').toLowerCase();

        card.style.display = (level.includes(searchTerm) || desc.includes(searchTerm)) ? 'flex' : 'none';
    });
}