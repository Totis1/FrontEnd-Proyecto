const ecard = document.getElementById("eCard").content;
const epr = document.getElementById("pr");
const econtainer = document.getElementById("eContainer");
const fragment = document.createDocumentFragment();

const vcard = document.getElementById("vCard").content;
const vcontainer = document.getElementById("vContainer");
const vnewProduct = document.getElementById("vNuevoProducto").content;

window.addEventListener("DOMContentLoaded", () => {
    const nE = 6;
    econtainer.innerHTML = "";
    for (let index = 0; index < nE; index++) {
        const clone = ecard.cloneNode(true);
        fragment.appendChild(clone);
        econtainer.appendChild(fragment);
    }

    vcontainer.innerHTML = "";
    for (let index = 0; index < nE; index++) {
        const listProducts = vcard.getElementById("listaProductos");

        vcard.getElementById("listaProductos").innerHTML = "";

        for (let u = 0; u < 6; u++) {
            const cloneP = vnewProduct.cloneNode(true);
            fragment.appendChild(cloneP);
            listProducts.appendChild(fragment);
        }

        const clone = vcard.cloneNode(true);
        fragment.appendChild(clone);
        vcontainer.appendChild(fragment);
    }
});
