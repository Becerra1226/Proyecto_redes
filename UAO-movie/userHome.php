<?php
session_start();

if (!isset($_SESSION['correo']) || $_SESSION['tipo'] !== 'usuario') {
    header('Location: login.php');
    exit();
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>Inicio de Usuario</title>
</head>
<body>
    <h1>Bienvenido a tu espacio de usuario</h1>
    <p>Correo: <?php echo $_SESSION['correo']; ?></p>
    <p>Tipo de usuario: <?php echo $_SESSION['tipo']; ?></p>
    <p>Créditos disponibles: <?php echo $_SESSION['credito']; ?></p>

    <a href="logout.php">Cerrar sesión</a>
</body>
</html>
