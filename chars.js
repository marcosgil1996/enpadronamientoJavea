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


function drawCharts() {
    drawChartPoblacion("2021","p1Chart","POBLACIÓN JÁVEA 2021");
    drawChartPoblacion("2020","p2Chart","POBLACIÓN JÁVEA 2020");
    drawChartPoblacion("2019","p3Chart","POBLACIÓN JÁVEA 2019");
    drawChartPoblacion("2018","p4Chart","POBLACIÓN JÁVEA 2018");
    drawChartPoblacion("2017","p5Chart","POBLACIÓN JÁVEA 2017");
    drawChartPoblacion("2016","p6Chart","POBLACIÓN JÁVEA 2016");
    drawChartPoblacion("2015","p7Chart","POBLACIÓN JÁVEA 2015");
    drawChartPoblacion("2014","p8Chart","POBLACIÓN JÁVEA 2014");
    drawChartPoblacion("2013","p9Chart","POBLACIÓN JÁVEA 2013");
    drawChartPoblacion("2012","p10Chart","POBLACIÓN JÁVEA 2012");
    drawChartPoblacion("2011","p11Chart","POBLACIÓN JÁVEA 2011");
    drawChartPoblacion("2010","p12Chart","POBLACIÓN JÁVEA 2010");
    drawChartPoblacion("2009","p13Chart","POBLACIÓN JÁVEA 2009");
    drawChartPoblacion("2008","p14Chart","POBLACIÓN JÁVEA 2008");
    drawChartPoblacion("2007","p15Chart","POBLACIÓN JÁVEA 2007");
    drawChartPoblacion("2006","p16Chart","POBLACIÓN JÁVEA 2006");
    drawChartPoblacion("2005","p17Chart","POBLACIÓN JÁVEA 2005");
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
            let poblacionHombres = parseInt(year['RP_HOMBREs']);
            let poblacionMujeres = parseInt(year['RP_MUJERES']);
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

