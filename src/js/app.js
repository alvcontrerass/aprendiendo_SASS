document.addEventListener('DOMContentLoaded', function() {
    navegacionFija()
    crearGaleria()
    resaltarEnlaces()
    scrollNav()
})

function navegacionFija() {
    const header = document.querySelector('.header')
    const sobreFestival = document.querySelector('.sobre-festival')

    document.addEventListener('scroll', function() {
        if(sobreFestival.getBoundingClientRect().bottom<1) {
            header.classList.add('fixed')
        } else {
            header.classList.remove('fixed')
        }
    })
}

function crearGaleria() { //funcion para mostrar las imagenes en la pagina
    const galeria = document.querySelector('.galeria-imagenes')
    const CANTIDAD_IMAGENES = 12

    for(let i = 1; i<=CANTIDAD_IMAGENES; i++) {
        const imagen = document.createElement('IMG')
        imagen.loading = 'lazy'
        imagen.width = '300'
        imagen.height = '200'
        imagen.src = `src/img/grande/${i}.jpg`
        imagen.alt = 'Imagenes sobre versiones pasadas del festival'

        //Event handler
        imagen.onclick = function() {
            mostarImagen(i)
        }
        
        galeria.appendChild(imagen)
    }
};

function mostarImagen(i) { //funcion para mostrar la imagen en grande
    //variables para generar la imagen grande
    const imagen = document.createElement('IMG') //variable crea el elemento IMG
    imagen.src = `src/img/grande/${i}.jpg` //seleccionamos sorce de las imagenes e iteramos con `` templates literals
    imagen.alt = 'Imagenes sobre versiones pasadas del festival' //ingresamos alt a las imagenes iteradas

    //creacion modal
    const modal = document.createElement('DIV') //Variable crea DIV
    modal.classList.add('modal') //Creamos clase modal en DIV
    modal.onclick = cerrarModal //funcion para cerrar la imagen en grande

    //funcion para cerrar la imagen en grande
    const cerrarModalBTN = document.createElement('BUTTON')
    cerrarModalBTN.textContent = 'X'
    cerrarModalBTN.classList.add('btn-cerrar')
    cerrarModalBTN.onclick = cerrarModal

    //agregar al html
    const body = document.querySelector('body') //Variable selecciona el body
    body.appendChild(modal) //Agregamos DIV con clase modal al body
    body.classList.add('overflow-hidden') //Agregamos clase overflow-hidden al body para que no pueda scrollear al seleccionar foto
    modal.appendChild(imagen) //agrega el elemento IMG al DIV
    modal.appendChild(cerrarModalBTN)
}

function cerrarModal() {
    const body = document.querySelector('body')
    const modal = document.querySelector('.modal')
    modal.classList.add('fade-out')
    setTimeout(() => {
        modal?.remove()
        body.classList.remove('overflow-hidden')
    }, 300);
}

function resaltarEnlaces() {
    document.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section')
        const navLinks = document.querySelectorAll('.navegacion-principal a')

        let actual = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop
            const sectionHeight = section.clientHeight
            if (window.scrollY >= (sectionTop - sectionHeight / 3)) {
                actual = section.id
            }
        })

        navLinks.forEach(link => { 
            link.classList.remove('activo')
            if(link.getAttribute('href') === `#${actual}`) {
            link.classList.add('activo')
            }
        })
    })
}

function scrollNav() {
    const navLinks = document.querySelectorAll('.navegacion-principal a')
    navLinks.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault()
            const sectionScroll = e.target.getAttribute('href')
            const section = document.querySelector(sectionScroll)
            section.scrollIntoView({behavior: 'smooth'})
        })
    })
}