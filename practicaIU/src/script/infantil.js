document.addEventListener('DOMContentLoaded', function() {

    const logoutButtons = document.querySelectorAll('.logout-button');

// Función para cerrar sesión
logoutButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Mostrar mensaje de confirmación
        const confirmLogout = confirm("¿Estás seguro de que quieres cerrar sesión?");
        
        if (confirmLogout) {
            // Si el usuario confirma, eliminar el objeto currentUser del localStorage
            localStorage.removeItem('currentUser');
            
            // Redirigir a main.html
            window.location.href = '../index.html';
            alert("Se ha cerrado sesión correctamente.");
        } else {
            // Si el usuario cancela, no se hace nada
            alert("Se ha cancelado el cerrar sesión.");
        }
    });
});

    
    // Configuracón del menu del navegador 
    function toggleMenu() {
        const menuContainer = document.querySelector('.menu-container');
        if (menuContainer) {
            menuContainer.classList.toggle('active');
            document.body.classList.toggle('menu-open'); // Añadir clase para evitar el scroll
        } else {
            console.error('Menu container not found');
        }
    }

    
    function closeMenu() {
        const menuContainer = document.querySelector('.menu-container');
        if (menuContainer) {
            menuContainer.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    }

    
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    if (hamburgerMenu) {
        hamburgerMenu.addEventListener('click', toggleMenu);
    }

    
    const menuLinks = document.querySelectorAll('.nav-links a, .logout-button');
    menuLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Configuración del contador 
    function actualizarContador() {
        const fechaNavidad = new Date('December 25, 2024 00:00:00').getTime();
        const ahora = new Date().getTime();
        const diferencia = fechaNavidad - ahora;

        const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
        const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
        const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);

        document.getElementById('countdown').innerHTML = `${dias}d ${horas}h ${minutos}m ${segundos}s`;

        if (diferencia < 0) {
            document.getElementById('countdown').innerHTML = '¡Feliz Navidad!';
        }
    }

    
    setInterval(actualizarContador, 1000);



    // Función para la historia
    const cuentos = [
        document.querySelector('.portada'), 
        document.querySelector('.cuento1'),
        document.querySelector('.cuento2'),
        document.querySelector('.cuento3')
    ];
    let currentIndex = 0;

    
    function mostrarCuento(index) {
        cuentos.forEach((cuento, i) => {
            cuento.classList.remove('active'); // Quitar la clase activa
            if (i === index) {
                cuento.classList.add('active'); // Agregar la clase activa
            }
        });
    }

    
    mostrarCuento(currentIndex);

    // Función para pasar a la siguiente página
    function pasarPagina() {
        if (currentIndex < cuentos.length - 1) {
            currentIndex++;
            mostrarCuento(currentIndex);
        }
    }

    // Función para volver a la página anterior
    function volverPagina() {
        if (currentIndex > 0) {
            currentIndex--;
            mostrarCuento(currentIndex);
        }
    }

    
    document.querySelector('.pasar-pagina').addEventListener('click', pasarPagina);
    document.querySelector('.volver-pagina').addEventListener('click', volverPagina);


    // Ajuste del mapa interactivo al encontrar la posición de papa noel
    const modal = document.getElementById('modal-mapa');
    const modalClose = document.getElementById('modal-mapa-close');

    
    const finlandia = document.querySelector('.Finlandia');
    if (finlandia) {
        finlandia.addEventListener('click', function () {
            modal.style.display = 'flex';
        });
    }

   
    if (modalClose) {
        modalClose.addEventListener('click', function () {
            modal.style.display = 'none';
        });
    }

    // Función para mostrar el mensaje personalizado
    const currentUserData = localStorage.getItem('currentUser');
    let nombre = "";

    if (currentUserData) {
        try {
            const currentUser = JSON.parse(currentUserData);
            if (currentUser && currentUser.name) {
                nombre = currentUser.name; 
            }
        } catch (error) {
            console.error("Error parsing currentUser data from localStorage:", error);
        }
    }

    // Mensaje personalizado
    const mensajePersonalizado = document.getElementById('mensajePersonalizado');

    if (mensajePersonalizado) {
        if (nombre) {
            mensajePersonalizado.innerHTML = `Querido ${nombre}, <br>¡Estoy emocionado hasta la punta de mi gorro por la posibilidad de verte muy pronto! La magia de la Navidad no estaría completa sin un encuentro especial contigo. ¿Te animas a venir a mi taller en el Polo Norte para conocerme?

Podemos hablar de tus sueños, tus aventuras, ¡y tal vez hasta compartir unas galletas con leche! Mi trineo está listo, los renos están ansiosos, y yo tengo muchas historias mágicas para contarte.

¿Qué dices? Ven a verme, y juntos viviremos un momento inolvidable lleno de espíritu navideño. <br>¡Te espero con mucha ilusión! 🎁🎄

Con cariño y un gran "ho, ho, ho",
Papá Noel`;
        } else {
            mensajePersonalizado.innerHTML = "¡Hola pequeño amigo! Soy Papá Noel y estoy muy feliz de que estés aquí. Espero que sigas explorando el Polo Norte y te portes muy bien este año.";
        }
    } else {
        console.error("No se encontró el elemento con id 'mensajePersonalizado'");
    }


    // Función para evaluar el comportamiento del niño/niña
    document.getElementById('evaluarTest').addEventListener('click', function(event) {
        event.preventDefault(); // Evita que el formulario se envíe

        const respuestas = document.querySelectorAll('#formularioTest input[type="radio"]:checked');
        const modalMessage = document.getElementById('modal-message');
        const modal = document.getElementById('modal');

        if (respuestas.length < 6) {
            alert("Por favor, responde todas las preguntas.");
            return;
        }

        let respuestasPositivas = 0;
        respuestas.forEach(respuesta => {
            if (respuesta.value === "si") {
                respuestasPositivas++;
            }
        });

        if (respuestasPositivas >= 4) {
            modalMessage.textContent = "¡Felicidades! Has sido un niño/niña maravilloso/a este año. Papá Noel estará encantado de verte.";
        } else {
            modalMessage.textContent = "Recuerda que siempre podemos mejorar nuestro comportamiento. ¡Papá Noel te animará a hacerlo mejor el próximo año!";
        }

        modal.style.display = 'flex';
    });

    document.getElementById('modal-close').addEventListener('click', function() {
        document.getElementById('modal').style.display = 'none';
    });

    
    
    
    // Función para enviar la carta a Papá Noel

    document.querySelector('.carta-form').addEventListener('submit', function (e) {
        e.preventDefault();
    
        const nombre = document.getElementById('nombre').value.trim();
        const edad = document.getElementById('edad').value.trim();
        const comportamiento = document.getElementById('comportamiento').value;
        const carta = document.getElementById('carta').value.trim();
    
        if (!nombre || !edad || !comportamiento || !carta) {
            alert('Por favor, completa todos los campos.');
            return;
        }
    
        const currentUserData = localStorage.getItem('currentUser');
        const currentUser = currentUserData ? JSON.parse(currentUserData) : { cartas: [] };
    
        const nuevaCarta = { nombre, edad, comportamiento, carta };
        currentUser.cartas = currentUser.cartas || [];
        currentUser.cartas.push(nuevaCarta);
    
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
    
        mostrarCartaEnExposicion(nuevaCarta);
    
        document.querySelector('.carta-form').reset();
        alert("La carta se ha enviado correctamente.");
    });

    // Función para mostrar la carta en la exposición
    
    function mostrarCartaEnExposicion(carta) {
        const exposicionDiv = document.querySelector('.exposicion');
        const cartaDiv = document.createElement('div');
        cartaDiv.classList.add('carta');
    
        
        cartaDiv.innerHTML = `
            <p><strong>Querido Santa:</strong></p>
            <p>Me llamo <strong>${carta.nombre}</strong> y tengo <strong>${carta.edad}</strong> años. Este año me porté <strong>${carta.comportamiento}</strong>.</p>
            <p>Esta Navidad me gustaría pedirte: <strong>${carta.carta}</strong></p>
            <p>Gracias, con cariño.</p>
            <button class="eliminar-button">Eliminar Carta</button>
        `;
    
        const eliminarButton = cartaDiv.querySelector('.eliminar-button');
        eliminarButton.addEventListener('click', function () {
            eliminarCarta(carta, cartaDiv);
        });
    
        exposicionDiv.appendChild(cartaDiv);
    }
    
    // Función para eliminar la carta
    function eliminarCarta(carta, cartaDiv) {
       
        const currentUserData = localStorage.getItem('currentUser');
        const currentUser = currentUserData ? JSON.parse(currentUserData) : { cartas: [] };
    
        
        currentUser.cartas = currentUser.cartas.filter(c =>
            c.nombre !== carta.nombre ||
            c.edad !== carta.edad ||
            c.comportamiento !== carta.comportamiento ||
            c.carta !== carta.carta
        );
    
        
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        cartaDiv.remove();
        alert("La carta se ha eliminado correctamente.");
    }
    
    document.addEventListener('DOMContentLoaded', function () {
        const currentUserData = localStorage.getItem('currentUser');
        const currentUser = currentUserData ? JSON.parse(currentUserData) : { cartas: [] };
    
        if (currentUser.cartas && currentUser.cartas.length > 0) {
            currentUser.cartas.forEach(carta => mostrarCartaEnExposicion(carta));
        }
    });
    
    
    // Juego


    const tablero = document.querySelector(".tablero");
    const resultado = document.querySelector(".resultado");
    const botonReiniciar = document.querySelector(".reiniciar-juego");
    const intentosMaximos = 5;
    let intentos = 0;
    let regaloEncontrado = false;

    // Generar posición aleatoria para el regalo
    let regaloPosicion = Math.floor(Math.random() * 25);

    // Crear tablero
    for (let i = 0; i < 25; i++) {
        const celda = document.createElement("div");
        celda.dataset.index = i;
        celda.addEventListener("click", () => {
            if (regaloEncontrado || intentos >= intentosMaximos) return;

            intentos++;
            if (i == regaloPosicion) {
                celda.style.backgroundColor = "green";
                celda.textContent = "🎁";
                resultado.textContent = "¡Has encontrado el regalo!";
                regaloEncontrado = true;
            } else {
                celda.style.backgroundColor = "gray";
                resultado.textContent = `Intentos: ${intentos}/${intentosMaximos}`;
            }

            if (intentos >= intentosMaximos && !regaloEncontrado) {
                resultado.textContent = "¡Se acabaron los intentos! 😔";
            }
        });
        tablero.appendChild(celda);
    }

    // Reiniciar el juego
    botonReiniciar.addEventListener("click", () => {
        tablero.innerHTML = "";
        resultado.textContent = "";
        intentos = 0;
        regaloEncontrado = false;
        regaloPosicion = Math.floor(Math.random() * 25);
        for (let i = 0; i < 25; i++) {
            const celda = document.createElement("div");
            celda.dataset.index = i;
            celda.addEventListener("click", () => {
                if (regaloEncontrado || intentos >= intentosMaximos) return;

                intentos++;
                if (i == regaloPosicion) {
                    celda.style.backgroundColor = "green";
                    celda.textContent = "🎁";
                    resultado.textContent = "¡Has encontrado el regalo!";
                    regaloEncontrado = true;
                } else {
                    celda.style.backgroundColor = "gray";
                    resultado.textContent = `Intentos: ${intentos}/${intentosMaximos}`;
                }

                if (intentos >= intentosMaximos && !regaloEncontrado) {
                    resultado.textContent = "¡Se acabaron los intentos! 😔";
                }
            });
            tablero.appendChild(celda);
        }
    });


    
    // Videollamada

    let localStream;
    let peerConnection;
    
    document.getElementById('iniciarVideollamada').addEventListener('click', function () {
        const localVideo = document.getElementById('localVideo');
        const finalizarVideollamadaButton = document.getElementById('finalizarVideollamada');
        const backgroundVideo = document.getElementById('backgroundVideo');
    
        // Mostrar el video de fondo
        backgroundVideo.style.display = 'block';
        backgroundVideo.play(); 
    
        navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true
        })
        .then(stream => {
            localStream = stream;
            localVideo.srcObject = stream;
    
            peerConnection = new RTCPeerConnection();
    
            stream.getTracks().forEach(track => {
                peerConnection.addTrack(track, stream);
            });
    
            
            finalizarVideollamadaButton.style.display = 'inline';
        })
        .catch(error => {
            console.error('Error al acceder a la cámara y al micrófono:', error);
            alert('No se pudo acceder a la cámara/micrófono.');
        });
    });
    
    document.getElementById('finalizarVideollamada').addEventListener('click', function () {
        if (localStream) {
            localStream.getTracks().forEach(track => track.stop());
        }
    
        if (peerConnection) {
            peerConnection.close();
        }
    
        const localVideo = document.getElementById('localVideo');
        localVideo.srcObject = null;
    
       
        const backgroundVideo = document.getElementById('backgroundVideo');
        backgroundVideo.pause(); 
        backgroundVideo.currentTime = 0; 
        backgroundVideo.style.display = 'none';
    
    });
    
    
});

