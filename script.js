html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Trivia de Cultura General</title>
    <!-- Vinculación del archivo CSS separado -->
    <link rel="stylesheet" href="style.css">
</head>
<body>

    <div class="container">
        <!-- Pantalla de Registro -->
        <div id="register-screen">
            <h1>Gran Trivia de Cultura General</h1>
            <p>Responde 25 preguntas y gana el premio de <b>S/ 5.00 Soles</b>.</p>
            <p class="notice">⚠️ Tienes 15 segundos por pregunta. Si sales de pantalla completa o cambias de pestaña, perderás automáticamente. Solo tienes 1 intento.</p>
            
            <div class="form-group">
                <label for="username">Nombre Completo:</label>
                <input type="text" id="username" placeholder="Ej. Juan Pérez">
            </div>
            <div class="form-group">
                <label for="userphone">Número de Celular:</label>
                <input type="tel" id="userphone" placeholder="Ej. 987654321" maxlength="9">
            </div>
            <button class="btn" onclick="validateRegistration()">Ingresar y Jugar</button>
        </div>

        <!-- Pantalla de Juego -->
        <div id="quiz-screen" class="hidden">
            <div class="info-panel">
                <span id="level-txt">Nivel: 1</span>
                <span id="progress-txt">Pregunta: 1/25</span>
                <span class="timer">Tiempo: <span id="time-left">15</span>s</span>
            </div>
            <h2 id="question-txt">Aquí va la pregunta</h2>
            <div class="options-container" id="options-box"></div>
        </div>

        <!-- Pantalla de Resultados Finales -->
        <div id="result-screen" class="hidden">
            <h1 id="result-title">¡Fin del Juego!</h1>
            <p id="result-msg"></p>
            <p class="footnote">Tu número de celular ha quedado registrado. No se permiten más intentos.</p>
        </div>
    </div>

    <!-- Vinculación del archivo JavaScript separado -->
    <script src="script.js"></script>
</body>
</html>
