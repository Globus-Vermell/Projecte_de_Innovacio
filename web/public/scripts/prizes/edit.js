// Formulario de edición de premio
const form = document.getElementById('form-prize-edit');

// Agregamos el listener al formulario
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    // Obtenemos los datos del formulario
    const data = Object.fromEntries(new FormData(form).entries());

    try {
        // Enviamos los datos al servidor
        const res = await fetch(`/prizes/edit/${prize.id_prize}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        });

        // Obtenemos el resultado
        const result = await res.json();
        Swal.fire({
            text: result.message
        });

        if (result.success) window.location.href = '/prizes';
    } catch (err) {
        console.error(err);
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Error al actualizar el premi"
        });
    }
});