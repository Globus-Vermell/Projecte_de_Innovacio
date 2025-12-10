async function deleteBuilding(id) {
    await AppUtils.confirmAndDelete(`/buildings/delete/${id}`, "Segur que vols eliminar aquest edifici?");
}

function filterBuildings() {
    const inputVal = document.getElementById('searchInput').value;

    const radioValidation = document.querySelector('input[name="filterValidation"]:checked');
    const valSelect = radioValidation ? radioValidation.value : 'all';

    const radioImage = document.querySelector('input[name="filterImage"]:checked');
    const imgSelect = radioImage ? radioImage.value : 'all';

    const pubSelect = document.getElementById('filterPublication').value;

    const params = new URLSearchParams();
    if (inputVal) params.set('search', inputVal);
    if (valSelect !== 'all') params.set('validated', valSelect);
    if (imgSelect !== 'all') params.set('image', imgSelect);
    if (pubSelect !== 'all') params.set('publication', pubSelect);

    params.set('page', 1);
    window.location.href = `/buildings?${params.toString()}`;
}

async function validateBuilding(id) {
    if (!confirm("Segur que vols canviar l'estat de validació d'aquesta construcció?")) return;

    try {
        const res = await fetch(`/buildings/validation/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ validated: true })
        });

        const data = await res.json();

        Swal.fire({
            text: data.message,
            icon: data.success ? 'success' : 'error'
        });

        if (data.success) location.reload();
    } catch (err) {
        console.error(err);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: "Error al validar la construcció"
        });
    }
}