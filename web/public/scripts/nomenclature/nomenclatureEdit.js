document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("form-nomenclature-edit");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(form).entries());

        try {
            const res = await fetch(`/nomenclature/edit/${nomenclature.id_nomenclature}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            const result = await res.json();
            alert(result.message);
            if (result.success) window.location.href = "/nomenclature";
        } catch (err) {
            console.error(err);
            alert("Error al actualizar la nomenclatura");
        }
    });
});