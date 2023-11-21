const card = document.getElementById("card").content;
const containerEve = document.getElementById("containerPuestos");
const fragment = document.createDocumentFragment();
const newProduct = document.getElementById("nuevoProducto").content;

const slides = document.querySelectorAll(".ven-slide");
let nSlides = 0;

let idenLP = 0;
let vmAbi = -1;

const verMas = (e) => {
    const id = e.target.getAttribute("idbtn");

    //Ya hay algo abierto
    if (vmAbi != -1) {
        const lp = document.querySelector('[idlp="' + vmAbi + '"]');
        const lpc = document.querySelector('[idlpc="' + vmAbi + '"]');
        let num_productos;

        //lpc.style.height = lpc.offsetHeight + 'px';
        do {
            lp.removeChild(lp.lastChild);
            num_productos = lp.getElementsByClassName("ven-producto-precio").length;
            console.log(num_productos);
        } while (num_productos > 3);
        //lpc.style.height = 'auto'
    }

    //La lista desplegada es distinta o no había lista desplegada
    if (vmAbi != id) {
        const lp = document.querySelector('[idlp="' + id + '"]');
        for (u = 0; u < 3; u += 1) {
            const clone = newProduct.cloneNode(true);
            fragment.appendChild(clone);
            lp.appendChild(fragment);
        }
        vmAbi = id;
    } else {
        vmAbi = -1;
    }
};

window.addEventListener("DOMContentLoaded", () => {
    showSlides();

    const nE = 12;
    let b = 3;
    containerEve.innerHTML = "";
    for (let index = 0; index < nE; index++) {
        const listProducts = card.getElementById("listaProductos");

        card.getElementById("listaProductos").innerHTML = "";

        for (let u = 0; u < b; u++) {
            const cloneP = newProduct.cloneNode(true);
            fragment.appendChild(cloneP);
            listProducts.appendChild(fragment);
        }

        card.getElementById("listaProductos").setAttribute("idlp", idenLP);
        card.getElementById("btnVerMas").setAttribute("idbtn", idenLP);
        card.getElementById("ven-card").setAttribute("idlpc", idenLP);
        idenLP += 1;

        const clone = card.cloneNode(true);
        fragment.appendChild(clone);
        containerEve.appendChild(fragment);
    }

    const btnVerMas = document.querySelectorAll("#btnVerMas");

    btnVerMas.forEach((btn) => {
        btn.addEventListener("click", verMas);
    });
});

const showSlides = () => {
    console.log("@@@" + nSlides);
    console.log("-->" + slides);
    slides[nSlides].style.animation = "suno 1s";

    setTimeout(() => {
        slides[nSlides].style.display = "none";
        if (nSlides === slides.length - 1) {
            nSlides = 0;
        } else {
            nSlides += 1;
        }

        slides[nSlides].style.animation = "sdos 1s";
        slides[nSlides].style.display = "block";
    }, 950);
};

setInterval(showSlides, 900 * 6);
