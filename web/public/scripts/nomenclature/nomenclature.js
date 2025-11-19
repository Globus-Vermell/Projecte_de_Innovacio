async function deleteNomenclature(id) {
    if (!confirm("Segur que vols eliminar aquesta nomenclatura?")) return;

    try {
        const res = await fetch(`/nomenclature/delete/${id}`, {
            method: "DELETE"
        });

        const data = await res.json();
        alert(data.message);

        if (data.success) location.reload();
    } catch (err) {
        console.error(err);
        alert("Error al eliminar la nomenclatura");
    }
}

function filterNomenclature(searchTerm) {
    const cards = document.querySelectorAll('.architect-card');
    const lowerCaseSearchTerm = searchTerm.toLowerCase();

    cards.forEach(card => {
        const name = card.dataset.name;
        const description = card.dataset.description;
        if (name.includes(lowerCaseSearchTerm) || description.includes(lowerCaseSearchTerm)) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
}