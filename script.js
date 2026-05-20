// Configuración de la base de datos externa de Google Sheets
const SCRIPT_URL = https://script.google.com/macros/s/AKfycbyEkUBwSQ__rLSZU7mFxkqishszycOMjLcZtoV6KGTS0AwoY5BfHR8vdCjiztea5rhP/exec

// Banco de preguntas con respuestas ocultas mediante Hash SHA-256 (Evita trampas con F12)
const questions = [
    { q: "¿Cuál es el río más largo del mundo?", a: ["Amazonas", "Nilo", "Misisipi", "Yangtsé"], h: "ea46a9a084fbdfa6081e7f91753cb6032d001eb70908861e68339f408892f254", lvl: 1 },
    { q: "¿Cuál es el planeta más cercano al Sol?", a: ["Venus", "Tierra", "Mercurio", "Marte"], h: "bdf4c65306e93c1da143fa92e6206013a23a85db9a365f5e27a69cf46fb8cfdf", lvl: 1 },
    { q: "¿Cuántos meses tienen 28 días?", a: ["1 mes", "Todos los meses", "Ninguno", "2 meses"], h: "4376c20526017b2b8e3ad5d35dfadbb3e66012674cf472147726359560f6fb6e", lvl: 1 },
    { q: "¿Qué país tiene forma de bota?", a: ["España", "Francia", "Italia", "Grecia"], h: "9bfbf77770178bf73883a8b417c88082a7a40b991448bdf1b359f1f0a1490226", lvl: 1 },
    { q: "¿Cuál es el océano más grande del mundo?", a: ["Atlántico", "Índico", "Ártico", "Pacífico"], h: "a9a3b900ec4762088f110c41031317cc7bfd44b0e5da4860b7978c43093222da", lvl: 1 },
    { q: "¿Qué colores tiene la bandera de Perú?", a: ["Rojo y Blanco", "Azul y Blanco", "Rojo y Amarillo", "Verde y Blanco"], h: "f2c31e6bc6d790408ca4da34988e0b678c1a17088b9c817294cf5e297805b634", lvl: 1 },
    { q: "¿Cuál es el animal terrestre más veloz del mundo?", a: ["León", "Guepardo", "Caballo", "Antílope"], h: "518e3fb633458bf59c049eeec60efee344a86bdf8a14b53efba8a24558e658bb", lvl: 1 },
    { q: "¿Cómo se llama el proceso por el cual las plantas fabrican su alimento?", a: ["Respiración", "Mitosis", "Fotosíntesis", "Absorción"], h: "d718a221f73b64c0179a6111bebc65a513576dfa1e39e5572566c7f8fcdba5f9", lvl: 1 },
    { q: "¿Qué tipo de animal es la ballena?", a: ["Pez", "Mamífero", "Anfibio", "Reptil"], h: "66779d7494553f169f4fc66cb47d96f92d471587ee3b4e073c683b5df54b423d", lvl: 1 },
    { q: "¿Cuántos lados tiene un hexágono?", a: ["5", "6", "7", "8"], h: "15a7ec92af83b54406283dbfb42b4d45084f7b494632832810a08e1694f27663", lvl: 1 },
    { q: "¿En qué año se descubrió América?", a: ["1492", "1504", "1789", "1345"], h: "aa6a564da8f7311df90124b82fc60f607106093d50f8e9184fa2da2925b6a378", lvl: 2 },
    { q: "¿Cuál es el elemento químico más abundante en el universo?", a: ["Oxígeno", "Helio", "Hidrógeno", "Carbono"], h: "35da0a35987a02796be4299ec51a82da17cb099238384f50937a0753381a1a74", lvl: 2 },
    { q: "¿Quién pintó la famosa 'Mona Lisa'?", a: ["Van Gogh", "Miguel Ángel", "Leonardo da Vinci", "Picasso"], h: "51c96417be1f93976f0cb3c78d58c89fb9cc621e25e366da2b7a07185cd24477", lvl: 2 },
    { q: "¿Cuál es el país más grande del mundo por territorio?", a: ["Canadá", "Rusia", "China", "Estados Unidos"], h: "d689b9d4e5f037617b07c8702b8d009b0b691bf77bb0b81b8beee33cfb9b87db", lvl: 2 },
    { q: "¿Cuál es la capital de Italia?", a: ["Milán", "Venecia", "Florencia", "Roma"], h: "df009477aa0d65b790408df96989441113dd8b5a0342b42d556519199d63c501", lvl: 2 },
    { q: "¿Qué órgano del cuerpo humano consume más energía?", a: ["El corazón", "El cerebro", "El hígado", "Los músculos"], h: "78f7127e2cbbf69363076f8f533a1e27a6ca44655cc2f1b4020a5996b7cdb9e7", lvl: 2 },
    { q: "¿En qué país se originaron los Juegos Olímpicos antiguos?", a: ["Roma", "Grecia", "Egipto", "Persia"], h: "c8e23fc475cb391ebdb38e55e0a0f027df58bc67aa32ca58cb619a9a30488661", lvl: 2 },
    { q: "¿Cuál es el metal más caro del mundo?", a: ["Oro", "Platino", "Rodio", "Diamante"], h: "a9bfb05c5dfc6a3780a47eb91040856f4d2f099518d6a892b11bd8b4a70be0e5", lvl: 2 },
    { q: "¿Qué escritor creó al famoso personaje de 'Don Quijote de la Mancha'?", a: ["Gabriel García Márquez", "Miguel de Cervantes", "Shakespeare", "Mario Vargas Llosa"], h: "51c9d2bf94ab1ff1910efb81c4e7e9be1ef895690bfa7d9bf3a1c863a493b8d4", lvl: 2 },
    { q: "¿Cuál es la moneda oficial de Japón?", a: ["Yuan", "Won", "Dólar", "Yen"], h: "29f957018305c48bbf330af22db475fb6299b828fcb0ca5c8b3687352f205315", lvl: 2 },
    { q: "¿Cuál es el único mamífero capaz de volar?", a: ["La ardilla voladora", "El murciélago", "El ornitorrinco", "El colibrí"], h: "986a01490237599c9bc119b9a65d83664d6dbbc3d67f9be4a9ef1c9b2f6efd55", lvl: 3 },
    { q: "¿Qué filósofo griego fue el maestro de Alejandro Magno?", a: ["Sócrates", "Platón", "Aristóteles", "Pitágoras"], h: "1cfad2e3e571c26b38c22649a15638fe300c3b08e2d426372b6b0606ecb6d194", lvl: 3 },
    { q: "¿Cuál es la fosa marina más profunda del planeta?", a: ["Fosa de Java", "Fosa de Puerto Rico", "Fosa de las Marianas", "Fosa de Tonga"], h: "82a08da3df313d50821d3f90558a2d1d0bc8f7c9e05f257a07be7be007db959e", lvl: 3 },
    { q: "¿Qué emperador romano nombró cónsul a su caballo Incitato?", a: ["Nerón", "Calígula", "Julio César", "Cómodo"], h: "228cf088198f3994e6bf744bfa2863fb796da1e00a35db45ec8f67e5bb947517", lvl: 3 },
    { q: "¿Cuál es el gas noble más pesado que se conoce?", a: ["Helio", "Argón", "Radón", "Oganesón"], h: "35bc7d2a71bc9a4993d0fa47c0a6b7201c10740cf4b6ee98e54737aa15da28cb", lvl: 3 }
];

