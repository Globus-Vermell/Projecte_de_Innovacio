document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("form-publication");

    // Inicializamos el MultiSelect para el campo de tipologías y temas 
    new MultiSelect(document.getElementById('typologies'), {
        placeholder: 'Selecciona tipologies...',
        search: true,
        selectAll: true
    });

    if (document.getElementById('themes')) {
        new MultiSelect(document.getElementById('themes'), {
            placeholder: 'Selecciona temàtiques...',
            search: true,
            selectAll: true
        });
    }

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        const data = {};

        // Procesamos los datos 
        for (const [key, value] of formData.entries()) {
            // Limpiamos los corchetes [] que añade la librería MultiSelect
            const cleanKey = key.replace('[]', '');

            if (data[cleanKey]) {
                if (!Array.isArray(data[cleanKey])) {
                    data[cleanKey] = [data[cleanKey]];
                }
                data[cleanKey].push(value);
            } else {
                data[cleanKey] = value;
            }
        }

        // Aseguramos que sea array por si acaso
        if (data.themes && !Array.isArray(data.themes)) {
            data.themes = [data.themes];
        }

        // Enviamos los datos
        try {
            const res = await fetch("/publications/create", {
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