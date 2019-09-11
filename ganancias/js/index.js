(function() {
	"use strict";
	function createChart(canvasId, label) {
		let total = 0;
		let ctx = document.getElementById(canvasId).getContext('2d');
		return new Chart(ctx, {
			type: 'line',
			data: {
				datasets: [ ]
			},
			options: {
				title: {
					display: true,
					text: label
				},
				tooltips: {
					mode: 'label',
					callbacks: {
						afterTitle: function() {
							total = 0;
						},
						label: function(tooltipItem, data) {
							var label = data.datasets[tooltipItem.datasetIndex].label;
							var value = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index].y;
							total += value;
							return label + ": " + value.toFixed(2) + "%";
						},
						footer: function() {
							return "TOTAL: " + total.toFixed(2) + "%";
						}
					}
				},
				scales: {
					yAxes: [{
						ticks: {
							beginAtZero: true,
							suggestedMin: 0,
							min: 0,
							max: 50,
						},
						stacked: true
					}, {
						id: "threshold",
						ticks: {
							beginAtZero: true,
							suggestedMin: 0,
							min: 0,
							max: 50,
						},
						display: false,
						stacked: false
					}],
					xAxes: [{
						type: 'linear',
					}]
				},
			}
		});
	}

	let porcentajeDeduccionesChart = createChart('porcentajeDeduccionesChart', 'Porcentaje Deducciones');

	function getDatasets(from, to, skip) {
		let dataAportes = [];
		let dataGanancias = []; 

		for (let i = from; i <= to; i += skip) {
			let result = calcular(i);
			dataAportes.push({
				x: i,
				y: (result.aportesMensual / i) * 100
			});
			dataGanancias.push({
				x: i,
				y: (result.impuestoMensual / i) * 100
			});
		}
		return [
			{
				label: "Aportes",
				data: dataAportes,
				backgroundColor: "rgba(50, 250, 150, 0.2)",
				borderColor: "rgba(50, 250, 150, 1)",
			},
			{
				label: "Ganancias",
				data: dataGanancias,
				backgroundColor: "rgba(100, 200, 50, 0.2)",
				borderColor: "rgba(100, 200, 50, 1)",
			},
			{
				label: "35%",
				yAxisID: "threshold",
				data: [
					{
						x: from,
						y: 35
					},
					{
						x: to,
						y: 35
					}
				],
				borderColor: "rgba(200, 50, 50, 1)",
				fill: false
			}
		];
	}

	porcentajeDeduccionesChart.data.datasets = getDatasets(0, 300000, 5000);
	porcentajeDeduccionesChart.options.scales.xAxes[0].ticks.max = 300000;
	porcentajeDeduccionesChart.update();
})();