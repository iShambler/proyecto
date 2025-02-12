  // Función para cerrar el chat
  function closeChat() {
    var chatContainer = document.querySelector('.chat-container');
    var openChatBtn = document.getElementById('openChatBtn');

    chatContainer.style.display = 'none'; // Oculta el chat
    openChatBtn.style.display = 'block';  // Muestra el botón para abrir el chat
  }

  // Función para abrir el chat
  function openChat() {
    var chatContainer = document.querySelector('.chat-container');
    var openChatBtn = document.getElementById('openChatBtn');

    chatContainer.style.display = 'flex'; // Muestra el chat
    openChatBtn.style.display = 'none';   // Oculta el botón de abrir
  }

  // Función para enviar el mensaje
  function sendMessage() {
    var messageInput = document.getElementById('messageInput');
    var messageText = messageInput.value.trim();  // Obtener el mensaje del input
    if (messageText === "") return;  // Si el mensaje está vacío, no hacer nada

    // Crear el nuevo mensaje
    var newMessage = {
      user: 'Luis',
      text: messageText,
    };

    // Obtener los mensajes existentes del localStorage
    var storedMessages = JSON.parse(localStorage.getItem('chatMessages')) || [];

    // Añadir el nuevo mensaje al array de mensajes
    storedMessages.push(newMessage);

    // Guardar los mensajes actualizados en localStorage
    localStorage.setItem('chatMessages', JSON.stringify(storedMessages));

    // Mostrar el nuevo mensaje en el chat
    displayMessages();

    // Limpiar el campo de entrada después de enviar el mensaje
    messageInput.value = "";
  }

  // Función para mostrar los mensajes en el chat
// Función para mostrar los mensajes en el chat
function displayMessages() {
    var chatMessages = document.getElementById('chatMessages');

    // Obtener los mensajes del localStorage, o si no hay, inicializarlos con mensajes predefinidos
    var storedMessages = JSON.parse(localStorage.getItem('chatMessages')) || [];

    // Si no hay mensajes en el localStorage, añadir los mensajes predefinidos
    if (storedMessages.length === 0) {
        storedMessages = [
            { user: 'Liliana24', text: '¡Hola a todos!', isPredefined: true },
            { user: 'JaceMindEscultor', text: '¿Qué opinan del nuevo set?', isPredefined: true }
        ];
        // Guardar los mensajes predefinidos en el localStorage
        localStorage.setItem('chatMessages', JSON.stringify(storedMessages));
    }

    // Limpiar el área de mensajes antes de mostrar los nuevos
    chatMessages.innerHTML = "";

    // Mostrar cada mensaje almacenado
    storedMessages.forEach(function(message, index) {
        var newMessage = document.createElement('div');
        newMessage.classList.add('message');
        newMessage.innerHTML = `<span class="user">${message.user}:</span> ${message.text}`;

        // Solo añadir el botón de eliminar si no es un mensaje predefinido
        
        // Añadir el mensaje al contenedor de chat
        chatMessages.appendChild(newMessage);
    });
}

// Función para eliminar el mensaje
function deleteMessage(index) {
    // Obtener los mensajes del localStorage
    var storedMessages = JSON.parse(localStorage.getItem('chatMessages')) || [];
  
    // Eliminar el mensaje seleccionado
    storedMessages.splice(index, 1);
  
    // Guardar los mensajes actualizados en localStorage
    localStorage.setItem('chatMessages', JSON.stringify(storedMessages));
  
    // Volver a mostrar los mensajes actualizados
    displayMessages();
}

// Función para enviar el mensaje
function sendMessage() {
    var messageInput = document.getElementById('messageInput');  // Obtener el input del mensaje
    var messageText = messageInput.value.trim();  // Obtener el texto del mensaje
  
    if (messageText === "") return;  // Si el mensaje está vacío, no hacer nada
  
    // Crear el nuevo mensaje
    var newMessage = {
      user: 'Luis',
      text: messageText,
      isPredefined: false
    };
  
    // Obtener los mensajes existentes del localStorage
    var storedMessages = JSON.parse(localStorage.getItem('chatMessages')) || [];
  
    // Añadir el nuevo mensaje al array de mensajes
    storedMessages.push(newMessage);
  
    // Guardar los mensajes actualizados en localStorage
    localStorage.setItem('chatMessages', JSON.stringify(storedMessages));
  
    // Mostrar los mensajes actualizados
    displayMessages();
  
    // Limpiar el campo de entrada después de enviar el mensaje
    messageInput.value = "";

    // Solo agregar la respuesta de Jace después del primer mensaje de Luis
    var isFirstMessageByLuis = storedMessages.filter(msg => msg.user === 'Luis').length === 1;

    if (isFirstMessageByLuis) {
        // Usar setTimeout para esperar 2 segundos antes de agregar la respuesta
        setTimeout(function() {
            var jaceReply = {
                user: 'JaceMindEscultor',
                text: '¡A mí me ha encantado!',
                isPredefined: true  // Esto indica que es un mensaje predefinido
            };

            // Añadir la respuesta de Jace al array de mensajes
            storedMessages.push(jaceReply);

            // Guardar los mensajes actualizados en localStorage
            localStorage.setItem('chatMessages', JSON.stringify(storedMessages));

            // Mostrar los mensajes actualizados con la respuesta de Jace
            displayMessages();
        }, 2000);  // 2000 ms = 2 segundos
    }
}

// Añadir un evento al botón de enviar para llamar a la función sendMessage
document.getElementById('sendMessageBtn').addEventListener('click', sendMessage);

// Opcional: También permitir enviar el mensaje presionando Enter
document.getElementById('messageInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendMessage();  // Enviar mensaje al presionar Enter
    }
});
if (window.innerWidth <= 768) {
    chatContainer.style.display = 'none';  // Inicialmente ocultar el chat
    openChatBtn.style.display = 'block';   // Mostrar el botón de abrir chat
  } else {
    openChatBtn.style.display = 'none';   // Ocultar el botón "Abrir Chat" en pantallas grandes
  }

//Carousel
const carousel = document.querySelector('.carousel');
const leftButton = document.querySelector('.carousel-button.left');
const rightButton = document.querySelector('.carousel-button.right');
const cards = carousel.querySelectorAll('.card');

let currentIndex = 0;

function updateCarousel() {
    const cardWidth = cards[0].offsetWidth;
    carousel.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
    
    // Actualizar estado de los botones
    leftButton.disabled = currentIndex === 0;
    rightButton.disabled = currentIndex === cards.length - 1;
}

rightButton.addEventListener('click', () => {
    if (currentIndex < cards.length - 1) {
        currentIndex++;
        updateCarousel();
    }
});

leftButton.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        updateCarousel();
    }
});

// Inicializar el carrusel
updateCarousel();


  


  // Mostrar los mensajes cuando la página se carga
  window.onload = function() {
    displayMessages();
  };

  //Cambiar imagenes cada 5 segundos 
  let slides = document.querySelectorAll('.slide');
let currentSlide = 0;

function showSlide(n) {
  slides[currentSlide].classList.remove('active');
  currentSlide = (n + slides.length) % slides.length;
  slides[currentSlide].classList.add('active');
}

function nextSlide() {
  showSlide(currentSlide + 1);
}

// Iniciar el slideshow
showSlide(0);

// Cambiar de imagen cada 5 segundos
setInterval(nextSlide, 5000);