let currentIdx = 0;
let timer;
let timeLeft = 15;
let gameActive = false;
let playerName = "";
let playerPhone = "";
let correctAnswersCount = 0;

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

async function calcularSHA256(texto) {
    const msgBuffer = new TextEncoder().encode(texto.trim().toLowerCase());
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

async function validateRegistration() {
    playerName = document.getElementById("username").value.trim();
    playerPhone = document.getElementById("userphone").value.trim();

    if (playerName === "" || playerPhone === "") {
        alert("Por favor, llena ambos campos para continuar.");
        return;
    }
    if (playerPhone.length < 9 || isNaN(playerPhone)) {
        alert("Por favor, ingresa un número de celular válido de 9 dígitos.");
        return;
    }

    const button = document.querySelector(".btn");
    button.disabled = true;
    button.innerText = "Verificando registro...";

    try {
        let response = await fetch(SCRIPT_URL, {
            method: "POST",
            body: JSON.stringify({ action: "verificar", celular: playerPhone })
        });
        let resultado = await response.json();

        if (resultado.registrado) {
            alert("Este número de celular ya ha sido registrado en un intento previo. No puedes volver a jugar.");
            localStorage.setItem("trivia_bloqueado", "true");
            mostrarBloqueoPermanente();
            return;
        }

        startQuiz();

    } catch (error) {
        console.error(error);
        alert("Error de conexión con el servidor. Inténtalo de nuevo más tarde.");
        button.disabled = false;
        button.innerText = "Ingresar y Jugar";
    }
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
    correctAnswersCount = 0;
    gameActive = true;
    loadQuestion();
    activateAntiCheat();
}

function loadQuestion() {
    if (currentIdx >= questions.length) {
        endGame(true, "¡FELICIDADES! Has contestado todas las preguntas. Tu puntaje ha sido guardado.");
        return;
    }

    const qData = questions[currentIdx];
    document.getElementById("level-txt").innerText = `Nivel: ${qData.lvl}`;
    document.getElementById("progress-txt").innerText = `Pregunta: ${currentIdx + 1}/${questions.length}`;
    document.getElementById("question-txt").innerText = qData.q;

    const optionsBox = document.getElementById("options-box");
    optionsBox.innerHTML = "";

    qData.a.forEach(opcion => {
        const btnOpcion = document.createElement("button");
        btnOpcion.className = "option-btn";
        btnOpcion.innerText = opcion;
        btnOpcion.onclick = () => verificarRespuesta(opcion);
        optionsBox.appendChild(btnOpcion);
    });

    timeLeft = 15;
    document.getElementById("time-left").innerText = timeLeft;
    clearInterval(timer);
    
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById("time-left").innerText = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            endGame(false, "❌ ¡Se te acabó el tiempo en la pregunta actual! El juego ha terminado.");
        }
    }, 1000);
}

