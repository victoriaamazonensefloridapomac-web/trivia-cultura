const questions = [
    { q: "¿Cuál es el río más largo del mundo?", a: ["Amazonas", "Nilo", "Misisipi", "Yangtsé"], c: 0, lvl: 1 },
    { q: "¿Cuál es el planeta más cercano al Sol?", a: ["Venus", "Tierra", "Mercurio", "Marte"], c: 2, lvl: 1 },
    { q: "¿Cuántos meses tienen 28 días?", a: ["1 mes", "Todos los meses", "Ninguno", "2 meses"], c: 1, lvl: 1 },
    { q: "¿Qué país tiene forma de bota?", a: ["España", "Francia", "Italia", "Grecia"], c: 2, lvl: 1 },
    { q: "¿Cuál es el océano más grande del mundo?", a: ["Atlántico", "Índico", "Ártico", "Pacífico"], c: 3, lvl: 1 },
    { q: "¿Qué colores tiene la bandera de Perú?", a: ["Rojo y Blanco", "Azul y Blanco", "Rojo y Amarillo", "Verde y Blanco"], c: 0, lvl: 1 },
    { q: "¿Cuál es el animal terrestre más veloz del mundo?", a: ["León", "Guepardo", "Caballo", "Antílope"], c: 1, lvl: 1 },
    { q: "¿Cómo se llama el proceso por el cual las plantas fabrican su alimento?", a: ["Respiración", "Mitosis", "Fotosíntesis", "Absorción"], c: 2, lvl: 1 },
    { q: "¿Qué tipo de animal es la ballena?", a: ["Pez", "Mamífero", "Anfibio", "Reptil"], c: 1, lvl: 1 },
    { q: "¿Cuántos lados tiene un hexágono?", a: ["5", "6", "7", "8"], c: 1, lvl: 1 },
    { q: "¿En qué año se descubrió América?", a: ["1492", "1504", "1789", "1345"], c: 0, lvl: 2 },
    { q: "¿Cuál es el elemento químico más abundante en el universo?", a: ["Oxígeno", "Helio", "Hidrógeno", "Carbono"], c: 2, lvl: 2 },
    { q: "¿Quién pintó la famosa 'Mona Lisa'?", a: ["Van Gogh", "Miguel Ángel", "Leonardo da Vinci", "Picasso"], c: 2, lvl: 2 },
    { q: "¿Cuál es el país más grande del mundo por territorio?", a: ["Canadá", "Rusia", "China", "Estados Unidos"], c: 1, lvl: 2 },
    { q: "¿Cuál es la capital de Italia?", a: ["Milán", "Venecia", "Florencia", "Roma"], c: 3, lvl: 2 },
    { q: "¿Qué órgano del cuerpo humano consume más energía?", a: ["El corazón", "El cerebro", "El hígado", "Los músculos"], c: 1, lvl: 2 },
    { q: "¿En qué país se originaron los Juegos Olímpicos antiguos?", a: ["Roma", "Grecia", "Egipto", "Persia"], c: 1, lvl: 2 },
    { q: "¿Cuál es el metal más caro del mundo?", a: ["Oro", "Platino", "Rodio", "Diamante"], c: 2, lvl: 2 },
    { q: "¿Qué escritor creó al famoso personaje de 'Don Quijote de la Mancha'?", a: ["Gabriel García Márquez", "Miguel de Cervantes", "Shakespeare", "Mario Vargas Llosa"], c: 1, lvl: 2 },
    { q: "¿Cuál es la moneda oficial de Japón?", a: ["Yuan", "Won", "Dólar", "Yen"], c: 3, lvl: 2 },
    { q: "¿Cuál es el único mamífero capaz de volar?", a: ["La ardilla voladora", "El murciélago", "El ornitorrinco", "El colibrí"], c: 1, lvl: 3 },
    { q: "¿Qué filósofo griego fue el maestro de Alejandro Magno?", a: ["Sócrates", "Platón", "Aristóteles", "Pitágoras"], c: 2, lvl: 3 },
    { q: "¿Cuál es la fosa marina más profunda del planeta?", a: ["Fosa de Java", "Fosa de Puerto Rico", "Fosa de las Marianas", "Fosa de Tonga"], c: 2, lvl: 3 },
    { q: "¿Qué emperador romano nombró cónsul a su caballo Incitato?", a: ["Nerón", "Calígula", "Julio César", "Cómodo"], c: 1, lvl: 3 },
    { q: "¿Cuál es el gas noble más pesado que se conoce?", a: ["Helio", "Argón", "Radón", "Oganesón"], c: 2, lvl: 3 }
];

let currentIdx = 0;
let timer;
let timeLeft = 15;
let gameActive = false;
let playerPhone = "";

// CANDADO 1: Verifica al cargar la página si el dispositivo ya está bloqueado
window.onload = function() {
    if (localStorage.getItem("trivia_bloqueado")) {
        mostrarBloqueoPermanente();
    }
};

