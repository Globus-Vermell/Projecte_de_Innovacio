// Formulario de edición de reforma
document.addEventListener("DOMContentLoaded", () => {
    // Obtenemos el formulario
    const form = document.getElementById('form-reform-edit');

    // Agregamos el listener al formulario
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        // Obtenemos los datos del formulario
        const data = Object.fromEntries(new FormData(form).entries());

        try {
            // Enviamos los datos al servidor
            const res = await fetch(`/reform/edit/${reform.id_reform}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            // Obtenemos la respuesta del servidor
            const result = await res.json();
            alert(result.message);
            if (result.success) window.location.href = '/reform';
        } catch (err) {
            console.error(err);
            alert('Error al actualizar la reforma');
        }
    });
});