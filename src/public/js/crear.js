// src/public/js/crear.js
const altaProductsForm = document.getElementById("altaProducts-container");
const altaUsersForm    = document.getElementById("altaUsers-container");
const url = "http://localhost:3000";
// =====================
// Alta usuarios
// =====================
if (altaUsersForm) {
    altaUsersForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());
        console.log("Alta usuario:", data);

        try {
        const response = await fetch(`${url}/api/users`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

        const result = await response.json().catch(() => ({}));

        if (response.ok) {
            alert(result.message || "Usuario creado correctamente");
            altaUsersForm.reset();
        } else {
            alert(result.message || "Error al crear usuario");
        }
        } catch (error) {
        console.error("Error al enviar los datos del usuario: ", error);
        alert("Error interno del servidor");
        }
    });
}

// =====================
// Alta productos
// =====================
if (altaProductsForm) {
    altaProductsForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());
        console.log("Alta producto:", data);

        try {
        const response = await fetch(`${url}/api/products`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

        const result = await response.json().catch(() => ({}));

        if (response.ok) {
            alert(result.message || "Producto creado correctamente");
            altaProductsForm.reset();
        } else {
            alert(result.message || "Error al crear producto");
        }
        } catch (error) {
        console.error("Error al enviar los datos del producto: ", error);
        alert("Error interno del servidor");
        }
    });
}