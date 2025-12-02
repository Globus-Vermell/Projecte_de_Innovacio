// Función para eliminar un edificio
async function deleteBuilding(id) {
    // Confirmar la eliminación
    if (!confirm("Segur que vols eliminar aquest edifici?")) return;

    try {
        // Realizar la solicitud DELETE al servidor
        const res = await fetch(`/buildings/delete/${id}`, {
            method: "DELETE"
        });
        // Procesar la respuesta del servidor
        const data = await res.json();
        alert(data.message);

        if (data.success) location.reload();
    } catch (err) {
        console.error(err);
        alert("Error al eliminar l'edifici");
    }
}

// Función para eliminar un edificio
async function deleteBuilding(id) {
    if (!confirm("Segur que vols eliminar aquest edifici?")) return;

    try {
        const res = await fetch(`/buildings/delete/${id}`, { method: "DELETE" });
        const data = await res.json();
        alert(data.message);
        if (data.success) location.reload();
    } catch (err) {
        console.error(err);
        alert("Error al eliminar l'edifici");
    }
}

// Función de filtrado combinada
// Ahora lee directamente de los SELECTS del header
function filterBuildings() {
    // 1. Obtenemos los valores
    const inputVal = document.getElementById('searchInput').value.toLowerCase();
    
    // Aquí cambiamos: ahora cogemos el .value directamente del <select>
    const valSelect = document.getElementById('filterValidation').value;
    const imgSelect = document.getElementById('filterImage').value;
    const pubSelect = document.getElementById('filterPublication').value;

    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        // 1. Filtro Texto
        const name = (card.dataset.name || '').toLowerCase();
        const description = (card.dataset.description || '').toLowerCase();
        const matchesText = name.includes(inputVal) || description.includes(inputVal);

        // 2. Filtro Validación (comparación de strings)
        const isValidated = card.dataset.validated; 
        let matchesValidation = (valSelect === 'all') ? true : (isValidated === valSelect);

        // 3. Filtro Imagen
        const hasImage = card.querySelector('.card-image') !== null;
        let matchesImage = false;
        if (imgSelect === 'all') {
            matchesImage = true;
        } else if (imgSelect === 'true') {
            matchesImage = hasImage;
        } else {
            matchesImage = !hasImage;
        }

        // 4. Filtro Publicación
        const cardPubId = card.dataset.publication;
        let matchesPublication = false;
        if (pubSelect === 'all') {
            matchesPublication = true;
        } else {
            matchesPublication = (cardPubId == pubSelect); 
        }

        // Mostrar u ocultar 
        if (matchesText && matchesValidation && matchesImage && matchesPublication) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
}

// Función para reiniciar todo
function resetFilters() {
    document.getElementById('searchInput').value = '';
    // Reseteamos los selects a "all"
    document.getElementById('filterValidation').value = 'all';
    document.getElementById('filterImage').value = 'all';
    document.getElementById('filterPublication').value = 'all';
    
    filterBuildings(); // Refrescar la lista
}

// Función para validar una edificacion
async function validateBuilding(id) {
    if (!confirm("Segur que vols canviar l'estat de validació d'aquesta construcció?")) return;

    try {
        const res = await fetch(`/buildings/validation/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ validated: true })
        });

        const data = await res.json();
        alert(data.message);
        if (data.success) location.reload();
    } catch (err) {
        console.error(err);
        alert("Error al validar la construcció");
    }
}