function mostrarBloqueoPermanente() {
    document.getElementById("register-screen").innerHTML = `
        <h1 style='color:#ff5252;'>Acceso Denegado</h1>
        <p class='warning'>Ya has participado en esta trivia anteriormente. Solo se permite un intento por dispositivo/persona para mantener la transparencia del premio.</p>
    `;
}

function validateRegistration() {
    const name = document.getElementById("username").value.trim();
    playerPhone = document.getElementById("userphone").value.trim();

    if (name === "" || playerPhone === "") {
        alert("Por favor, llena ambos campos para continuar.");
        return;
    }
    if (playerPhone.length < 9 || isNaN(playerPhone)) {
        alert("Por favor, ingresa un número de celular válido de 9 dígitos.");
        return;
    }

    // CANDADO 2: Verifica si el número de celular ya intentó jugar antes
    if (localStorage.getItem("phone_" + playerPhone)) {
        alert("Este número de celular ya ha sido registrado en un intento previo. No puedes volver a jugar.");
        localStorage.setItem("trivia_bloqueado", "true");
        mostrarBloqueoPermanente();
        return;
    }

    // Registra el número de celular inmediatamente al entrar al juego
    localStorage.setItem("phone_" + playerPhone, "jugó");
    startQuiz();
}

function startQuiz() {
    let elem = document.documentElement;
    if (elem.requestFullscreen) { elem.requestFullscreen(); }
    else if (elem.mozRequestFullScreen) { elem.mozRequestFullScreen(); }
    else if (elem.webkitRequestFullscreen) { elem.webkitRequestFullscreen(); }
    else if (elem.msRequestFullscreen) { elem.msRequestFullscreen(); }

    document.getElementById("register-screen").classList.add("hidden");
    document.getElementById("quiz-screen").classList.remove("hidden");
    
    currentIdx = 0; 
    gameActive = true;
    loadQuestion();
    activateAntiCheat();
}

function loadQuestion() {
    if (currentIdx >= questions.length) {
        endGame(true, "¡FELICIDADES! Has contestado todas las preguntas de forma honesta. ¡Te ganaste el premio de S/ 5.00 Soles! 💰<br><br>Escríbenos al organizador con tu número registrado para cobrar tu premio.");
        return;
    }

    timeLeft = 15;
    document.getElementById("time-left").innerText = timeLeft;
    clearInterval(timer);
    
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById("time-left").innerText = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            endGame(false, "❌ ¡Se te acabó el tiempo! Perdiste tu única oportunidad.");
        }
    }, 1000);

    let qData = questions[currentIdx];
    document.getElementById("level-txt").innerText = `Nivel: ${qData.lvl}`;
    document.getElementById("progress-txt").innerText = `Pregunta: ${currentIdx + 1}/${questions.length}`;
    document.getElementById("question-txt").innerText = qData.q;

    let optionsBox = document.getElementById("options-box");
    optionsBox.innerHTML = "";

    qData.a.forEach((option, index) => {
        let btn = document.createElement("button");
        btn.className = "option-btn";
        btn.innerText = option;
        btn.onclick = () => checkAnswer(index);
        optionsBox.appendChild(btn);
    });
}

function checkAnswer(selectedIdx) {
    clearInterval(timer);
    if (selectedIdx === questions[currentIdx].c) {
        currentIdx++;
        loadQuestion();
    } else {
        endGame(false, "❌ Respuesta incorrecta. Has perdido tu única oportunidad.");
    }
}

function endGame(success, message) {
    gameActive = false;
    clearInterval(timer);
    
    // CANDADO 3: Bloquea el dispositivo permanentemente al terminar (gane o pierda)
    localStorage.setItem("trivia_bloqueado", "true");

    document.getElementById("quiz-screen").classList.add("hidden");
    document.getElementById("result-screen").classList.remove("hidden");
    
    let title = document.getElementById("result-title");
    let msg = document.getElementById("result-msg");
    
    if (success) {
        title.innerText = "🏆 ¡Tenemos un Ganador! 🏆";
        title.style.color = "#4caf50";
    } else {
        title.innerText = "Fin del Juego";
        title.style.color = "#ff5252";
    }
    
    msg.innerHTML = message;
    
    if (document.exitFullscreen) { document.exitFullscreen().catch(() => {}); }
}

// CANDADO 4: Sistema anti-trampas estricto en tiempo real
function activateAntiCheat() {
    document.addEventListener("visibilitychange", () => {
        if (document.hidden && gameActive) {
            endGame(false, "<span class='warning'>⚠️ TRAMPA DETECTADA: Saliste de la ventana del juego para buscar información. Quedas descalificado de forma permanente.</span>");
        }
    });

    document.addEventListener("fullscreenchange", () => {
        if (!document.fullscreenElement && gameActive) {
            endGame(false, "<span class='warning'>⚠️ TRAMPA DETECTADA: Saliste de la pantalla completa. Quedas descalificado de forma permanente.</span>");
        }
    });
}