document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("form-publication");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        try {
            const res = await fetch("/publications/form", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });

            const result = await res.json();
            alert(result.message);

            if (result.success) form.reset();
        } catch (err) {
            console.error("Error:", err);
            alert("Error al enviar el formulari.");
        }
    });
});