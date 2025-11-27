document.addEventListener("DOMContentLoaded", async () => {
    const form = document.getElementById("form-edificacio");
    const selectPublicacions = document.getElementById("publicacio_id");
    const selectArquitectes = document.getElementById("arquitectes");
    const selectTipologia = document.getElementById("tipologia");
    const selectProtection = document.getElementById("id_protection");

    async function carregarDesplegables() {

        const resPub = await fetch(`/buildings/edit/${building.id_building}/publications`);
        const publicacions = await resPub.json();
        selectPublicacions.innerHTML = '<option value="">-- Selecciona una publicació --</option>';
        publicacions.forEach(pub => {
            const opt = document.createElement("option");
            opt.value = pub.id_publication;
            opt.textContent = pub.title;
            if (pub.id_publication === building.id_publication) opt.selected = true;
            selectPublicacions.appendChild(opt);
        });

        const resArq = await fetch(`/buildings/edit/${building.id_building}/architects`);
        const arquitectes = await resArq.json();
        selectArquitectes.innerHTML = '<option value="">-- Selecciona un arquitecte --</option>';
        arquitectes.forEach(arq => {
            const opt = document.createElement("option");
            opt.value = arq.id_architect;
            opt.textContent = arq.name;
            if (arq.id_architect === building.id_architect) opt.selected = true;
            selectArquitectes.appendChild(opt);
        });

        const resTip = await fetch(`/buildings/edit/${building.id_building}/typologies`);
        const tipologies = await resTip.json();
        selectTipologia.innerHTML = '<option value="">-- Selecciona una tipologia --</option>';
        tipologies.forEach(t => {
            const opt = document.createElement("option");
            opt.value = t.id_typology;
            opt.textContent = t.name;
            if (t.id_typology === building.id_typology) opt.selected = true;
            selectTipologia.appendChild(opt);
        });

        const resProtection = await fetch(`/buildings/edit/${building.id_building}/protections`);
        const protections = await resProtection.json();
        selectProtection.innerHTML = '<option value="">-- Cap --</option>';
        protections.forEach(p => {
            const opt = document.createElement("option");
            opt.value = p.id_protection;
            opt.textContent = p.level;
            if (p.id_protection === building.id_protection) opt.selected = true;
            selectProtection.appendChild(opt);
        });
    }

    await carregarDesplegables();

    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(form).entries());

        const oblig = ["nom", "adreca", "any_construccio", "publicacio_id"];
        for (let field of oblig) {
            if (!data[field]) {
                alert(`El camp "${field}" és obligatori.`);
                return;
            }
        }

        try {
            const res = await fetch(`/buildings/edit/${building.id_building}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            const result = await res.json();
            alert(result.message);
            if (result.success) window.location.href = "/buildings";
        } catch (err) {
            console.error("Error:", err);
            alert("Error al enviar el formulario.");
        }
    });
});