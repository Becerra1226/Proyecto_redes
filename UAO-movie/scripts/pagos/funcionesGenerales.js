// Ocultar barra URL al cargar página
addEventListener("load", function() {
    setTimeout(hideURLbar, 0);
}, false);

function hideURLbar() {
    window.scrollTo(0, 1);
}

// Inicializar ads buysellads
(function() {
    if (typeof _bsa !== 'undefined' && _bsa) {
        _bsa.init('flexbar', 'CKYI627U', 'placement:w3layoutscom');
    }
})();

(function() {
    if (typeof _bsa !== 'undefined' && _bsa) {
        _bsa.init('fancybar', 'CKYDL2JN', 'placement:demo');
    }
})();

(function() {
    if (typeof _bsa !== 'undefined' && _bsa) {
        _bsa.init('stickybox', 'CKYI653J', 'placement:w3layoutscom');
    }
})();

// Inicializar pestañas responsivas
$(document).ready(function() {
    $('#pestañasHorizontales').easyResponsiveTabs({
        type: 'default',
        width: 'auto',
        fit: true
    });
});
