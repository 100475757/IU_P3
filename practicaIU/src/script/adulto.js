
// MENU HAMBURGUESA  
function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
}

//CONTADOR DE LA PORTADA
function startCountdown() {
    const targetDate = new Date('December 25, 2024 00:00:00').getTime();

    const interval = setInterval(() => {
        const currentDate = new Date().getTime();
        const remainingTime = targetDate - currentDate;

        if (remainingTime < 0) {
            clearInterval(interval);
            document.getElementById('countdown').innerText = "¡HO HO HO Feliz Navidad!";
            return;
        }

        const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
        const hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

        document.getElementById('countdown').innerText = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }, 1000);
}

startCountdown(); // Iniciar la cuenta atrás al cargar la página

// JS DE LA PAGINA WEB
document.addEventListener('DOMContentLoaded', () => {

   
    const logoutButton = document.querySelector('.logout a');

    
    if (logoutButton) {
        logoutButton.addEventListener('click', function (event) {
            event.preventDefault(); 

            
            const confirmLogout = confirm("¿Estás seguro de que quieres cerrar sesión?");

            if (confirmLogout) {
                
                localStorage.removeItem('currentUser');

                
                alert("Se ha cerrado sesión correctamente.");
                window.location.href = '../index.html';
            } else {
                
                alert("Se ha cancelado el cerrar sesión.");
            }
        });
    } else {
        console.error("No se encontró el enlace de cierre de sesión dentro de '.logout'.");
    }


    

    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            const navMenu = document.querySelector('.nav-links');
            navMenu.classList.remove('active'); // Cerrar el menú hamburguesa
        });
    });

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
            mensajePersonalizado.innerHTML = "¡Hola! Soy Papá Noel y me alegra mucho que estés aquí. Espero que sigas disfrutando de la magia de la Navidad y encuentres en esta época un momento especial para reflexionar, compartir y conectar con tus seres queridos. ¡La Navidad es un momento para todos, grandes y pequeños, de celebrar juntos!";
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
            modalMessage.textContent = "¡Enhorabuena! Este año has demostrado ser una persona admirable. Papá Noel está encantado con tu actitud y te espera para compartir juntos un momento lleno de magia y espíritu navideño.";
        } else {
            modalMessage.textContent = "Todos tenemos áreas en las que podemos mejorar. Papá Noel confía en que seguirás creciendo y haciendo lo mejor posible para convertir cada día en algo especial. ¡Ánimo para el próximo año!";
        }        

        modal.style.display = 'flex';
    });

    document.getElementById('modal-close').addEventListener('click', function() {
        document.getElementById('modal').style.display = 'none';
    });






    //CARRITO DE LA COMPRA
    

    // Variables para el carrito
    const cartNav = document.getElementById('cart-nav');
    const cartItems = []; // Almacenar los productos en el carrito
    
    // Función para añadir productos al carrito
    function addToCart(productName) {
        cartItems.push(productName); // Añadir el producto al array
        
        updateCart();

        //Verificar si el modal está abierto y actualizarlo
        if (cartModal.style.display === 'block') {
            showCartModal();    
        }
    }

    // Si le damos al botón "Comprar" de cada producto
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', () => {
            const productName = button.getAttribute('data-product');
            addToCart(productName);
        });
    });


    //Modal para abrir y cerrar el  carrito
    // Referencias a los elementos del carrito
    const cartModal = document.getElementById('cart-modal');
    const cartModalItems = document.getElementById('cart-modal-items');
    const closeCartBtn = document.getElementById('close-cart');

    // Función para abrir el modal del carrito
    function showCartModal() {
        // Limpiar la lista de productos antes de actualizar
        cartModalItems.innerHTML = '';

        // Añadir cada producto del carrito al modal
        cartItems.forEach(product => {
            const li = document.createElement('li');
            li.textContent = product;
            
            // Añadir botón para eliminar este producto
            const removeBtn = document.createElement('span');
            removeBtn.textContent = '✖';
            removeBtn.classList.add('remove-item');
            removeBtn.addEventListener('click', () => removeItemFromCart(product));

            li.appendChild(removeBtn);
            cartModalItems.appendChild(li);
        });

        // Mostrar el modal
        cartModal.style.display = 'block';
    }

    // Función para cerrar el modal del carrito
    function closeCartModal() {
        cartModal.style.display = 'none';
    }

    // Evento para mostrar el modal del carrito al hacer clic en el botón del carrito
    document.getElementById('cart-emoticon').addEventListener('click', showCartModal);

    // Evento para cerrar el modal al hacer clic en el botón "Cerrar"
    closeCartBtn.addEventListener('click', closeCartModal);

    // Botón para vaciar el carrito
    const emptyCartBtn = document.getElementById('empty-cart');

    // Función para vaciar todo el carrito
    function emptyCart() {
        // Mostrar mensaje de confirmación
        const isConfirmed = confirm("¿Estás seguro de que deseas vaciar todo el carrito?");
        
        if (isConfirmed) {
            // Si el usuario confirma, vaciar el carrito
            cartItems.length = 0; // Vaciar el array
            updateCart(); // Actualizar el estado del carrito
            closeCartModal(); // Cerrar el modal
            alert("El carrito ha sido vaciado correctamente."); // Mensaje de éxito
        } else {
            // Si el usuario cancela
            alert("Se canceló la acción de vaciar el carrito.");
        }
    }

    // Función para eliminar un producto específico
    function removeItemFromCart(productName) {        
        const index = cartItems.indexOf(productName); // Buscar el índice del producto
        if (index > -1) {
            cartItems.splice(index, 1); // Eliminar el producto del array
        }
            
        updateCart(); // Actualizar el estado del carrito

        if (cartItems.length === 0) {  
            closeCartModal();
        } else {
            showCartModal(); // Refrescar el modal para reflejar los cambios
        }
    } 
    
    // Evento para vaciar todo el carrito
    emptyCartBtn.addEventListener('click', emptyCart);

    // Actualizar la función showCartModal para añadir el botón de eliminar productos
    function showCartModal() {
        // Limpiar la lista de productos antes de actualizar
        cartModalItems.innerHTML = '';

        //contar la cantidad de productos
        const productCounts = {};
        cartItems.forEach(product => {
           productCounts[product] = (productCounts[product] || 0) + 1;
        });   
        
        // Añadir cada producto del carrito al modal 
        Object.keys(productCounts).forEach(product => {
            const li = document.createElement('li');
            li.textContent = `${product} x ${productCounts[product]}`;

            // Añadir botón para eliminar este producto
            const removeBtn = document.createElement('span');
            removeBtn.textContent = '✖';
            removeBtn.classList.add('remove-item');
            removeBtn.addEventListener('click', () => removeItemFromCart(product));

            li.appendChild(removeBtn);
            cartModalItems.appendChild(li);
        });

        // Mostrar el modal
        cartModal.style.display = 'block';
    }

    // Actualizar la función updateCart para manejar la visibilidad del carrito
    function updateCart() {
        const cartCounter = document.getElementById('cart-counter');
        const cartNav = document.getElementById('cart-nav');
        
        if (cartItems.length > 0) {
            // Mostrar el carrito
            cartNav.style.display = 'flex';
            if (cartCounter) {
                cartCounter.textContent = cartItems.length;
            } 
        } else {
            // Ocultar el carrito si no hay productos
            cartNav.style.display = 'none';
            if (cartCounter){
                cartCounter.textContent = '';
            }
        }
    }

    // Referencia al botón de compra
    const checkoutCartBtn = document.getElementById('checkout-cart');

    // Función para manejar la compra
    function checkoutCart() {
        if (cartItems.length === 0) {
            alert("El carrito está vacío. Añade productos antes de comprar."); // Prevenir compras vacías
            return;
        }

        // Mostrar mensaje de agradecimiento
        alert("Ho Ho Ho. Gracias por comprar!! Yo mismo te entregaré tu pedido. ¡Feliz Navidad!");

        // Vaciar el carrito
        cartItems.length = 0; // Vaciar el array
        updateCart(); // Actualizar el carrito en la barra de navegación
        closeCartModal(); // Cerrar el modal
    }

    // Asociar el evento al botón "Comprar"
    checkoutCartBtn.addEventListener('click', checkoutCart);


});
