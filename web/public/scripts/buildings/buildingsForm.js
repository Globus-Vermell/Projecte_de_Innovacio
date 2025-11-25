document.addEventListener("DOMContentLoaded", async () => {
    const form = document.getElementById("form-edificacio");
    const selectPublicacions = document.getElementById("publicacio_id");
    const selectArquitectes = document.getElementById("arquitectes");
    const selectTipologia = document.getElementById("tipologia");
    const selectProtection = document.getElementById("id_protection");
    const selectNomenclature = document.getElementById("id_nomenclature");

    async function carregarDesplegables() {

        const resPub = await fetch("/buildings/form/publications");
        const publicacions = await resPub.json();
        selectPublicacions.innerHTML = '<option value="">-- Selecciona una publicació --</option>';
        publicacions.forEach(pub => {
            const opt = document.createElement("option");
            opt.value = pub.id_publication;
            opt.textContent = pub.title;
            selectPublicacions.appendChild(opt);
        });

        const resArq = await fetch("/buildings/form/architects");
        const arquitectes = await resArq.json();
        selectArquitectes.innerHTML = '<option value="">-- Selecciona un arquitecte --</option>';
        arquitectes.forEach(arq => {
            const opt = document.createElement("option");
            opt.value = arq.id_architect;
            opt.textContent = arq.name;
            selectArquitectes.appendChild(opt);
        });

        const resTip = await fetch("/buildings/form/typologies");
        const tipologies = await resTip.json();
        selectTipologia.innerHTML = '<option value="">-- Selecciona una tipologia --</option>';
        tipologies.forEach(t => {
            const opt = document.createElement("option");
            opt.value = t.id_typology;
            opt.textContent = t.name;
            selectTipologia.appendChild(opt);
        });


        const resProtection = await fetch("/buildings/form/protection");
        const protections = await resProtection.json();
        selectProtection.innerHTML = '<option value="">-- Cap --</option>';
        protections.forEach(p => {
            const opt = document.createElement("option");
            opt.value = p.id_protection;
            opt.textContent = p.level;
            selectProtection.appendChild(opt);
        });

        const resNomenclature = await fetch("/buildings/form/nomenclature");
        const nomenclatures = await resNomenclature.json();
        selectNomenclature.innerHTML = '<option value="">-- Cap --</option>';
        nomenclatures.forEach(n => {
            const opt = document.createElement("option");
            opt.value = n.id_nomenclature;
            opt.textContent = n.name;
            selectNomenclature.appendChild(opt);
        });
    }

    await carregarDesplegables();

    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        //creamos variable pictureUrl
        let pictureUrl = "";

        // Subir la imagen si se ha seleccionado una
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
                //
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

        data.pictureUrl = pictureUrl;

        const oblig = ["nom", "adreca", "any_construccio", "publicacio_id"];
        for (let field of oblig) {
            if (!data[field]) {
                alert(`El camp "${field}" és obligatori.`);
                return;
            }
        }

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