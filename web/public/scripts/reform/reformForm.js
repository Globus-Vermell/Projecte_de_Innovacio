document.addEventListener("DOMContentLoaded", async () => {
    const form = document.getElementById("form-reform");
    const selectArchitects = document.getElementById("id_architect");

    const resArq = await fetch("/reform/form/architects");
    const architects = await resArq.json();
    architects.forEach(a => {
        const opt = document.createElement("option");
        opt.value = a.id_architect;
        opt.textContent = a.name;
        selectArchitects.appendChild(opt);
    });

    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(form).entries());

        try {
            const res = await fetch("/reform/form", {
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