document.addEventListener("DOMContentLoaded", async () => {
    // Elementos del formulario
    const form = document.getElementById("form-edificacio");
    const selectPublicacions = document.getElementById("publicacio_id");
    const selectArquitectes = document.getElementById("arquitectes");
    const selectTipologia = document.getElementById("tipologia");
    const containerTipologia = document.getElementById("typology-container");
    const selectProtection = document.getElementById("id_protection");

    // Función para cargar los desplegables
    async function carregarDesplegables() {

        // Cargar publicaciones
        const resPub = await fetch("/buildings/form/publications");
        const publicacions = await resPub.json();
        selectPublicacions.innerHTML = '<option value="">-- Selecciona una publicació --</option>';
        publicacions.forEach(pub => {
            const opt = document.createElement("option");
            opt.value = pub.id_publication;
            opt.textContent = pub.title;
            selectPublicacions.appendChild(opt);
        });

        // Cargar arquitectos
        const resArq = await fetch("/buildings/form/architects");
        const arquitectes = await resArq.json();
        selectArquitectes.innerHTML = '<option value="">-- Selecciona un arquitecte --</option>';
        arquitectes.forEach(arq => {
            const opt = document.createElement("option");
            opt.value = arq.id_architect;
            opt.textContent = arq.name;
            selectArquitectes.appendChild(opt);
        });

        // Cargar protección
        const resProtection = await fetch("/buildings/form/protection");
        const protections = await resProtection.json();
        selectProtection.innerHTML = '<option value="">-- Cap --</option>';
        protections.forEach(p => {
            const opt = document.createElement("option");
            opt.value = p.id_protection;
            opt.textContent = p.level;
            selectProtection.appendChild(opt);
        });
    }

    // Evento para cargar tipologías cuando se selecciona una publicación
    selectPublicacions.addEventListener("change", async (e) => {
        const pubId = e.target.value;
        // Resetear tipología
        selectTipologia.innerHTML = '';
        containerTipologia.style.display = 'none';

        if (pubId) {
            try {
                // Pedir las tipologías específicas de esta publicación
                const res = await fetch(`/buildings/form/typologies/${pubId}`);
                const tipologies = await res.json();

                if (tipologies && tipologies.length > 0) {
                    // Si hay tipologías, llenamos el select y mostramos el div
                    selectTipologia.innerHTML = '<option value="">-- Selecciona una tipologia --</option>';
                    tipologies.forEach(t => {
                        const opt = document.createElement("option");
                        opt.value = t.id_typology;
                        opt.textContent = t.name;
                        selectTipologia.appendChild(opt);
                    });
                    // Mostrar el contenedor
                    containerTipologia.style.display = 'block';
                }
            } catch (err) {
                console.error("Error cargando tipologías:", err);
            }
        }
    });

    // Cargar los desplegables al cargar la página
    await carregarDesplegables();

    // Evento para enviar el formulario
    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        // Obtenemos los datos del formulario
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        //creamos variable pictureUrl
        let pictureUrl = "";

        const pictureFile = formData.get("picture");
        // Si se ha seleccionado un archivo
        if (pictureFile && pictureFile.size > 0) {
            const uploadData = new FormData();
            uploadData.append("picture", pictureFile);

            // Subir la imagen al servidor
            try {
                const uploadRes = await fetch("/buildings/form/upload", {
                    method: "POST",
                    body: uploadData
                });
                // Obtenemos la respuesta
                const uploadResult = await uploadRes.json();
                if (uploadResult.success) {
                    pictureUrl = uploadResult.filePath;
                } else {
                    alert("Error al subir la imagen.");
                    return;
                }
            } catch (err) {
                console.error("Error al subir la imagen:", err);
                alert("Error al subir la imagen.");
                return;
            }
        }
        // Asignamos la URL de la imagen al objeto data
        data.pictureUrl = pictureUrl;

        const oblig = ["nom", "adreca", "any_construccio", "publicacio_id"];
        // Validamos los campos obligatorios
        for (let field of oblig) {
            if (!data[field]) {
                alert(`El camp "${field}" és obligatori.`);
                return;
            }
        }
        // Enviamos el formulario
        try {
            const res = await fetch("/buildings/form", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            const result = await res.json();
            alert(result.message);
            if (result.success) form.reset();
        } catch (err) {
            console.error("Error:", err);
            alert("Error al enviar el formulario.");
        }
    });
});