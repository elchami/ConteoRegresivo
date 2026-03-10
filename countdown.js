// Establecer la fecha objetivo directamente en el código (formato: año, mes-1, día)
const targetDate = new Date(2028, 3, 30);
const audio = new Audio("audio/Astronomia.mp3");
const btnRola = document.getElementById('rolaBtn');


btnRola.addEventListener('click', function() {
    audio.play();
  }, { once: true }); 

function startCountdown() {
    const countdownElement = document.getElementById('time');

    const msPerSecond = 1000;
    const msPerMinute = msPerSecond * 60;
    const msPerHour = msPerMinute * 60;
    const msPerDay = msPerHour * 24;
    const msPerYear = msPerDay * 365;

    const interval = setInterval(() => {
        const now = new Date();
        const difference = targetDate - now;

        if (difference <= 0) {
            clearInterval(interval);
            countdownElement.innerText = "¡Ha llegado el momento de volar!";
            btnRola.removeAttribute("hidden");
            launchConfetti();
            return;
        }

        const years = Math.floor(difference / msPerYear); 
        const days = Math.floor((difference % msPerYear) / msPerDay);
        const hours = Math.floor((difference % msPerDay) / msPerHour);
        const minutes = Math.floor((difference % msPerHour) / msPerMinute);
        const seconds = Math.floor((difference % msPerMinute) / msPerSecond);

        countdownElement.innerText = `${years} años, ${days} días, ${hours} horas, ${minutes} minutos, ${seconds} segundos`;
    }, 1000);
}

// Iniciar el conteo regresivo
startCountdown();

// Función para lanzar confetti
function launchConfetti() {
    const duration = 70 * 1000; // Duración de 5 segundos
    const end = Date.now() + duration;
    const colors = ['#bb0000', '#ffffff', '#00ffab', '#ffeb3b'];

    (function frame() {
        confetti({
            particleCount: 3,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: colors
        });
        confetti({
            particleCount: 3,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: colors
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    }());
}
