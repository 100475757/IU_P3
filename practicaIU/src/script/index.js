const users = [];

document.getElementById('registerBtn').addEventListener('click', showRegisterForm);
document.getElementById('loginBtn').addEventListener('click', showLoginForm);

function showRegisterForm() {
    document.getElementById('form-container').innerHTML = `
        <h2>Registrarse</h2>
        <form onsubmit="registerUser(event)">
            <label>Nombre: <input type="text" id="registerName" required></label><br>
            <label>Contraseña: <input type="password" id="registerPassword" required></label><br>
            <label>Edad: <input type="number" id="registerAge" required></label><br>
            <button type="submit">Registrarse</button>
            <button type="button" id="cancelBtn">Cancelar</button>
        </form>
    `;
    // Ocultar botones
    const buttonsContainer = document.querySelector('.buttons');
    if (buttonsContainer) {
        buttonsContainer.style.display = 'none';
    }

    // Boton cancelar
    document.getElementById('cancelBtn').addEventListener('click', resetToButtons);
}

function showLoginForm() {
    document.getElementById('form-container').innerHTML = `
        <h2>Iniciar sesión</h2>
        <form onsubmit="loginUser(event)">
            <label>Nombre: <input type="text" id="loginName" required></label><br>
            <label>Contraseña: <input type="password" id="loginPassword" required></label><br>
            <button type="submit">Iniciar Sesión</button>
            <button type="button" id="cancelBtn">Cancelar</button>
        </form>
    `;
    
    const buttonsContainer = document.querySelector('.buttons');
    buttonsContainer.style.display = 'none';

    
    document.getElementById('cancelBtn').addEventListener('click', resetToButtons);
}


function resetToButtons() {
    document.getElementById('form-container').innerHTML = '';
    const buttonsContainer = document.querySelector('.buttons');
    if (buttonsContainer) {
        buttonsContainer.style.display = 'block'; 
    }
}

// Registro usuario
function registerUser(event) {
    event.preventDefault();
    const name = document.getElementById('registerName').value;
    const password = document.getElementById('registerPassword').value;
    const age = parseInt(document.getElementById('registerAge').value);
    
    const users = JSON.parse(localStorage.getItem('users')) || [];
    users.push({ name, password, age });
    localStorage.setItem('users', JSON.stringify(users));
    
    alert('Usuario registrado con éxito');
    document.getElementById('form-container').innerHTML = '';
    const buttonsContainer = document.querySelector('.buttons');
    buttonsContainer.style.display = 'block';
}

// Iniciar sesion
function loginUser(event) {
    event.preventDefault();
    const name = document.getElementById('loginName').value;
    const password = document.getElementById('loginPassword').value;

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.name === name && u.password === password);

    if (!user) {
        alert('Usuario no registrado. Por favor, regístrese primero.');
    } else {
        
        const currentUser = {
            name: user.name,
            password: user.password,
            age: user.age
        };

        
        localStorage.setItem('currentUser', JSON.stringify(currentUser));

        if (user.age > 11) {
            window.location.href = 'index/adulto.html';
        } else {
            window.location.href = 'index/infantil.html';
        }
    }
}