(function() {
	var getNumeroByLetra = function(letra) {
		var numeroPorLetra = {
			A: "14",
			B: "01",
			C: "00",
			D: "16",
			E: "05",
			F: "20",
			G: "19",
			H: "09",
			I: "24",
			J: "07",
			K: "21",
			L: "08",
			M: "04",
			N: "13",
			O: "25",
			P: "22",
			Q: "18",
			R: "10",
			S: "02",
			T: "06",
			U: "12",
			V: "23",
			W: "11",
			X: "03",
			Y: "15",
			Z: "17"
		};

		return numeroPorLetra[letra];
	}

	var getDV = function(patente) {
		var reduceNumber = function(n) {
			return n.toString().split("").reduce(function(a, b) { return parseInt(a) + parseInt(b); });
		};

		var i;

		patente = patente.toUpperCase().replace(" ", "").replace("-", "");

		var numeros = patente;
		for (i = 0; i < 3; i++) {
			numeros = numeros.replace(patente[i], getNumeroByLetra(patente[i]));
		}

		var num1 = 0;
		var num2 = 0;

		for (i = 1; i <= 9; i+= 2) {
			num1 += parseInt(numeros[i - 1]);
		}

		for (i = 2; i <= 8; i+= 2) {
			num2 += parseInt(numeros[i - 1]);
		}

		num1 = reduceNumber(num1);
		num2 = reduceNumber(num2);

		return num1.toString() + num2.toString();
	};

	window.getDV = getDV;
})();