async function verificarRespuesta(opcionSeleccionada) {
    clearInterval(timer);
    const qData = questions[currentIdx];
    const hashUsuario = await calcularSHA256(opcionSeleccionada);

    if (hashUsuario === qData.h) {
        correctAnswersCount++;
        currentIdx++;
        loadQuestion();
    } else {
        endGame(false, `❌ Respuesta incorrecta. El juego ha terminado.`);
    }
}

function activateAntiCheat() {
    document.addEventListener("visibilitychange", () => {
        if (document.hidden && gameActive) {
            endGame(false, "❌ Trampa detectada: Cambiaste de pestaña o saliste del navegador.");
        }
    });

    document.addEventListener("fullscreenchange", () => {
        if (!document.fullscreenElement && gameActive) {
            endGame(false, "❌ Trampa detectada: Saliste del modo pantalla completa.");
        }
    });
}

async function endGame(success, mensaje) {
    gameActive = false;
    clearInterval(timer);
    
    localStorage.setItem("trivia_bloqueado", "true");
    localStorage.setItem("phone_" + playerPhone, "jugó");

    if (document.fullscreenElement) {
        document.exitFullscreen().catch(err => console.log(err));
    }

    document.getElementById("quiz-screen").classList.add("hidden");
    document.getElementById("result-screen").classList.remove("hidden");
    
    const finalScoreTxt = `<br><br><b>Puntaje Final: ${correctAnswersCount} de 25 correctas.</b>`;
    document.getElementById("result-msg").innerHTML = mensaje + finalScoreTxt;

    try {
        await fetch(SCRIPT_URL, {
            method: "POST",
            body: JSON.stringify({
                action: "registrar",
                nombre: playerName,
                celular: playerPhone,
                puntaje: `${correctAnswersCount}/25`
            })
        });
    } catch (e) {
        console.error("Error al guardar: ", e);
    }
}
