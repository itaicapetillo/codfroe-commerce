document.getElementById('login-form').addEventListener('submit', async (event) => {
    event.preventDefault();  // Evita el comportamiento por defecto del formulario

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Asegúrate de que los datos no estén vacíos
    if (!email || !password) {
        document.getElementById('error-message').innerText = 'Por favor, complete todos los campos.';
        document.getElementById('error-message').style.display = 'block';
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }), // Convertimos los datos a formato JSON
        });

        if (!response.ok) {
            const errorData = await response.json();
            document.getElementById('error-message').innerText = errorData.message || 'Error al iniciar sesión';
            document.getElementById('error-message').style.display = 'block';
            return;
        }

        const data = await response.json();
        localStorage.setItem('token', data.token);  // Guardar el token en el almacenamiento local
        window.location.href = 'portal.html';  // Redirige al portal después de iniciar sesión
    } catch (error) {
        console.error('Error al hacer la solicitud:', error);
        document.getElementById('error-message').innerText = 'Error de conexión. Intenta de nuevo.';
        document.getElementById('error-message').style.display = 'block';
    }
});
