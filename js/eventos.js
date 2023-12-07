const ecard = document.getElementById("eCard").content;
const epr = document.getElementById("pr");
const econtainer = document.getElementById("eContainer");
const fragment = document.createDocumentFragment();
const mesTitulo = document.getElementById("mesTitulo");
const nombreMes = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
];

let mesActual = 11;
const totalMeses = 12;

const actualizarTarjetasYTitulo = () => {
    document.querySelectorAll(".eve-Card").forEach((card) => (card.style.display = "none"));
    document.querySelectorAll(`.eve-Card[data-mes="${mesActual}"]`).forEach((card) => (card.style.display = "block"));
    mesTitulo.textContent = `${nombreMes[mesActual]} 2023`;
};

/* 
// Navegar por meses con botones de retroceder y avanzar en la sección de eventos

document.getElementById("btnRetroceder").addEventListener("click", () => {
    mesActual = (mesActual - 1 + totalMeses) % totalMeses;
    actualizarTarjetasYTitulo();
});
document.getElementById("btnAvanzar").addEventListener("click", () => {
    mesActual = (mesActual + 1) % totalMeses;
    actualizarTarjetasYTitulo();
}); */

// ---- Slide ----
let index = 0;
const slides = document.querySelectorAll(".slide");
const totalSlides = slides.length;
let slideInterval;

function changeSlide(step) {
    slides[index].classList.remove("active");
    index = (index + step + totalSlides) % totalSlides;
    slides[index].classList.add("active");
}

function startSlideShow() {
    slideInterval = setInterval(() => {
        changeSlide(1);
    }, 3000);
}

function stopSlideShow() {
    clearInterval(slideInterval);
}

function reduceSlideInfo() {
    let activeSlide = document.querySelector(".slide.active");
    let infoPart = activeSlide.querySelector(".slide-info");
    infoPart.style.width = "50%";
}

function resetSlideInfoSize() {
    let activeSlide = document.querySelector(".slide.active");
    let infoPart = activeSlide.querySelector(".slide-info");
    infoPart.style.width = "70%";
}

const sliderContainer = document.getElementById("slider-container");
sliderContainer.addEventListener("mouseover", function () {
    stopSlideShow();
    reduceSlideInfo();
});
sliderContainer.addEventListener("mouseout", function () {
    startSlideShow();
    resetSlideInfoSize();
});

if (slides.length > 0) {
    slides[index].classList.add("active");
    startSlideShow();
}

const desplegarEventos = () => {
    fetch("http://localhost:8080/traereventos", {
        method: "get",
    })
        .then((response) => response.json())
        .then((data) => {
            infoEv = data.data[0];
            console.log(data.data[0]);

            data.data.forEach((eve) => {
                if (eve.validacion != "102") {
                    return;
                }

                ecard.getElementById("eve-img").setAttribute("src", eve.url_imagen);
                ecard.getElementById("eve-titulo").textContent = eve.Nombre_eve;
                ecard.getElementById("eve-ponente").textContent = eve.Ponente;
                ecard.getElementById("eve-descripcion").textContent = eve.Descripcion;

                const eveInfo = eve.Fecha + "  |  " + eve.Lugar + "  |  " + eve.N_horas + " horas de " + eve.T_horas;

                ecard.getElementById("eve-infoEv").textContent = eveInfo;

                const clone = ecard.cloneNode(true);
                fragment.appendChild(clone);
                econtainer.appendChild(fragment);
            });
        });
};

window.addEventListener("DOMContentLoaded", () => {
    desplegarEventos();
});
