async function deleteUser(id) {
    if (!confirm("Segur que vols eliminar aquest usuari?")) return;

    const res = await fetch(`/users/delete/${id}`, { method: "DELETE" });
    const data = await res.json();

    alert(data.message);
    if (data.success) location.reload();
}

function filterUsers(text) {
    const s = text.toLowerCase();
    const cards = document.querySelectorAll('.architect-card');

    cards.forEach(c => {
        const name = c.dataset.name;
        const desc = c.dataset.description;
        c.style.display = (name.includes(s) || desc.includes(s)) ? 'flex' : 'none';
    });
}