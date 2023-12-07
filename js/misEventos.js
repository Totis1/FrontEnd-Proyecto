let mesActual = new Date().getMonth(); // 0-11
let año = 2023;

document.getElementById("mesAnterior").addEventListener("click", function () {
    cambiarMes(-1);
});

document.getElementById("mesSiguiente").addEventListener("click", function () {
    cambiarMes(1);
});

function cambiarMes(cambio) {
    mesActual += cambio;
    if (mesActual < 0) {
        mesActual = 11;
    } else if (mesActual > 11) {
        mesActual = 0;
    }
    generarCalendario(mesActual, año);
}

function generarCalendario(mes, año) {
    const diasMes = new Date(año, mes + 1, 0).getDate();
    const primerDiaMes = new Date(año, mes, 1).getDay();

    let dias = [];
    for (let i = 0; i < primerDiaMes; i++) {
        dias.push("<div class='dia'></div>");
    }

    for (let dia = 1; dia <= diasMes; dia++) {
        let fecha = `${año}-${String(mes + 1).padStart(2, "0")}-${String(dia).padStart(2, "0")}`;
        dias.push(`<div class='dia' id='dia-${fecha}'>${dia}</div>`);
    }

    document.getElementById("dias").innerHTML = dias.join("");
    document.getElementById("tituloMes").innerText = `${obtenerNombreMes(mes)} ${año}`;
}

function obtenerNombreMes(mes) {
    const nombresMeses = [
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
    return nombresMeses[mes];
}

// Mostrar Ventanas Modales
document.getElementById("btnAgregarEvento").addEventListener("click", function () {
    document.getElementById("formularioAgregarEvento").showModal();
});

document.getElementById("btnModificarEvento").addEventListener("click", function () {
    document.getElementById("formularioModificarEvento").showModal();
});

document.getElementById("btnEliminarEvento").addEventListener("click", function () {
    document.getElementById("formularioEliminarEvento").showModal();
});

// Guardar evento
document.getElementById("guardarEvento").addEventListener("click", function () {
    var nombreEvento = document.getElementById("nombreEvento").value;
    var fechaEvento = document.getElementById("fechaEventoAgregar").value;

    if (nombreEvento && fechaEvento) {
        var idDia = "dia-" + fechaEvento;
        var diaCalendario = document.getElementById(idDia);

        if (diaCalendario) {
            var eventoDiv = document.createElement("div");
            eventoDiv.className = "nombreEvento";
            eventoDiv.textContent = nombreEvento;
            diaCalendario.appendChild(eventoDiv);
        }
    }
});

generarCalendario(mesActual, año);
