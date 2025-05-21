<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Registro de Usuario</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background: #f2f2f2;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
    }

    .container {
      background: #fff;
      padding: 30px;
      border-radius: 10px;
      box-shadow: 0 4px 8px rgba(0,0,0,0.1);
      max-width: 400px;
      width: 100%;
    }

    h1 {
      text-align: center;
      color: #333;
    }

    label {
      display: block;
      margin-top: 15px;
      color: #555;
    }

    input[type="email"],
    input[type="password"],
    input[type="number"],
    select {
      width: 100%;
      padding: 10px;
      margin-top: 5px;
      border: 1px solid #ccc;
      border-radius: 5px;
    }

    input[type="submit"] {
      width: 100%;
      background: #4CAF50;
      color: white;
      padding: 12px;
      border: none;
      border-radius: 5px;
      margin-top: 20px;
      cursor: pointer;
      font-size: 16px;
    }

    input[type="submit"]:hover {
      background: #45a049;
    }

    .mensaje {
      margin-top: 20px;
      text-align: center;
      font-weight: bold;
    }

    .error {
      color: red;
    }

    .exito {
      color: green;
    }
  </style>

  <script>
    function validarFormulario(event) {
      const creditos = document.querySelector('input[name="creditos"]').value;
      if (creditos < 0) {
        alert("Los créditos no pueden ser negativos.");
        event.preventDefault();
      }
    }

    document.addEventListener("DOMContentLoaded", function() {
      document.querySelector("form").addEventListener("submit", validarFormulario);
    });
  </script>
</head>
<body>
  <div class="container">
    <h1>Registro de Usuario</h1>
    <form method="POST" action="">
      <label for="correo">Correo electrónico:</label>
      <input type="email" name="correo" required>

      <label for="contrasena">Contraseña:</label>
      <input type="password" name="contrasena" required>

      <label for="rol">Rol:</label>
      <select name="rol" required>
        <option value="usuario">Usuario</option>
        <option value="administrador">Administrador</option>
      </select>

      <label for="creditos">Créditos iniciales:</label>
      <input type="number" name="creditos" min="0" required>

      <input type="submit" value="Registrarse">
    </form>

<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $correo = $_POST["correo"];
  $contrasena = $_POST["contrasena"];
  $rol = $_POST["rol"];
  $creditos = intval($_POST["creditos"]);

  $urlVerificar = "http://localhost:3005/usuarios/correo/$correo";
  $response = @file_get_contents($urlVerificar);

  if ($response !== false && !empty($response)) {
    $data = json_decode($response, true);
    if (!empty($data)) {
      echo "<p class='mensaje error'>El correo ya está registrado.</p>";
      exit();
    }
  }

  $data = array(
    'correo' => $correo,
    'contrasenia' => $contrasena,
    'tipo' => $rol,
    'creditoDisponible' => $creditos
  );

  $options = array(
    "http" => array(
      "header"  => "Content-type: application/json",
      "method"  => "POST",
      "content" => json_encode($data),
      "ignore_errors" => true
    )
  );

  $context = stream_context_create($options);
  $urlRegistrar = "http://localhost:3005/usuarios";
  $result = file_get_contents($urlRegistrar, false, $context);

  if ($result === FALSE) {
    echo "<p class='mensaje error'>Error al registrar el usuario.</p>";
  } else {
    echo "<p class='mensaje exito'>Usuario registrado exitosamente. Redirigiendo al inicio...</p>";
    echo "<script>
      setTimeout(function() {
        window.location.href = 'index.html';
      }, 2000); // espera 2 segundos antes de redirigir
    </script>";
  }
}
?>

  </div>
</body>
</html>
