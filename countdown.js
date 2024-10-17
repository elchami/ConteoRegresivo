// Establecer la fecha objetivo directamente en el código (formato: año, mes-1, día)
const targetDate = new Date(2024, 9, 16,21, 29); // Octubre es el mes 9 (los meses en JavaScript son base 0)
const ovationSound = document.getElementById('ovationSound');
//const btnRola = document.getElementById('rolaBtn');

function startCountdown() {
    const countdownElement = document.getElementById('time');

    const interval = setInterval(() => {
        const now = new Date();
        const difference = targetDate - now;

        if (difference <= 0) {
            clearInterval(interval);
            countdownElement.innerText = "¡Felicidades Ingeniero, es el día de la graduación!";
            //btnRola.removeAttribute("hidden");
            launchConfetti();
            return;
        }

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        countdownElement.innerText = `${days} días, ${hours} horas, ${minutes} minutos, ${seconds} segundos`;
    }, 1000);
}

// Iniciar el conteo regresivo
startCountdown();

// Función para lanzar confetti
function launchConfetti() {
    const duration = 70 * 1000; // Duración de 5 segundos
    ovationSound.play();
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
