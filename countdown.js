
let targetDate;
let countdownInterval;


const displayContainer = document.getElementById('display-container');
const setupContainer = document.getElementById('setup-container');
const dateInput = document.getElementById('dateInput');
const saveDateBtn = document.getElementById('saveDateBtn');
const targetText = document.getElementById('target-text');
const countdownElement = document.getElementById('time');
const btnRola = document.getElementById('rolaBtn');
const resetBtn = document.getElementById('resetBtn');

const audio = new Audio("audio/Astronomia.mp3");

// 1. Al cargar la página, verificamos si hay una fecha guardada
window.onload = function() {
    const savedDate = localStorage.getItem('savedTargetDate');
    
    if (savedDate) {
        initCountdown(new Date(savedDate));
    } else {
        showSetup();
    }
};

// Muestra el calendario
function showSetup() {
    displayContainer.style.display = 'none';
    setupContainer.style.display = 'block';
}

// Guarda la fecha y arranca
saveDateBtn.addEventListener('click', () => {
    const selectedDate = dateInput.value;
    if (selectedDate) {
        localStorage.setItem('savedTargetDate', selectedDate);
        initCountdown(new Date(selectedDate));
    } else {
        alert("Por favor selecciona una fecha válida.");
    }
});


btnRola.addEventListener('click', () => {
    audio.play();
}, { once: true });


// Botón para resetear y elegir otra fecha
resetBtn.addEventListener('click', () => {
    localStorage.removeItem('savedTargetDate');
    clearInterval(countdownInterval);
    location.reload(); // Recargamos para mostrar el setup
});

function initCountdown(date) {
    targetDate = date;
    setupContainer.style.display = 'none';
    displayContainer.style.display = 'block';
    
    // Formatear la fecha para que se vea bonita en el span
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    targetText.innerText = targetDate.toLocaleDateString('es-ES', options);

    startCountdown();
}


function startCountdown() {

    const msPerSecond = 1000;
    const msPerMinute = msPerSecond * 60;
    const msPerHour = msPerMinute * 60;
    const msPerDay = msPerHour * 24;
    const msPerYear = msPerDay * 365;

    countdownInterval = setInterval(() => {
        const now = new Date();
        const difference = targetDate - now;

        if (difference <= 0) {
            clearInterval(countdownInterval);
            countdownElement.innerText = "¡Es el momento!";
            btnRola.removeAttribute("hidden");
            launchConfetti();
            return;
        }

        const years = Math.floor(difference / msPerYear);
        const days = Math.floor((difference % msPerYear) / msPerDay);
        const hours = Math.floor((difference % msPerDay) / msPerHour);
        const minutes = Math.floor((difference % msPerHour) / msPerMinute);
        const seconds = Math.floor((difference % msPerMinute) / msPerSecond);

        countdownElement.innerText = `${years} años, ${days} dias, ${hours} horas, ${minutes} minutos, ${seconds} segundos`;
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
