const ecard = document.getElementById("eCard").content;
const epr = document.getElementById("pr");
const econtainer = document.getElementById("eContainer");
const fragment = document.createDocumentFragment();

const vcard = document.getElementById("vCard").content;
const vcontainer = document.getElementById("vContainer");
const vnewProduct = document.getElementById("vNuevoProducto").content;

const verMas = (e) => {
    const id = e.target.getAttribute("idbtn");

    // If there is already an open list
    if (vmAbi != -1) {
        const lp = document.querySelector('[idlp="' + vmAbi + '"]');
        let num_productos;

        do {
            lp.removeChild(lp.lastChild);
            num_productos = lp.getElementsByClassName("ven-producto-precio").length;
        } while (num_productos > 3);
    }

    // If the expanded list is different or there was no expanded list
    if (vmAbi != id) {
        const lp = document.querySelector('[idlp="' + id + '"]');
        for (u = 0; u <= pr_res[id].length; u += 1) {
            newProduct.getElementById("producto").textContent = pr_res[id][u];
            newProduct.getElementById("precio").textContent = pr_pre[id][u];
            const clone = newProduct.cloneNode(true);
            fragment.appendChild(clone);
            lp.appendChild(fragment);
        }
        vmAbi = id;
    } else {
        vmAbi = -1;
    }
};

const desplegarEventos = () => {
    fetch("http://localhost:8080/traereventos", {
        method: "get",
    })
        .then((response) => response.json())
        .then((data) => {
            infoEv = data.data[0];
            console.log(data.data[0]);

            // ordenamiento por fechas
            let fechas = [];
            let indices = [];
            data.data.forEach((eve, i) => {
                fechas[i] = new Date(eve.Fecha);
                indices[i] = i;
            });
            const f = indices.sort((f1, f2) => fechas[f1] - fechas[f2]);

            for (let j = 1, i = 1; j <= 4; j++, i++) {
                if (data.data[i] == undefined || data.data[i].validacion != "102") {
                    i--;
                    console.log("olaaa");
                    return;
                }
                const eve = data.data[i];
                console.log(eve.url_imagen);

                ecard.getElementById("eve-img").setAttribute("src", eve.url_imagen);
                ecard.getElementById("eve-titulo").textContent = eve.Nombre_eve;
                ecard.getElementById("eve-ponente").textContent = eve.Ponente;
                ecard.getElementById("eve-descripcion").textContent = eve.Descripcion;

                const eveInfo = eve.Fecha + "  |  " + eve.Lugar + "  |  " + eve.N_horas + " horas de " + eve.T_horas;

                ecard.getElementById("eve-infoEv").textContent = eveInfo;

                const clone = ecard.cloneNode(true);
                fragment.appendChild(clone);
                econtainer.appendChild(fragment);
            }
        });
};

const desplegarPuestos = () => {
    vcontainer.innerHTML = "";

    fetch("http://localhost:8080/traerpuestos", {
        method: "get",
    })
        .then((response) => response.json())
        .then((data) => {
            for (let j = 1, i = 0; j <= 4; j++, i++) {
                console.log('ddddd ' + data.data[i].validacion)
                console.log(j + '  ->' + i )

                if (data.data[i] == undefined || data.data[i].validacion != "102") {
                    j--;
                    console.log("olaaa" + j);
                } else {
                    const listProducts = vcard.getElementById("listaProductos");
                    vcard.getElementById("ven-img").setAttribute("src", data.data[i].url_imagen);
                    vcard.getElementById("nombre-puesto").textContent = data.data[i].Nombre_puesto;
                    const lpkey = Object.keys(data.data[i].productos);
                    console.log("@@@" + lpkey.length);

                    vcard.getElementById("listaProductos").innerHTML = "";

                    for (let u = 1; u <= lpkey.length; u++) {
                        vnewProduct.getElementById("producto").textContent = data.data[i].productos[u].nombre;
                        vnewProduct.getElementById("precio").textContent = data.data[i].productos[u].precio;

                        const cloneP = vnewProduct.cloneNode(true);
                        fragment.appendChild(cloneP);
                        listProducts.appendChild(fragment);
                    }

                    const clone = vcard.cloneNode(true);
                    fragment.appendChild(clone);
                    vcontainer.appendChild(fragment);
                    console.log('ldldldlldldld' )
                }

                
            }
        });
};

window.addEventListener("DOMContentLoaded", () => {
    const nE = 3;
    desplegarEventos();
    desplegarPuestos();
});
