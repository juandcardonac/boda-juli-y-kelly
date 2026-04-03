document.addEventListener("DOMContentLoaded", function() {
    // 1. OBTENER NOMBRE DEL INVITADO
    const params = new URLSearchParams(window.location.search);
    const nombreInvitado = params.get('invitado'); 
    
    if (nombreInvitado) {
        document.getElementById('nombre-invitado').innerText = nombreInvitado;
    }

    // Intento de Autoplay al cargar la página
    const audio = document.getElementById("musica");
    audio.play().then(() => {
        updateIcons('play');
    }).catch((error) => {
        console.log("El navegador bloqueó el Autoplay. Esperando interacción del usuario.");
    });

    // --- MOTOR DE LA GALERÍA CON SISTEMA DE SEGURIDAD ---
    try {
        const swiper = new Swiper(".mySwiper", {
            loop: true,               
            centeredSlides: true,     
            slidesPerView: 3,         
            spaceBetween: 10,         
            autoplay: {
                delay: 5000,          
                disableOnInteraction: false, 
            },
            speed: 1000,              
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
            grabCursor: true, 
        });
    } catch (error) {
        console.log("La galería se está preparando.", error);
    }
});

// 2. CONFIGURACIÓN DEL CONTADOR
const fechaBoda = new Date(2026, 9, 30, 16, 0, 0).getTime(); 

const timer = setInterval(function() {
    const ahora = new Date().getTime();
    const distancia = fechaBoda - ahora;

    if (distancia < 0) {
        clearInterval(timer);
        document.getElementById("countdown").innerHTML = "<h3>¡Llegó el gran día!</h3>";
        return;
    }

    const dias = Math.floor(distancia / (1000 * 60 * 60 * 24));
    const horas = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((distancia % (1000 * 60)) / 1000);

    document.getElementById("dias").innerText = dias.toString().padStart(2, '0');
    document.getElementById("horas").innerText = horas.toString().padStart(2, '0');
    document.getElementById("minutos").innerText = minutos.toString().padStart(2, '0');
    document.getElementById("segundos").innerText = segundos.toString().padStart(2, '0');
}, 1000);

// 3. REPRODUCTOR DE MÚSICA UNIFICADO
const audio = document.getElementById("musica");

function toggleMusic() {
    if (audio.paused) {
        audio.play();
        updateIcons('play');
    } else {
        audio.pause();
        updateIcons('pause');
    }
}

function updateIcons(state) {
    const floatingIcon = document.getElementById('floating-icon');
    const cardIcon = document.querySelector('.play-btn-large i');

    if (state === 'play') {
        if(floatingIcon) floatingIcon.classList.replace('fa-play', 'fa-pause');
        if(cardIcon) cardIcon.classList.replace('fa-play', 'fa-pause');
    } else {
        if(floatingIcon) floatingIcon.classList.replace('fa-pause', 'fa-play');
        if(cardIcon) cardIcon.classList.replace('fa-pause', 'fa-play');
    }
}

// 4. EL TRUCO DEL AUTOPLAY
document.body.addEventListener('click', function firstClick() {
     if (audio.paused) {
         audio.play().then(() => {
             updateIcons('play');
         }).catch(e => console.log("Aún no se puede reproducir"));
     }
     document.body.removeEventListener('click', firstClick);
}, { once: true });