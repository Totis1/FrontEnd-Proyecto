const epr = document.getElementById('pr')
const ecard = document.getElementById('eCard').content;
const econtainer = document.getElementById('eContainer');
const mesTitulo = document.getElementById('mesTitulo');
const nombreMes = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

let mesActual = 11;
const totalMeses = 12;

const actualizarTarjetasYTitulo = () => {
    document.querySelectorAll('.eve-Card').forEach(card => card.style.display = 'none');
    document.querySelectorAll(`.eve-Card[data-mes="${mesActual}"]`).forEach(card => card.style.display = 'block');
    mesTitulo.textContent = `${nombreMes[mesActual]} 2023`;
};

document.getElementById('btnRetroceder').addEventListener('click', () => {
    mesActual = (mesActual - 1 + totalMeses) % totalMeses;
    actualizarTarjetasYTitulo();
});
document.getElementById('btnAvanzar').addEventListener('click', () => {
    mesActual = (mesActual + 1) % totalMeses;
    actualizarTarjetasYTitulo();
});

window.addEventListener('DOMContentLoaded', () => {
    const nE = 9;
    econtainer.innerHTML = '';
    const fragment = document.createDocumentFragment();

    for (let mes = 0; mes < totalMeses; mes++) {
        for (let index = 0; index < nE; index++) {
            const clone = ecard.cloneNode(true);
            clone.querySelector('.eve-Card').setAttribute('data-mes', mes);
            fragment.appendChild(clone);
        }
    }
    econtainer.appendChild(fragment);

    actualizarTarjetasYTitulo();
});

// ---- Slide ----
let index = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;
let slideInterval;

function changeSlide(step) {
    slides[index].classList.remove('active');
    index = (index + step + totalSlides) % totalSlides;
    slides[index].classList.add('active');
}

function startSlideShow() {
    slideInterval = setInterval(() => {
        changeSlide(1);
    }, 3000); 
}

function stopSlideShow() {
    clearInterval(slideInterval);
}

// Funciones para cambiar el tamaño de la información del slide
function reduceSlideInfo() {
    let activeSlide = document.querySelector('.slide.active');
    let infoPart = activeSlide.querySelector('.slide-info');

    infoPart.style.width = '50%';
}

function resetSlideInfoSize() {
    let activeSlide = document.querySelector('.slide.active');
    let infoPart = activeSlide.querySelector('.slide-info');

    infoPart.style.width = '70%';
}

// Eventos de mouseover y mouseout en el carrusel
const sliderContainer = document.getElementById('slider-container');
sliderContainer.addEventListener('mouseover', function() {
    stopSlideShow();
    reduceSlideInfo();
});
sliderContainer.addEventListener('mouseout', function() {
    startSlideShow();
    resetSlideInfoSize();
});

slides[index].classList.add('active');
startSlideShow();






