<?php
session_start();
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&family=Sen:wght@400;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.2/css/all.min.css">
    <link rel="shortcut icon" href="../../Imagenes/Logo/UAO-icono.svg" type="image/x-icon"/>
    <link href="creditos.css" rel="stylesheet" type="text/css"/>
    <title>Home</title>
</head>

<body>
    <div class="navbar">
        <div class="navbar-container">
            <div class="logo-container">
                <img src="../../Imagenes/Logo/UAO.svg" alt="Logo" class="logo">
            </div>
            <div class="menu-container">
                <ul class="menu-list">
                    <li class="menu-list-item">Películas</li>
                    <li class="menu-list-item">Series</li>
                    <li class="menu-list-item">Populares</li>
                    <li class="menu-list-item">Tendencias</li>
                </ul>
            </div>
            <div class="profile-container">
                <img class="profile-picture" src="../../Imagenes/Perfil/Perfil_1.svg" alt="Perfil">
                <div class="profile-text-container">
                    <span class="profile-text">Perfil</span>
                    <i class="fas fa-caret-down"></i>
                </div>
                <div class="toggle">
                    <i class="fas fa-moon toggle-icon"></i>
                    <i class="fas fa-sun toggle-icon"></i>
                    <div class="toggle-ball"></div>
                </div>
            </div>
        </div>
    </div>

    <div class="sidebar">
        <i class="left-menu-icon fas fa-search"></i>
        <i class="left-menu-icon fas fa-home"></i>
        <i class="left-menu-icon fas fa-tv"></i>
        <a href="/Home/Creditos/creditos.html">
            <i class="left-menu-icon fas fa-shopping-cart"></i>
        </a>
    </div>

    <div class="container">
        <div class="content-container">
            <header class="main-header">
                <div class="profile-header">
                    <div class="profile-box">
                        <img class="profile-pic" src="../../Imagenes/Perfil/Perfil_1.svg" alt="Perfil">
                        <div class="profile-info">
                            <span class="profile-name">Noah</span>
                            <p class="profile-status">Tus créditos son</p>
                            <button id="btnCerrarSesion" style="margin-top:10px;">Cerrar sesión</button>
                            <button id="btnEliminarCuenta" style="margin-left:10px; margin-top:10px;">Eliminar cuenta</button>
                        </div>
                        <span class="profile-balance">15</span>
                        <img class="credit-icon" src="../../Imagenes/Tickets/Dorada.svg" alt="discounts">
                    </div>
                </div>
            </header>

            <div class="promo-title">
                <h2>Recarga créditos</h2>
            </div>

            <div class="promo">
                <div class="discounts-card">
                    <div class="discounts-card-content">
                        <span>5 Créditos</span>
                        <p>Precio: $5,000</p>
                        <button class="btn-recargar" data-cantidad="5">Comprar</button>
                    </div>
                    <div class="discounts-card-image"></div>
                    <img src="../../Imagenes/Tickets/Bronce.svg" alt="discounts">
                </div>

                <div class="discounts-card">
                    <div class="discounts-card-content">
                        <span>20 Créditos</span>
                        <p>Precio: $20,000</p>
                        <button class="btn-recargar" data-cantidad="20">Comprar</button>
                    </div>
                    <div class="discounts-card-image"></div>
                    <img src="../../Imagenes/Tickets/Plateada.svg" alt="discounts">
                </div>

                <div class="discounts-card">
                    <div class="discounts-card-content">
                        <span>50 Créditos</span>
                        <p>Precio: $50,000</p>
                        <button class="btn-recargar" data-cantidad="50">Comprar</button>
                    </div>
                    <div class="discounts-card-image"></div>
                    <img src="../../Imagenes/Tickets/Dorada.svg" alt="discounts">
                </div>
            </div>
        </div>
    </div>

    <!-- Script para conectar con el microservicio -->
    <script>
document.addEventListener("DOMContentLoaded", function () {
    const botones = document.querySelectorAll(".btn-recargar");
    const creditosSpan = document.querySelector(".profile-balance");
    const idUsuario = localStorage.getItem('idUsuario');
if (!idUsuario) {
  alert("No has iniciado sesión.");
  // Opcional: redirigir a login
  window.location.href = '/login.html';
}



    // Botón cerrar sesión
    const btnCerrarSesion = document.getElementById("btnCerrarSesion");
    btnCerrarSesion.addEventListener("click", () => {
        // Aquí podrías borrar localStorage o cookies si guardas sesión
        // localStorage.removeItem('idUsuario');
        window.location.href = "http://localhost/Proyecto_redes/UAO-movie/";
    });

    // Botón eliminar cuenta
    const btnEliminarCuenta = document.getElementById("btnEliminarCuenta");
document.getElementById('btnEliminarCuenta').addEventListener('click', async () => {
  // Aquí va el fetch que elimina la cuenta
  const idUsuario = localStorage.getItem('idUsuario');
  if (!idUsuario) {
    alert('No has iniciado sesión.');
    return;
  }

  // Evento para cada botón comprar crédito
    botones.forEach(boton => {
        boton.addEventListener("click", () => {
            const cantidad = parseInt(boton.getAttribute("data-cantidad"));
            recargarCreditos(cantidad);
        });
    });

  try {
    const response = await fetch(`http://localhost:3005/usuarios/${idUsuario}`, {
      method: 'DELETE'
    });

    if (response.ok) {
      alert('Cuenta eliminada correctamente.');
      localStorage.removeItem('idUsuario'); // limpiar sesión
      window.location.href = 'http://localhost/Proyecto_redes/UAO-movie/'; // o donde redirijas
    } else {
      alert('Error al eliminar la cuenta');
    }
  } catch (error) {
    console.error(error);
    alert('Error al conectar con el servidor');
  }
});
});
        <?php if (isset($_SESSION['idUsuario'])): ?>
            localStorage.setItem('idUsuario', '<?php echo $_SESSION['idUsuario']; ?>');
        <?php endif; ?>
    </script>
</body>
</html>
