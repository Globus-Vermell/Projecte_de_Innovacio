async function deleteArchitect(id) {
    if (!confirm("Segur que vols eliminar aquest arquitecte?")) return;

    try {
        const res = await fetch(`/architects/delete/${id}`, {
            method: "DELETE"
        });

        const data = await res.json();
        alert(data.message);

        if (data.success) location.reload();
    } catch (err) {
        alert("Error al eliminar l'arquitecte");
    }
}

function filterArchitects(searchTerm) {
    const cards = document.querySelectorAll('.architect-card');
    const s = searchTerm.toLowerCase();

    cards.forEach(card => {
        const name = card.dataset.name;
        const desc = card.dataset.description;
        card.style.display = (name.includes(s) || desc.includes(s)) ? 'flex' : 'none';
    });
}