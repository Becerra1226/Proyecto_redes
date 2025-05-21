<?php
session_start();
$mensajeError = "";

if ($_SERVER["REQUEST_METHOD"] == "GET" && isset($_GET["correo"]) && isset($_GET["contrasena"])) {
    $correo = urlencode($_GET['correo']);
    $contrasena = urlencode($_GET['contrasena']);

    $url = "http://localhost:3005/usuarios/validar/$correo/$contrasena";
    $response = @file_get_contents($url);

    if ($response === FALSE) {
        // Si falla la conexión, redirige al index
        echo "<p class='mensaje error'>Error al iniciar sesión.</p>";
        header('Location: index.html');
        exit();
    } else {
        $data = json_decode($response, true);

        if (isset($data['usuario']['correo']) && isset($data['usuario']['tipo'])) {
            $_SESSION['correo'] = $data['usuario']['correo'];
            $_SESSION['tipo'] = $data['usuario']['tipo'];
            $_SESSION['credito'] = $data['usuario']['creditoDisponible'];

            if ($data['usuario']['tipo'] === 'administrador') {
                header('Location: adminPanel.php');
            } else {
                header('Location: userHome.php');
            }
            exit();
        } else {
            // Si las credenciales son incorrectas, también redirige al index
            header('Location: index.html');
            echo "<p class='mensaje error'>El correo o la contraseña no son correctos</p>";
            exit();
        }
    }
}
?>


<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Iniciar Sesión</title>
    <style>
        :root {
            --bg-color: #121212;
            --text-color: #ffffff;
            --input-bg: #1f1f1f;
            --border-color: #333;
            --button-bg: #4CAF50;
            --button-hover-bg: #45a049;
            --link-color: #80bfff;
            --error-bg: #ffcccc;
            --error-text: #cc0000;
        }

        body.light-mode {
            --bg-color: #f0f0f0;
            --text-color: #000000;
            --input-bg: #ffffff;
            --border-color: #ccc;
            --button-bg: #007BFF;
            --button-hover-bg: #0056b3;
            --link-color: #007BFF;
            --error-bg: #ffe6e6;
            --error-text: #cc0000;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: var(--bg-color);
            color: var(--text-color);
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            transition: background-color 0.4s, color 0.4s;
        }

        .login-container {
            background-color: var(--input-bg);
            padding: 40px;
            border-radius: 15px;
            box-shadow: 0px 10px 25px rgba(0, 0, 0, 0.3);
            width: 100%;
            max-width: 400px;
            text-align: center;
        }

        h2 {
            margin-bottom: 20px;
        }

        .error-message {
            background-color: var(--error-bg);
            color: var(--error-text);
            padding: 10px;
            border-radius: 8px;
            margin-bottom: 15px;
            text-align: center;
        }

        form {
            display: flex;
            flex-direction: column;
        }

        label {
            text-align: left;
            margin-bottom: 5px;
        }

        input {
            padding: 10px;
            margin-bottom: 20px;
            border: 1px solid var(--border-color);
            border-radius: 8px;
            font-size: 16px;
            background-color: var(--bg-color);
            color: var(--text-color);
        }

        button {
            background-color: var(--button-bg);
            color: white;
            padding: 12px;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-size: 16px;
            transition: background-color 0.3s ease;
        }

        button:hover {
            background-color: var(--button-hover-bg);
        }

        .registro-link {
            margin-top: 20px;
            color: var(--link-color);
            text-decoration: none;
            display: inline-block;
        }

        .registro-link:hover {
            text-decoration: underline;
        }

        .toggle-mode {
            margin-top: 20px;
            background: none;
            color: var(--link-color);
            border: 1px solid var(--link-color);
            padding: 8px 16px;
            border-radius: 8px;
            cursor: pointer;
        }

        .toggle-mode:hover {
            background-color: var(--link-color);
            color: var(--bg-color);
        }
    </style>
</head>
<body>
    <div class="login-container">
        <h2>Iniciar Sesión</h2>

        <?php if (!empty($mensajeError)): ?>
            <div class="error-message"><?php echo $mensajeError; ?></div>
        <?php endif; ?>

        <form method="GET" action="index.php">
            <label for="correo">Correo:</label>
            <input type="email" name="correo" required>

            <label for="contrasena">Contraseña:</label>
            <input type="password" name="contrasena" required>

            <button type="submit">Ingresar</button>
        </form>

        <a class="registro-link" href="registro.php">¿No tienes cuenta? Crear usuario</a>
        <br>
        <button class="toggle-mode" onclick="toggleTheme()">Cambiar modo</button>
    </div>

    <script>
        function toggleTheme() {
            document.body.classList.toggle("light-mode");
        }
    </script>
</body>
</html>
