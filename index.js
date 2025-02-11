document.addEventListener("DOMContentLoaded", () => {
    const countdownElement = document.getElementById("countdown");
    const envelope = document.querySelector(".envelope img");
    const yesButton = document.getElementById("yes-button");
    const noButton = document.getElementById("no-button");
    const buttonContainer = document.getElementById("button-container");
    let isLetterUnlocked = false;

    const heartContainer = document.querySelector('.hearts-container');
    const maxHearts = 10;

    buttonContainer.style.display = "none"; // Ocultar botones al inicio

    // Función para crear corazones animados
    function createHeart() {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.style.left = `${Math.random() * 100}%`;
        heartContainer.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 15000);
    }

    // Generar corazones a intervalos
    let heartCount = 0;
    setInterval(() => {
        if (heartCount < maxHearts) {
            createHeart();
            heartCount++;
        }
    }, 500);

    // Definir fecha objetivo (14 de febrero de 2025 a las 00:00:00)
    const targetDate = new Date("2025-02-14T00:00:00").getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const difference = targetDate - now;

        if (difference <= 0) {
            countdownElement.innerHTML = "¡La carta ha llegado!";
            buttonContainer.style.display = "block"; // Mostrar botones cuando llegue el momento
            clearInterval(timerInterval);
            return;
        }

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        countdownElement.innerHTML = `Nueva carta en: ${days}d ${hours}h ${minutes}m ${seconds}s`;
    }

    // Actualizar temporizador cada segundo
    const timerInterval = setInterval(updateCountdown, 1000);
    updateCountdown();

    // Evento para desbloquear la carta
    yesButton.addEventListener("click", () => {
        isLetterUnlocked = true;
        countdownElement.innerText = "¡Ya puedes abrir tu carta!";
        buttonContainer.style.display = "none";
    });

    // Evento para rechazar la carta
    noButton.addEventListener("click", () => {
        countdownElement.innerText = "La carta permanecerá cerrada.";
    });

    // Animación de la carta al hacer clic
    envelope.addEventListener("click", () => {
        if (!isLetterUnlocked) {
            alert("Debes desbloquear la carta primero.");
            return;
        }
        envelope.classList.add("open"); // Aplica animación
        countdownElement.innerText = "¡Disfruta de tu carta!";
    });
});
