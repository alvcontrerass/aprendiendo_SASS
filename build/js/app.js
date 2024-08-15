document.addEventListener('DOMContentLoaded', function() {
    crearGaleria()
})

function crearGaleria() {
    const galeria = document.querySelector('.galeria-imagenes')
    const CANTIDAD_IMAGENES = 12

    for(let i = 1; i<=CANTIDAD_IMAGENES; i++) {
        const imagen = document.createElement('IMG')
        imagen.src = `src/img/thumb/${i}.jpg`
        imagen.alt = 'Imagenes sobre versiones pasadas del festival'
        
        galeria.appendChild(imagen)
    }
};