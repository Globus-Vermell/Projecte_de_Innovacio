// Formulario de edición de protección
document.addEventListener("DOMContentLoaded", () => {
    // Obtenemos el formulario
    const form = document.getElementById('form-protection-edit');

    // Agregamos el listener al formulario
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        // Obtenemos los datos del formulario
        const data = Object.fromEntries(new FormData(form).entries());

        try {
            // Enviamos los datos al servidor
            const res = await fetch(`/protection/edit/${protection.id_protection}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            // Obtenemos la respuesta del servidor
            const result = await res.json();
            alert(result.message);
            if (result.success) window.location.href = '/protection';
        } catch (err) {
            console.error(err);
            alert('Error al actualizar la protecció');
        }
    });
});