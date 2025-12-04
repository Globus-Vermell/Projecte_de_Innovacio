// Función para eliminar un usuario
async function deleteUser(id) {
    // Confirmar la eliminación
    if (!confirm("Segur que vols eliminar aquest usuari?")) return;

    const res = await fetch(`/users/delete/${id}`, { method: "DELETE" });
   // Procesar la respuesta del servidor
    const data = await res.json();

    alert(data.message);
    if (data.success) location.reload();
}

// Función para filtrar usuarios
function filterUsers() {
    const inputVal = document.getElementById('searchInput').value;
    const params = new URLSearchParams();
    if (inputVal) params.set('search', inputVal);
    params.set('page', 1); // Reset a página 1
    window.location.href = `/users?${params.toString()}`;
}