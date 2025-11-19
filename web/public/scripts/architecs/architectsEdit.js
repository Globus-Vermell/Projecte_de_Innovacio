document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("form-edit-architect");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        try {
            const res = await fetch(`/architects/edit/<%= architect.id_architect %>`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });
            const result = await res.json();
            alert(result.message);
            if (result.success) window.location.href = "/architects";
        } catch (err) {
            console.error(err);
            alert("Error al actualizar el arquitecte");
        }
    });
});