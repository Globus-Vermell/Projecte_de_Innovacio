
const AppUtils = {
    /**
     * Inicializa un MultiSelect con las opciones por defecto.
     * @param {HTMLElement|string} element - El elemento select o su ID.
     * @param {string} placeholder - Texto placeholder.
     * @param {Object} extraOptions - Opciones adicionales (opcional).
     * @returns {MultiSelect} Instancia del MultiSelect.
     */
    initMultiSelect: (element, placeholder = 'Selecciona alguna opció...', extraOptions = {}) => {
        const selectElement = typeof element === 'string' ? document.getElementById(element) : element;
        if (!selectElement) return null;

        return new MultiSelect(selectElement, {
            placeholder: placeholder,
            search: true,
            selectAll: true,
            ...extraOptions
        });
    },

    /**
     * Convierte un formulario HTML en un objeto JSON, manejando
     * automáticamente los campos array del MultiSelect (quitando los []).
     * @param {HTMLFormElement} form - El formulario a procesar.
     * @returns {Object} Objeto con los datos limpios.
     */
    serializeForm: (form) => {
        const formData = new FormData(form);
        const data = {};

        for (const [key, value] of formData.entries()) {
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
        return data;
    },

    /**
     * Función para eliminar elementos con confirmación.
     * @param {string} url - Endpoint para eliminar (ej: '/buildings/delete/5').
     * @param {string} confirmMsg - Mensaje de confirmación.
     */
    confirmAndDelete: async (url, confirmMsg = "Segur que vols eliminar aquest element?") => {
        if (!confirm(confirmMsg)) return;

        try {
            const res = await fetch(url, { method: "DELETE" });
            const data = await res.json();

            Swal.fire({
                text: data.message,
                icon: data.success ? 'success' : 'error'
            }).then(() => {
                if (data.success) {
                    if (successRedirect) window.location.href = successRedirect;
                    else location.reload();
                }
            });
        } catch (err) {
            console.error(err);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: "Error de connexió al servidor."
            });
        }
    }
};