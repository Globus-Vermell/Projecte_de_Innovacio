document.getElementById("form-user").addEventListener("submit", async e => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target).entries());

    // validación de confirmación de contraseña
    if (data.password !== data.confirmPassword) {
        alert("Les contrasenyes no coincideixen!");
        return;
    }

    const res = await fetch("/users/form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });

    const result = await res.json();
    alert(result.message);

    if (result.success) e.target.reset();
});
