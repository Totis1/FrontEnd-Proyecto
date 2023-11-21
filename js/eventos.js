const ecard = document.getElementById("eCard").content;
const epr = document.getElementById("pr");
const econtainer = document.getElementById("eContainer");
const fragment = document.createDocumentFragment();

window.addEventListener("DOMContentLoaded", () => {
    const nE = 8;
    econtainer.innerHTML = "";
    for (let index = 0; index < nE; index++) {
        const clone = ecard.cloneNode(true);
        fragment.appendChild(clone);
        econtainer.appendChild(fragment);
    }
});
