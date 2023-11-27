const card = document.getElementById("card").content;
const containerEve = document.getElementById("containerPuestos");
const fragment = document.createDocumentFragment();
const newProduct = document.getElementById("nuevoProducto").content;

const slides = document.querySelectorAll(".ven-slide");
let nSlides = 0;

let productListId = 0;
let openListId = -1;

//change verMas to toggleProductList.
const verMas = (e) => {
    const id = e.target.getAttribute("idbtn");

    //Ya hay algo abierto
    if (openListId != -1) {
        const lp = document.querySelector('[idlp="' + openListId + '"]');
        const lpc = document.querySelector('[idlpc="' + openListId + '"]');
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
    if (openListId != id) {
        const lp = document.querySelector('[idlp="' + id + '"]');
        for (u = 0; u < 3; u += 1) {
            const clone = newProduct.cloneNode(true);
            fragment.appendChild(clone);
            lp.appendChild(fragment);
        }
        openListId = id;
    } else {
        openListId = -1;
    }
};

window.addEventListener("DOMContentLoaded", () => {
    displaySlides();

    const numEvents = 12;
    let numProducts = 3;
    containerEve.innerHTML = "";
    for (let index = 0; index < numEvents; index++) {
        const listProducts = card.getElementById("listaProductos");

        card.getElementById("listaProductos").innerHTML = "";

        for (let u = 0; u < numProducts; u++) {
            const cloneP = newProduct.cloneNode(true);
            fragment.appendChild(cloneP);
            listProducts.appendChild(fragment);
        }

        card.getElementById("listaProductos").setAttribute("idlp", productListId);
        card.getElementById("btnVerMas").setAttribute("idbtn", productListId);
        card.getElementById("ven-card").setAttribute("idlpc", productListId);
        productListId += 1;

        const clone = card.cloneNode(true);
        fragment.appendChild(clone);
        containerEve.appendChild(fragment);
    }

    const btnVerMas = document.querySelectorAll("#btnVerMas");

    btnVerMas.forEach((btn) => {
        btn.addEventListener("click", verMas);
    });
});

const displaySlides = () => {
    if (slides.length === 0) {
        return;
    }

    // console.log("Slide # currently showing: " + nSlides); // hide console logs. also describe what it does.
    // console.log("-->" + slides); // ?
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

setInterval(() => {
    if (slides.length > 0) {
        displaySlides();
    }
}, 900 * 6);
