const form = document.getElementById('form-prize-edit');
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());

    try {
        const res = await fetch(`/prizes/edit/<%= prize.id_prize %>`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        });

        const result = await res.json();
        alert(result.message);
        if (result.success) window.location.href = '/prizes';
    } catch (err) {
        console.error(err);
        alert('Error al actualizar el premi');
    }
});