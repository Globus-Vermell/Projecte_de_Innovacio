document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById('form-protection-edit');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(form).entries());

        try {
            const res = await fetch(`/protection/edit/${protection.id_protection}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            const result = await res.json();
            alert(result.message);
            if (result.success) window.location.href = '/protection';
        } catch (err) {
            console.error(err);
            alert('Error al actualizar la protecció');
        }
    });
});