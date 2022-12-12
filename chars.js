// Le pasamos el paquete del tipo de gráfico que deseamos
google.charts.load("current", {packages: ["corechart"]});
// A continuación ejecutar la función drawChart
google.charts.setOnLoadCallback(drawCharts);

// Lectura fichero JSON
const xhttp = new XMLHttpRequest();
let datos;

xhttp.open('GET', 'poblacionJavea.json', true);

xhttp.send();

xhttp.onreadystatechange = function () {
    if (xhttp.readyState == 4 && this.status == 200) {
        // Mostrar Datos Cargados por consola
        datos = JSON.parse(this.responseText);
        console.log(datos);
    }
}

// Obtener una referencia al elemento canvas del DOM
const $grafica = document.querySelector("#grafica");
// Las etiquetas son las que van en el eje X.
const allYears = new Array();
const totalPoblacion = new Array();

// Función a definir cada uno de los Chars
function drawCharts() {
    let cont = 0;
    for(let i=2005; i<=2021; i++){
        cont ++;
        let tipoChar = "p" + cont + "Chart"; // Defiendo el nombre de char a seguir
        drawChartPoblacion(i,tipoChar,"POBLACIÓN EN JÁVEA "+i);
    }
}

// Función para la creación de la gráfica
function drawChartPoblacion(fecha,numGrafico,TituloGrafica) {
    console.log(fecha);

    var data = new google.visualization.DataTable();
    data.addColumn('string', 'TIPO');
    data.addColumn('number', 'CANTIDAD');

    // Recorriendo datos para recoger los diferentes registros para cada char
    for (let year of datos) {
        // La columna RP_EJERCICIO debe ser el mismo que la fecha para poder crear con éxito el char
        if (year['RP_EJERCICIO'] == fecha) {
            allYears.push(year['RP_EJERCICIO']);
            let poblacionHombres = parseInt(year['RP_HOMBREs']);
            let poblacionMujeres = parseInt(year['RP_MUJERES']);

            let sumaTotal = poblacionHombres + poblacionMujeres;
            totalPoblacion.push(sumaTotal);

            console.log(poblacionHombres);
            console.log(poblacionMujeres);
            data.addRows([
                [
                    'HOMBRES', poblacionHombres
                ],

                [
                    'MUJERES', poblacionMujeres
                ]
            ])
        }
    }

    // Definiendo las opciones del char
    var options = {
        title: TituloGrafica,
        is3D: true,
        width: 550,
        height: 300,
        colors: ['#1e88e5', '#005cb2']

    };

    var chart = new google.visualization.PieChart(document.getElementById(numGrafico));
    chart.draw(data, options);

    
}



// Podemos tener varios conjuntos de datos. Comencemos con uno
const datosPoblacion = {
    label: "EMPADRONAMIENTO TOTAL",
    data: totalPoblacion, // La data es un arreglo que debe tener la misma cantidad de valores que la cantidad de etiquetas
    backgroundColor: 'rgba(54, 162, 235, 0.2)', // Color de fondo
    borderColor: 'rgba(54, 162, 235, 1)', // Color del borde
    borderWidth: 1,// Ancho del borde
};
new Chart($grafica, {
    type: 'line',// Tipo de gráfica
    data: {
        labels: allYears,
        datasets: [
            datosPoblacion,            
        ]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }],
        },
    }
});


