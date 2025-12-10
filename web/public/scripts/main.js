document.addEventListener("DOMContentLoaded", () => {

    const forms = document.querySelectorAll('.api-form');

    forms.forEach(form => {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const url = form.getAttribute('action');
            const method = form.getAttribute('method') || 'POST';
            const redirectUrl = form.dataset.redirect;

            const data = AppUtils.serializeForm(form);

            try {
                const res = await fetch(url, {
                    method: method,
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data),
                });

                const result = await res.json();

                await Swal.fire({
                    text: result.message,
                    icon: result.success ? 'success' : 'error'
                });
                if (result.success) {
                    if (redirectUrl) {
                        window.location.href = redirectUrl;
                    } else if (method.toUpperCase() === 'POST') {
                        form.reset();
                    }
                }

            } catch (err) {
                console.error(err);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Error de connexió al servidor.'
                });
            }
        });
    });
});