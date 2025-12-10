async function deletePublication(id) {
    await AppUtils.confirmAndDelete(
        `/publications/delete/${id}`,
        "Segur que vols eliminar aquesta publicació?"
    );
}

async function validatePublication(id) {
    if (!confirm("Segur que vols canviar l'estat de validació d'aquesta publicació?")) return;

    try {
        const res = await fetch(`/publications/validation/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ validated: true })
        });

        const data = await res.json();

        Swal.fire({
            text: data.message,
            icon: data.success ? 'success' : 'error'
        }).then(() => {
            if (data.success) location.reload();
        });

    } catch (err) {
        console.error(err);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: "Error al validar la publicació"
        });
    }
}

function filterPublications() {
    const inputVal = document.getElementById('searchInput').value;

    const radioChecked = document.querySelector('input[name="filterValidation"]:checked');
    const valSelect = radioChecked ? radioChecked.value : 'all';

    const params = new URLSearchParams();
    if (inputVal) params.set('search', inputVal);
    if (valSelect !== 'all') params.set('validated', valSelect);

    params.set('page', 1);
    window.location.href = `/publications?${params.toString()}`;
}