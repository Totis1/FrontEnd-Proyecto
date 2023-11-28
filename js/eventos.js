const ecard = document.getElementById("eCard").content;
const epr = document.getElementById("pr");
const econtainer = document.getElementById("eContainer");
const fragment = document.createDocumentFragment();

const desplegarEventos = () => {
    fetch("http://localhost:5000/traereventos", {
        method: "get",
    })
        .then((response) => response.json())
        .then((data) => {
            infoEv = data.data[0];
            console.log(data.data[0]);

            data.data.forEach((eve) => {
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

    const numEvents = 1;
    econtainer.innerHTML = "";
    for (let index = 0; index < numEvents; index++) {
        const clone = ecard.cloneNode(true);
        fragment.appendChild(clone);
        econtainer.appendChild(fragment);
    }
});
