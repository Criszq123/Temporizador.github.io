var horas = 0;
var minutos = 0;
var segundos = 0;
let temporizadorId;
let pausado = false;

cargarSegundo();

function cargarSegundo() {
    let txtSegundos;

    if (segundos < 0) {
        segundos = 59;
    }

    //Mostrar Segundos en pantalla
    if (segundos < 10) {
        // si lleva menos de 10 segundos, adjuntara un 0
        txtSegundos = `0${segundos}`;
    } else {
        txtSegundos = segundos;
    }
    document.getElementById('segundos').innerHTML = txtSegundos;
    segundos--;

    cargarMinutos(segundos);
}

function cargarMinutos(segundos) {
    let txtMinutos;

    if (segundos == -1 && minutos !== 0) {
        setTimeout(() => {
            minutos--;
        }, 500);
    } else if (segundos == -1 && minutos == 0) {
        setTimeout(() => {
            minutos = 59;
        }, 500);
    }

    //Mostrar Minutos en pantalla
    if (minutos < 10) {
        txtMinutos = `0${minutos}`;
    } else {
        txtMinutos = minutos;
    }
    document.getElementById('minutos').innerHTML = txtMinutos;
    cargarHoras(segundos, minutos);
}

function cargarHoras(segundos, minutos) {
    let txtHoras;

    if (segundos == -1 && minutos == 0 && horas !== 0) {
        setTimeout(() => {
            horas--;
        }, 500);
    } else if (segundos == -1 && minutos == 0 && horas == 0) {
        clearInterval(temporizadorId);
        alert('EL CRONOMETRO HA FINALIZADO');
    }

    // mostrar horas en pantalla
    if (horas < 10) {
        txtHoras = `0${horas}`;
    } else {
        txtHoras = horas;
    }
    document.getElementById('horas').innerHTML = txtHoras;

    // Llamadas a las funciones de conversión después de actualizar las variables
    if (minutos > 60) {
        Conversor_minutos_A_horas();
    }

    if (segundos > 60) {
        Conversor_segundos_A_minutos();
    }
}

function Conversor_minutos_A_horas() {
    var Minutos_cociente = minutos / 60;
    var Residuo_minutos = minutos % 60;

    horas = Math.floor(Minutos_cociente);
    minutos = Residuo_minutos;
}

function Conversor_segundos_A_minutos() {
    var horas_cociente = segundos / 60;
    var Residuo_minutos = segundos % 60;

    minutos = Math.floor(horas_cociente);
    segundos = Residuo_minutos;
}

document.getElementById('iniciarTemporizador').addEventListener('click', function () {
    if (pausado) {
        temporizadorId = setInterval(cargarSegundo, 1000);
        pausado = false;
    } else {
        segundos = document.getElementById('defSegundos').value || 0;
        minutos = document.getElementById('defMinutos').value || 0;
        horas = document.getElementById('defHoras').value || 0;
        temporizadorId = setInterval(cargarSegundo, 1000);
    }
});

document.getElementById('pausarTemporizador').addEventListener('click', function () {
    if (temporizadorId) {
        clearInterval(temporizadorId);
        pausado = true;
        alert('Has pausado el temporizador');
    }
});






