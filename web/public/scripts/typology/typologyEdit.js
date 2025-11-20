const form = document.getElementById('form-typology-edit');
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());

    try {
        const res = await fetch(`/typology/edit/${typology.id_typology}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        const result = await res.json();
        alert(result.message);
        if (result.success) window.location.href = '/typology';
    } catch (err) {
        console.error(err);
        alert('Error al actualizar la tipologia');
    }
});